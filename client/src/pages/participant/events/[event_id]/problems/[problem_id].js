"use client";

import Layout from "@/components/Layout";
import Loader from "@/components/Loader";
import { labevalMarkdownParser } from "@/components/markdown/mdParser";
import Select from "@/components/Select";
import Table from "@/components/Table";
import { BackButton, CancelIcon, FileAddIcon } from "@/icons";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function ProblemViewer({ setNotification }) {
  const router = useRouter();
  const [problem, setProblem] = useState({
    problem_id: "",
    title: "",
    statement: "",
    points: "",
    time_limit: "",
    event_id: "",
  });

  const [sampleTestCases, setSampleTestCases] = useState([
    {
      testcase_id: "",
      input_file: "",
      output_file: "",
      input_content: "",
      output_content: "",
      input_size: "",
      output_size: "",
      is_sample: "",
      problem_id: "",
    },
  ]);
  const [inputFile, setInputFile] = useState(undefined);
  const [languageSelected, setLanguageSelected] = useState("");
  const [status, setStatus] = useState("Not Submitted");
  const [submissionPending, setSubmissionPending] = useState(false);

  const handleInputFile = (file) => {
    setInputFile(file);
    let fr = new FileReader();
    fr.addEventListener("load", () => {
      setInputFile((prev) => {
        let n = prev;
        n.content = fr.result;
        return n;
      });
    });
    fr.readAsText(file);
  };

  const handleSubmit = () => {
    setSubmissionPending(true);
    axios
      .post(
        `/api/participant/events/${router.query.event_id}/problems/${router.query.problem_id}/?type=submit`,
        {
          file: inputFile,
          language: languageSelected === 1 ? "C++" : "C",
        },
        {
          timeout: 60000,
        }
      )
      .then((res) => res.data)
      .then((res) => {
        setStatus(res.status);
        setSubmissionPending(false);
      });
  };

  useEffect(() => {
    window.MathJax?.typesetClear();
    window.MathJax?.typeset();
    axios
      .get(
        `/api/participant/events/${router.query.event_id}/problems/${router.query.problem_id}`
      )
      .then((res) => res.data)
      .then((res) => {
        setProblem({
          ...res.problem,
        });
        setSampleTestCases(res.samples);
      });
    window.MathJax?.startup.document.updateDocument();
  }, [router.query]);

  useEffect(() => {
    window.MathJax?.typesetClear();
    window.MathJax?.typeset();
    window.MathJax?.startup.document.updateDocument();
  }, [problem]);

  useEffect(() => {}, [submissionPending]);

  return router.query.problem_id ? (
    <div className="problem-viewer flex flex-row w-full min-h-fit py-4">
      <div className="left flex flex-col w-3/4">
        <div className="top flex flex-row">
          <button
            className="w-8 h-8 bg-blue-500 flex flex-row items-center justify-center rounded-full cursor-pointer hover:shadow-[0_0_8px_rgba(0,0,0,0.15)] duration-[350ms]"
            title="Go back"
            onClick={() => router.back()}
          >
            <BackButton height="20" width="20" color="#f8fafc" />
          </button>
        </div>
        <div className="middle flex flex-col w-full">
          <div className="problem-frame flex flex-col w-full">
            <div className="top w-full flex flex-col items-center">
              <span className="text-2xl">
                {router.query.order}. {problem.title}
              </span>
              <span className="text-[18px]">
                Time limit: {problem.time_limit}s
              </span>
              <span className="text-[18px]">Points: {problem.points}</span>
            </div>
            <div className="middle flex flex-col">
              {problem.statement?.length
                ? labevalMarkdownParser(problem.statement)
                : null}
            </div>
            <div className="tail flex flex-col gap-4 mt-4">
              <span className="text-2xl font-bold"> Samples </span>
              {sampleTestCases.length
                ? sampleTestCases.map((sample, index) => {
                    return (
                      <Table
                        key={index}
                        heads={[
                          {
                            content: "input",
                            className: "font-medium w-1/2",
                          },
                          {
                            content: "output",
                            className: "font-medium w-1/2",
                          },
                        ]}
                        className="w-full"
                        empty={sampleTestCases.length === 0}
                      >
                        <tr>
                          <td className="whitespace-pre">
                            {sample.input_content}
                          </td>
                          <td className="whitespace-pre">
                            {sample.output_content}
                          </td>
                        </tr>
                      </Table>
                    );
                  })
                : null}
            </div>
          </div>
        </div>
      </div>
      <div className="right flex flex-col gap-4 w-[25%]">
        <div className="border border-solid border-slate-300 p-4 rounded-[5px] flex flex-col gap-4">
          <h2> Submit </h2>
          <Select options={["C", "C++"]} setSelected={setLanguageSelected} />
          <div className="bottom flex flex-row gap-2 justify-between">
            <div
              className={
                "input flex flex-row pl-2 pr-4 h-10 w-fit border border-solid border-slate-300 rounded-[5px] items-center" +
                (inputFile ? " bg-blue-500 text-slate-50" : "")
              }
            >
              <div
                className="file-remove-button"
                onClick={() => {
                  let elem = document.querySelector(".submit-file");
                  if (inputFile) {
                    setInputFile(undefined);
                    elem.value = "";
                  } else {
                    elem.click();
                  }
                }}
              >
                {inputFile ? (
                  <CancelIcon
                    heoght="16"
                    width="16"
                    color="#f8fafc"
                    className="cursor-pointer"
                  />
                ) : (
                  <FileAddIcon
                    height="24"
                    width="24"
                    color="#64748b"
                    className="cursor-pointer"
                  />
                )}
              </div>
              <label
                className={
                  "cursor-pointer pl-2" +
                  (inputFile ? " text-slate-50" : " text-slate-400")
                }
              >
                <span>{inputFile ? inputFile?.name : "Choose a file"}</span>
                <input
                  type="file"
                  required={true}
                  className="submit-file h-10 border-0 bg-red-500 text-slate-50 hidden w-fit"
                  onChange={(e) => {
                    handleInputFile(e.target.files[0]);
                  }}
                />
              </label>
            </div>
            <button
              className="px-4 h-10 bg-blue-500 hover:bg-blue-600 text-slate-50 duration-[350ms] rounded-[5px]"
              onClick={() => handleSubmit()}
            >
              {!submissionPending ? (
                <span className="flex flex-row items-center gap-2">
                  <FileAddIcon width="24" height="24" color="#f8fafc" />
                  Submit
                </span>
              ) : (
                <Loader />
              )}
            </button>
          </div>
        </div>

        <div className="border border-solid border-slate-300 p-4 rounded-[5px] flex flex-col gap-4">
          <h2> Status </h2>
          <span
            className={
              "font-medium " +
              (status === "Accepted" ? "text-green-500" : "text-red-500")
            }
          >
            {status}
          </span>
        </div>
      </div>
    </div>
  ) : null;
}

export default function Problem({ setNotification }) {
  const router = useRouter();
  return (
    <Layout setNotification={setNotification} page="events">
      <ProblemViewer setNotification={setNotification} />
    </Layout>
  );
}
