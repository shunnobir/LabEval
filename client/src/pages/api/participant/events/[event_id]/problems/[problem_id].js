import psql from "@/database.config";
const fs = require("fs");
const child_process = require("child_process");
const os = require("os");
const path = require("path");

export default async function handler(req, res) {
  let result;
  if (req.method === "GET") {
    result =
      await psql`select * from problems where problem_id = ${req.query.problem_id}`;
    let r =
      await psql`select * from testcases where problem_id = ${req.query.problem_id} and is_sample = true`;
    res.status(200).json({ problem: result[0], samples: r });
  } else if (req.method === "POST") {
    if (req.query.type === "submit") {
      let submission_id = req.body.submission_id;
      let user_id = req.body.user_id;
      let problem_id = req.body.problem_id;
      let code = req.body.code.content;
      let extension = req.body.language;
      let time = req.body.time;
      let accepted = false;
      let testcases =
        await psql`select * from testcases where problem_id = ${req.query.problem_id}`;
      if (extension === "C++") {
        accepted = await executeCppFile(code, testcases, res);
        await deleteCppTempFiles(testcases, res);
      }
      await psql`insert into submissions values 
                (${submission_id}, 
                 ${code}, 
                 ${extension}, 
                 ${accepted}, 
                 ${user_id},
                 ${problem_id},
                 to_timestamp(${time}, 'Dy Mon DD YYYY HH24:MI:SS'))`;
    } else if (req.query.type === "submissions") {
      result = await psql`select * from submissions where user_id = ${req.body.user_id} order by submission_time desc`;
      res.status(200).json({ submissions: result });
    }
  }
}

async function executeCppFile(file, testcases, res) {
  try {
    const cppPath = path.join("temp.cpp");
    const executablePath = path.join("temp");
    fs.writeFileSync(cppPath, file);
    child_process.execSync(
      "g++ -std=c++20 -Wall -pedantic -O2 " + cppPath + " -o " + executablePath
    );
    let acc_test = [];
    for (let i = 0; i < testcases.length; ++i) {
      const inputPath = path.join(`temp${i + 1}.input`);
      fs.writeFileSync(inputPath, testcases[i].input_content);
      let stdout = child_process.execSync(
        "./" + executablePath + " < " + inputPath
      );
      if (stdout.toString().trim() === testcases[i].output_content.trim())
        acc_test.push(i + 1);
      else {
        res.status(200).json({ status: "Wrong Answer", testcases: acc_test });
        return false;
      }
    }
    res.status(200).json({ status: "Accepted", testcases: acc_test });
  } catch (error) {
    console.error("Execute CPP File:", error);
    res.status(200);
    return false;
  }
  return true;
}

async function deleteCppTempFiles(testcases, res) {
  try {
    const cppPath = path.join("temp.cpp");
    const executablePath = path.join("temp");
    fs.rmSync(cppPath);
    fs.rmSync(executablePath);
    testcases.forEach((_, index) => {
      const inputPath = path.join(`temp${index + 1}.input`);
      fs.rmSync(inputPath);
    });
  } catch (error) {
    console.error("Could not delete temporary files", error);
    res.status(200);
  }
}
