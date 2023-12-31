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
import { random_string } from "@/utility";
import Link from "../../../../../../node_modules/next/link";

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

  const [event, setEvent] = useState({
    event_id: "",
    title: "",
    description: "",
    start_time: "",
    end_time: "",
    created_by: "",
  });
  const [curTime, setCurTime] = useState(new Date().getTime());
  const interval = setInterval(() => setCurTime(new Date().getTime()), 1000);
  const [timeRemaining, setTimeRemaining] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
    finished: false,
    running: false,
    color: "text-slate-900",
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

  const getProblem = () => {
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
  }

  const setTime = (event) => {
    let st = new Date(event.start_time).getTime();
    let et = new Date(event.end_time).getTime();
    let diff =
      st >= curTime ? st - curTime : et >= curTime ? et - curTime : 0;
    let color =
      st >= curTime
        ? "text-slate-900"
        : et >= curTime
          ? "text-blue-500"
          : "text-red-500";
    let running =
      st >= curTime
        ? false
        : et >= curTime
          ? true
          : false
    let hours = Math.floor(diff / (1000 * 60 * 60));
    diff -= hours * 60 * 60 * 1000;
    let minutes = Math.floor(diff / (1000 * 60));
    diff -= minutes * 60 * 1000;
    let seconds = Math.floor(diff / 1000);
    let finished =
      hours === 0 && minutes === 0 && seconds === 0 && et < curTime;
    setTimeRemaining({ hours, minutes, seconds, finished, running, color });
  };

  const getEvent = (id) => {
    axios
      .get(`/api/instructor/events/${id}/?type=info`)
      .then((res) => res.data[0])
      .then((res) => {
        if (res) {
          setEvent(res);
          setTime(res);
        }
      });
  };


  useEffect(() => {
    window.MathJax?.typesetClear();
    window.MathJax?.typeset();
    getEvent(router.query.event_id);
    getProblem();
    window.MathJax?.startup.document.updateDocument();
  }, [router.query]);

  const [inputFile, setInputFile] = useState(undefined);
  const [languageSelected, setLanguageSelected] = useState("");
  const [verdict, setVerdict] = useState("");
  const [submissionPending, setSubmissionPending] = useState(false);
  const [submissions, setSubmissions] = useState([]);

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
    let submission_id = random_string(12, true);
    axios
      .post(
        `/api/participant/events/${router.query.event_id}/problems/${router.query.problem_id}/?type=submit`,
        {
          submission_id: submission_id,
          user_id: JSON.parse(sessionStorage.getItem('user')).user_id,
          problem_id: problem.problem_id,
          code: inputFile,
          language: languageSelected === 1 ? "C++" : "C",
          time: (new Date()).toString()
        },
        {
          timeout: 60000,  // 6 seconds
        }
      )
      .then((res) => res.data)
      .then((res) => {
        setVerdict(res.verdict);
        console.log(res);
        router.push(`/participant/events/${router.query.event_id}/problems/${router.query.problem_id}/submission/${submission_id}`);
        setSubmissionPending(false);
        setInputFile(undefined);
      });
  };

  const getSubmissions = () => {
    if (!router.query?.event_id) return;
    axios
      .post(
        `/api/participant/events/${router.query.event_id}/problems/${router.query.problem_id}/?type=submission_of`,
        {
          user_id: JSON.parse(sessionStorage.getItem('user')).user_id,
          problem_id: router.query.problem_id,
        }
      )
      .then((res) => res.data)
      .then((res) => {
        setSubmissions(res.submissions);
      });

  };

  useEffect(() => {
    window.MathJax?.typesetClear();
    window.MathJax?.typeset();
    getProblem();
    getEvent(router.query.event_id);
    getSubmissions();
    window.MathJax?.startup.document.updateDocument();
  }, [router.query]);

  useEffect(() => {
    window.MathJax?.typesetClear();
    window.MathJax?.typeset();
    window.MathJax?.startup.document.updateDocument();
  }, [problem]);

  useEffect(() => { }, [submissionPending]);

  // useEffect(() => {
  //   setTime(event);
  // }, [curTime]);

  useEffect(() => {
    return () => {
      clearInterval(interval);
    }
  }, []);

  return router.query.problem_id ? (
    <div className="problem-viewer flex flex-row w-full min-h-fit py-4 justify-between">
      <div className="left flex flex-col w-[70%]">
        <div className="top flex flex-row items-center gap-4">
          <button
            className="w-8 h-8 bg-blue-500 flex flex-row items-center justify-center rounded-full cursor-pointer hover:shadow-[0_0_8px_rgba(0,0,0,0.15)] duration-[350ms]"
            title="Go back"
            onClick={() => router.back()}
          >
            <BackButton height="20" width="20" color="#f8fafc" />
          </button>
          <span className="bg-slate-200 text-xl text-blue-600 font-semibold px-4 rounded-full cursor-pointer"> <Link href={`/participant/events/${event.event_id}`}> {"#" + event.title} </Link> </span>
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
      <div className="right flex flex-col gap-8 w-[25%]">
        <div className="top flex flex-col w-full border border-solid border-slate-300 rounded-xl">
          <span className="text-xl font-semibold text-blue-600 bg-slate-100 px-4 py-2 border-b border-solid border-slate-300 rounded-t-xl"> {timeRemaining.color === "text-slate-900" ? "Time to Start" : "Time Remaining"} </span>
          <span className={timeRemaining.color + " p-4 font-medium text-center text-2xl"}>
            {timeRemaining.finished
              ? "Contest Finished"
              : String(timeRemaining.hours).padStart(2, 0) +
              ":" +
              String(timeRemaining.minutes).padStart(2, 0) +
              ":" +
              String(timeRemaining.seconds).padStart(2, 0)}
          </span>
        </div>
        <div className="border border-solid border-slate-300 rounded-xl flex flex-col gap-4">
          <span className="text-xl font-semibold text-blue-600 bg-slate-100 px-4 py-2 border-b border-solid border-slate-300 rounded-t-xl"> Submit </span>
          <div className="w-full px-4">
            <Select options={["C", "C++"]} setSelected={setLanguageSelected} />
          </div>
          <div className="bottom p-4 flex flex-row gap-2 justify-between">
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

        <div className="border border-solid border-slate-300 border-b-0 rounded-t-xl flex flex-col">
          <span className="text-xl font-semibold text-blue-600 bg-slate-100 px-4 py-2 border-b border-solid border-slate-300 rounded-t-xl"> Submissions </span>
          <Table
            heads={[
              { content: "Submission" },
              { content: "Time" },
              { content: "Verdict" },
            ]}
            className="h-full w-full"
            style={{ marginBottom: "0" }}
            empty={submissions.length === 0}
          >
            {submissions.map((submission, index) => {
              let time = new Date(submission.submission_time);
              return (<tr key={index}>
                <td className="text-blue-500 font-semibold cursor-pointer" onClick={() => router.push(`/participant/events/${router.query.event_id}/problems/${router.query.problem_id}/submission/${submission.submission_id}`)}> {submission.submission_id} </td>
                <td> {`${time.getDay().toString().padStart(2, 0)}/${time.getMonth().toString().padStart(2, 0)}/${time.getFullYear()} ${time.getHours().toString().padStart(2, 0)}:${time.getMinutes().toString().padStart(2, 0)}:${time.getSeconds().toString().padStart(2, 0)}`} </td>
                <td className={"font-semibold " + (submission.verdict === "Accepted" ? "text-green-600" : "text-red-500")}> {submission.verdict} </td>
              </tr>);
            })}
          </Table>
        </div>
      </div>
    </div>
  ) : null;
}

export default function Problem({ setNotification }) {
  return (
    <Layout setNotification={setNotification} page="events" title="Problem">
      <ProblemViewer setNotification={setNotification} />
    </Layout>
  );
}
