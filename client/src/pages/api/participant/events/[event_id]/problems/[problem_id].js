import psql from "@/database.config";
import { error } from "console";
const fs = require("fs");
const child_process = require("child_process");
const path = require("path");

const ftp = {
    "c": {
        compiler: "g",
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
      let accepted = false;
      let testcases =
        await psql`select * from testcases where problem_id = ${req.query.problem_id}`;
      let problem =
            await psql`select * from problems where problem_id = ${req.query.problem_id}`;
      //accepted = await ftp[extension.toLowerCase()].func(code, testcases, res);
      execute(ftp[extension.toLowerCase()], code, testcases, res);
      await psql`insert into submissions values 
                (${submission_id}, 
                 ${code}, 
                 ${extension}, 
                 ${accepted}, 
                 ${user_id},
                 ${problem_id},
                 to_timestamp(${time}, 'Dy Mon DD YYYY HH24:MI:SS')
                 ${res.status === "Accepted" ? problem[0].points : 0} 
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

async function executeCorCppProgram(ftp, file, testcases, res) {
  try {
    const filePath = path.join("__temp." + ftp.filetype);
    const executablePath = path.join("__temp");
    fs.writeFileSync(filePath, file);

    let compilation = child_process.spawn(ftp.compiler, [filePath, ...ftp.flags, executablePath]);
    let errorOccured = false;
    compilation.stderr.on('data', (data) => {
      errorOccured = true;
      res.json({ accepted: false, verdict: "compilation error", error: data });
    });

    if (errorOccured) {
      fs.rmSync(filePath);
      return false;
    }

    let acc_tests = [];
    for (let i = 0; i < testcases.length; ++i) {
      const inputPath = path.join(`temp${i + 1}.input`);
      fs.writeFileSync(inputPath, testcases[i].input_content);
      let run = child_process.spawn(executablePath, ["<", inputPath]);

      run.stdout.on('data', (data) => {
        if (String(data).trim() !== testcases[i].output_content.trim()) {
          errorOccured = true;
          res.json({ 
            accepted: false,
            verdict: `Wrong answer on test case ${i+1}`,
          });
        }
        acc_tests.push(testcases[i]);
      });

      run.stderr.on('data', (data) => {
        errorOccured = true;
        res.json({
          accepted: false,
          verdict: "Runtime Error",
          error: data,
        });
      });

      run.on('close', (_) => {
        fs.rmSync(inputPath);
      });

      if (errorOccured) break;
    }
    
    res.json({ accepted: true, verdict: "Accepted", testcases: acc_tests });
  } catch (err) {
    console.log("Error: ", err);
  }
}
