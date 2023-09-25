import psql from "@/database.config";
const fs = require("fs");
const child_process = require("child_process");

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
      let file = req.body.file.content;
      let extension = req.body.language;

      let testcases =
        await psql`select * from testcases where problem_id = ${req.query.problem_id}`;
      if (extension === "C++") {
        await executeCppFile(file, testcases, res);
        await deleteCppTempFiles(testcases);
      }
    }
  }
}

async function executeCppFile(file, testcases, res) {
  try {
    fs.writeFileSync("temp.cpp", file);
    child_process.execSync(
      "g++ -std=c++20 -Wall -pedantic -O2 temp.cpp -o temp"
    );
    let acc_test = [];
    for (let i = 0; i < testcases.length; ++i) {
      fs.writeFileSync(`temp${i + 1}.input`, testcases[i].input_content);
      let stdout = child_process.execSync(`./temp < temp${i + 1}.input`);
      if (stdout.toString().trim() === testcases[i].output_content.trim())
        acc_test.push(i + 1);
      else {
        res.status(200).json({ status: "Wrong Answer", testcases: acc_test });
        return;
      }
    }
    res.status(200).json({ status: "Accepted", testcases: acc_test });
  } catch (error) {
    console.error("Execute CPP File:", error);
    res.status(200);
  }
}

async function deleteCppTempFiles(testcases) {
  try {
    fs.rmSync("temp");
    fs.rmSync("temp.cpp");
    testcases.forEach((_, index) => {
      fs.rmSync(`temp${index + 1}.input`);
    });
  } catch (error) {
    console.error("Could not delete temporary files");
    res.status(200);
  }
}
