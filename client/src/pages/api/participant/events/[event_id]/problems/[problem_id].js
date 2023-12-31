import psql from "@/database.config";
import { error } from "console";
const fs = require("fs");
const child_process = require("child_process");
const path = require("path");

const ftp = {
  "c": {
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
  "c++": {
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

export default async function handler(req, res) {
  let result;
  if (req.method === "GET") {
    result =
      await psql`select * from problems where problem_id = ${req.query.problem_id}`;
    let r =
      await psql`select * from testcases where problem_id = ${req.query.problem_id} and is_sample = true`;
    res.json({ problem: result[0], samples: r });
  } else if (req.method === "POST") {
    if (req.query.type === "submit") {
      let submission_id = req.body.submission_id;
      let user_id = req.body.user_id;
      let problem_id = req.body.problem_id;
      let code = req.body.code.content;
      let extension = String(req.body.language).toLowerCase();
      let time = req.body.time;
      let testcases =
        await psql`select * from testcases where problem_id = ${req.query.problem_id}`;
      let problem =
        await psql`select * from problems where problem_id = ${req.query.problem_id}`;
      //accepted = await ftp[extension.toLowerCase()].func(code, testcases, res);
      let status = await executeCorCppProgram(ftp[extension.toLowerCase()], code, testcases);
      console.log("status: ", status);
      res.json(status);
      await psql`insert into submissions values 
                (${submission_id}, 
                 ${code}, 
                 ${extension}, 
                 ${status.verdict}, 
                 ${user_id},
                 ${problem_id},
                 to_timestamp(${time}, 'Dy Mon DD YYYY HH24:MI:SS'),
                 ${status.verdict === "Accepted" ? Number(problem[0].points) : 0}
                )`;
    } else if (req.query.type === "submission_of") {
      result = await psql`select * 
                          from submissions 
                          where user_id = ${req.body.user_id} and 
                                problem_id = ${req.body.problem_id} 
                          order by submission_time desc`;
      res.json({ submissions: result });
    } else if (req.query.type === "submissions") {
      result = await psql`select *
                            from submissions NATURAL JOIN problems
                            where user_id = ${req.body.user_id}
                            order by submission_time desc`;
      res.json({ submissions: result });
    }
  }
}

async function executeCorCppProgram(ftp, file, testcases) {
  let status;
  try {
    const filePath = path.join("__temp." + ftp.filetype);
    const executablePath = path.join("__temp");
    fs.writeFileSync(filePath, file);

    let compilation = child_process.spawnSync(ftp.compiler, [filePath, ...ftp.flags, executablePath], { shell: true });

    console.log(compilation)
    if (compilation.error) {
      status = { verdict: "internal server error", error: "internal server error" };
      return status;
    }

    let errorOccured = compilation.status === null || compilation.status !== 0;
    // compilation.stderr.on('data', (data) => {
    //   errorOccured = true;
    // status = { verdict: "compilation error", error: data };
    // });

    if (errorOccured) {
      // console.log("error: ", compilation.stderr.toString("utf8"));
      fs.rmSync(filePath);
      status = { verdict: "compilation error", error: compilation.stderr.toString() };
      return status;
    }

    let acc_tests = [];
    for (let i = 0; i < testcases.length; ++i) {
      const inputPath = path.join(`temp${i + 1}.input`);
      fs.writeFileSync(inputPath, testcases[i].input_content);
      let run = child_process.spawnSync("./" + executablePath + '<' + inputPath.toString(), { shell: true });
      // console.log("run: ", run);
      // run.stdout.on('data', (data) => {
      //   if (String(data).trim() !== testcases[i].output_content.trim()) {
      //     errorOccured = true;
      //     status = {
      //       verdict: `Wrong answer on test case ${i + 1}`,
      //     };
      //   }
      //   acc_tests.push(testcases[i]);
      // });

      // run.stderr.on('data', (data) => {
      //   errorOccured = true;
      //   status = {
      //     verdict: "Runtime Error",
      //     error: data,
      //   };
      // });

      // run.on('close', (_) => {
      //   fs.rmSync(inputPath);
      // });

      errorOccured = run.status === null || run.status !== 0;

      if (errorOccured) {
        status = {
          verdict: "Runtime Error",
          error: run.stderr.toString("utf8"),
        };
        break;
      }

      // console.log("stdout: ", run.stdout.toString(), "stderr: ", run.stderr.toJSON());
      if (run.stdout.toString().trim() !== testcases[i].output_content.trim()) {
        errorOccured = true;
        // console.log(run.stdout.toString("utf8"));
        status = {
          verdict: `Wrong answer on test case ${i + 1}`,
        };
      }
      if (errorOccured) break;
      acc_tests.push(testcases[i]);
    }

    if (!errorOccured) {
      status = { verdict: "Accepted", testcases: acc_tests };
    }
  } catch (err) {
    console.error("Error: ", err);
    status = { verdict: "Wrong Answer" }
  }
  return status;
}
