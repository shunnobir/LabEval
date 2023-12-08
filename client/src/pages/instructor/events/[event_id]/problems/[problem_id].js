"use client";

import Layout from "@/components/Layout";
import { labevalMarkdownParser } from "@/components/markdown/mdParser";
import Table from "@/components/Table";
import { BackButton } from "@/icons";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function ProblemViewer({ setNotification }) {
  const router = useRouter();
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

  const getProblem = () => {
    axios
      .get(
        `/api/instructor/events/${router.query.event_id}/problems/${router.query.problem_id}`
      )
      .then((res) => res.data)
      .then((res) => {
        setProblem({
          ...res.problem,
        });
        setSampleTestCases(res.samples);
      });
  }

  const getEvent = (id) => {
    axios
      .get(`/api/instructor/events/${id}/?type=info`)
      .then((res) => res.data[0])
      .then((res) => {
        if (res) {
          setEvent(res);
          let st = new Date(res.start_time).getTime();
          let et = new Date(res.end_time).getTime();
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

  useEffect(() => {
    window.MathJax?.typesetClear();
    window.MathJax?.typeset();
    window.MathJax?.startup.document.updateDocument();
  }, [problem]);

  useEffect(() => {
    return () => {
      clearInterval(interval);
    }
  }, []);

  return router.query.problem_id ? (
    <div className="problem-viewer flex w-full min-h-fit py-4 justify-between">
      <div className="left flex flex-col w-[70%]">
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
        <div className="top flex flex-col p-4 w-full border border-solid border-slate-300 rounded-[5px]">
          <span className="text-2xl"> {timeRemaining.color === "text-slate-900" ? "Time to Start" : "Time Remaining"} </span>
          <span className={timeRemaining.color + " font-medium"}>
            {timeRemaining.finished
              ? "Contest Finished"
              : String(timeRemaining.hours).padStart(2, 0) +
              ":" +
              String(timeRemaining.minutes).padStart(2, 0) +
              ":" +
              String(timeRemaining.seconds).padStart(2, 0)}
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
