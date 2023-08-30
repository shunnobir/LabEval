"use client";

import Layout from "@/components/Layout";
import { labevalMarkdownParser } from "@/components/markdown/mdParser";
import { BackButton } from "@/icons";
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

  useEffect(() => {
    window.MathJax?.typesetClear();
    window.MathJax?.typeset();
    axios
      .get(
        `/api/instructor/events/${router.query.event_id}/problems/${router.query.problem_id}`
      )
      .then((res) => res.data)
      .then((res) => {
        setProblem({
          ...res,
        });
      });
    window.MathJax?.startup.document.updateDocument();
  }, [router.query]);

  useEffect(() => {
    window.MathJax?.typesetClear();
    window.MathJax?.typeset();
    window.MathJax?.startup.document.updateDocument();
  }, [problem]);

  return router.query.problem_id ? (
    <div className="problem-viewer flex flex-col w-full h-full">
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
          </div>
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
