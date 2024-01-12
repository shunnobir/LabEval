import psql, { psql2 } from "@/database.config";
import fs from "fs";
import child_process from "child_process";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import generateId from "@/app/generateId";

interface Status {
  verdict: string;
  error?: string;
  testcases?: any[];
}

interface Type {
  compiler: string;
  flags: string[];
  func: (
    ftp: Type,
    file: string,
    testcases: any[],
    solution_id: string
  ) => Promise<any>;
  filetype: string;
}

interface FileType {
  [id: string]: Type;
}

const ftp: FileType = {
  c: {
    compiler: "gcc",
    flags: [
      "-lm",
      "-O2",
      "--std=c11",
      "-fsanitize=address",
      "-fsanitize=undefined",
      "-o",
    ],
    func: executeCorCppProgram,
    filetype: "c",
  },
  cpp: {
    compiler: "g++",
    flags: [
      "-lm",
      "-O2",
      "--std=c++20",
      "-fsanitize=address",
      "-fsanitize=undefined",
      "-o",
    ],
    func: executeCorCppProgram,
    filetype: "cpp",
  },
};

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const res = await psql`select * 
              from solutions 
              where problem_id = ${searchParams.get("problem_id")} and
                    user_id = ${searchParams.get("user_id")}`;
    return NextResponse.json({ status: "success", submissions: res, ok: true });
  } catch (err) {
    return NextResponse.json({ status: "internal database error", ok: false });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const solution_id = generateId(12);
    await psql`insert into solutions (solution_id, 
                                      code, 
                                      language, 
                                      verdict, 
                                      submission_time, 
                                      user_id, 
                                      problem_id)
                values (${solution_id}, 
                        ${body.code},
                        ${body.language},
                        'running',
                        ${body.submission_time},
                        ${body.user_id},
                        ${body.problem_id})`;
    if (process.env.NODE_ENV === "development") {
      await psql2`insert into solutions (solution_id, 
        code, 
                                      language, 
                                      verdict, 
                                      submission_time, 
                                      user_id, 
                                      problem_id)
                values (${solution_id}, 
                        ${body.code},
                        ${body.language},
                        'running',
                        ${body.submission_time},
                        ${body.user_id},
                        ${body.problem_id})`;
    }
    let testcases =
      await psql`select * from testcases where problem_id = ${body.problem_id}`;

    let res = await executeCorCppProgram(
      ftp[body.extension],
      body.code,
      testcases,
      solution_id
    );
    return res;
  } catch (err) {
    return NextResponse.json({ status: "internal database error", ok: false });
  }
}

async function executeCorCppProgram(
  ftp: Type,
  file: string,
  testcases: any[],
  solution_id: string
) {
  try {
    const filePath = path.join("__temp." + ftp.filetype);
    const executablePath = path.join("__temp");
    fs.writeFileSync(filePath, file);

    let compilation = child_process.spawnSync(
      ftp.compiler,
      [filePath, ...ftp.flags, executablePath],
      { shell: true }
    );

    if (compilation.error) {
      await psql`update solutions 
                set verdict = 'internal server error'
                where solution_id = ${solution_id}`;
      if (process.env.NODE_ENV === "development") {
        await psql2`update solutions 
        set verdict = 'internal server error'
        where solution_id = ${solution_id}`;
      }
      return NextResponse.json({
        status: "internal server error",
        ok: false,
      });
    }

    let errorOccured = compilation.status === null || compilation.status !== 0;

    if (errorOccured) {
      await psql`update solutions 
                set verdict = 'compilation error\n${compilation.stderr}'
                where solution_id = ${solution_id}`;

      if (process.env.NODE_ENV === "development") {
        await psql2`update solutions 
                set verdict = 'compilation error\n${compilation.stderr}'
                where solution_id = ${solution_id}`;
      }
      fs.rmSync(filePath);
      return NextResponse.json({
        status: "compilation error",
        ok: false,
      });
    }

    for (let i = 0; i < testcases.length; ++i) {
      await psql`update solutions 
                set verdict = 'running on test case ${i + 1}'
                where solution_id = ${solution_id}`;

      if (process.env.NODE_ENV === "development") {
        await psql2`update solutions 
        set verdict = 'running on test case ${i + 1}'
        where solution_id = ${solution_id}`;
      }

      const inputPath = path.join(`temp${i + 1}.input`);
      fs.writeFileSync(inputPath, testcases[i].input_content);
      let run = child_process.spawnSync(
        "./" + executablePath + "<" + inputPath.toString(),
        { shell: true }
      );

      errorOccured = run.status === null || run.status !== 0;

      if (errorOccured) {
        await psql`update solutions 
                  set verdict = 'runtime error\n${run.stderr}'
                  where solution_id = ${solution_id}`;

        if (process.env.NODE_ENV === "development") {
          await psql2`update solutions 
                    set verdict = 'runtime error\n${run.stderr}'
                    where solution_id = ${solution_id}`;
        }
        break;
      }

      fs.rmSync(inputPath);
      if (run.stdout.toString() !== testcases[i].output_content) {
        errorOccured = true;
        await psql`update solutions 
          set verdict = 'wrong answer on test case ${i + 1}'
          where solution_id = ${solution_id}`;

        if (process.env.NODE_ENV === "development") {
          await psql2`update solutions 
            set verdict = 'wrong answer on test case ${i + 1}'
            where solution_id = ${solution_id}`;
        }
        return NextResponse.json({
          status: `wrong answer on test case ${i + 1}`,
          ok: false,
        });
      }
    }

    if (!errorOccured) {
      await psql`update solutions 
          set verdict = 'accepted'
          where solution_id = ${solution_id}`;

      if (process.env.NODE_ENV === "development") {
        await psql2`update solutions 
              set verdict = 'accepted'
              where solution_id = ${solution_id}`;
      }

      return NextResponse.json({ status: "accepted", ok: true });
    }
  } catch (err) {
    console.error("Error: ", err);
    return NextResponse.json({ status: "internal database error", ok: false });
  }
}
