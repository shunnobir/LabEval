"use client";

import React, { Suspense, useEffect, useState } from "react";
import { Noto_Serif } from "next/font/google";
import dynamic from "next/dynamic";
import { User, Event, Problem, Testcase, Solutions } from "../../types";
import EventTimer from "./EventTimer";
import getUser from "@/app/lib/getUser";
import Button from "./Button";
import {
  AddIcon,
  CodeFileIcon,
  CopyIcon,
  ShortTextIcon,
  ShowIcon,
} from "@/icons";
import { usePathname, useRouter } from "next/navigation";
import { format } from "date-fns";
import { toast } from "sonner";
import Select from "./Select";
import Table, { TableCell, TableRow } from "./Table";
import Loader from "./Loader";
import generateId from "@/app/generateId";
import Link from "next/link";
import Loading from "./Loading";
import LoaderButton from "./LoaderButton";
const MarkdownViewer = dynamic(() => import("@/components/MarkdownViewer"), {
  ssr: false,
});

// const notoSerif = Noto_Serif({
//   weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
//   style: ["normal", "italic"],
//   subsets: ["latin"],
//   fallback: ["serif"],
//   preload: true,
// });

type ProblemViewerProps = {
  problem: Problem;
  event: Event;
  params: { event_id: number; order: string };
};

export default function ProblemViewer({
  problem,
  event,
  params,
}: ProblemViewerProps) {
  const [loading, setLoading] = useState(true);
  const [submissionsLoading, setSubmissionsLoading] = useState(true);
  const [testcasesLoading, setTestcasesLoading] = useState(true);
  const [user, setUser] = useState<User>();
  const router = useRouter();
  const pathName = usePathname();

  const [testcases, setTestcases] = useState<Testcase[]>([]);
  const [fileType, setFileType] = useState(0);
  const [inputFile, setInputFile] = useState<File>();
  const [code, setCode] = useState("");
  const [submissions, setSubmissions] = useState<Solutions[]>([]);
  const [pending, setPending] = useState(false);

  const handleInputFile = (file?: File | null) => {
    if (file) {
      setInputFile(file);
      let fr = new FileReader();
      fr.addEventListener("load", () => {
        setCode(fr.result?.toString() || "");
      });
      fr.readAsText(file);
    }
  };

  const handleSubmit = () => {
    if (!user) {
      toast.error("login to submit");
      router.push("/auth?auth=login");
      return;
    }

    if (
      process.env.NODE_ENV === "production" ||
      process.env.LABEVAL_USE_NEON === "true"
    ) {
      toast.info(
        "submitting solutions from deployed website is not supported yet"
      );
      return;
    }

    const solution_id = generateId(12, true);
    setPending(true);
    fetch(`/api/problems/submit`, {
      method: "POST",
      body: JSON.stringify({
        solution_id,
        code: code,
        language: fileType === 0 ? "C" : fileType === 1 ? "C++" : "Python",
        extension: fileType === 0 ? "c" : fileType === 1 ? "cpp" : "py",
        submission_time: new Date(),
        user_id: user?.user_id,
        problem_id: problem.problem_id,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (!res.ok) toast.error(res.status);
        setPending(false);
      });
    router.push(`/submissions?solution_id=${solution_id}`);
  };

  useEffect(() => {
    fetch(`/api/testcase?event_id=${params.event_id}&order=${params.order}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        if (!res.ok) toast.error(res.status);
        else setTestcases(res.testcases);
        setTestcasesLoading(false);
      });
  }, [params.event_id, params.order]);

  useEffect(() => {
    getUser().then((res) => {
      if (res.ok) setUser(res.user);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (user) {
      fetch(
        `/api/problems/submit?user_id=${user.user_id}&problem_id=${problem.problem_id}`,
        {
          method: "GET",
          cache: "no-store",
        }
      )
        .then((res) => res.json())
        .then((res) => {
          if (res.ok) setSubmissions(res.submissions);
        });
    }
    setSubmissionsLoading(false);
  }, [code, fileType, problem.problem_id, user]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={"problem flex gap-8 pb-8"}>
      <div className={"left flex flex-col w-[75%] items-center"}>
        {user && user.role === "instructor" ? (
          <div className="flex gap-2 ml-auto mb-8">
            <Button
              icon={<AddIcon width="20" height="20" />}
              className="ml-auto gap-2 py-2"
              onClick={() => router.push(`${pathName}/testcases/add`)}
            >
              Add testcase
            </Button>
            <Button
              icon={<ShowIcon width="20" height="20" />}
              className="ml-auto gap-2 py-2"
              onClick={() => router.push(`${pathName}/testcases/`)}
            >
              Show testcases
            </Button>
          </div>
        ) : null}
        <h2>{problem?.problem_order + ". " + problem?.title}</h2>
        <span className="text-lg">time limit: {problem?.time_limit}s</span>
        <span className="text-lg">points: {problem?.points}</span>
        <MarkdownViewer str={problem?.statement as string} />
        {!testcasesLoading ? (
          <div className="w-full flex flex-col gap-4 mt-4">
            <h2 className="font-bold">Samples</h2>
            {testcases.map((testcase, index) => {
              return testcase.is_sample ? (
                <div
                  key={index}
                  className="border border-solid border-slate-300 dark:border-slate-800 rounded-md"
                >
                  <div className="flex gap-2 border-b border-solid border-slate-300 dark:border-slate-800 w-full p-2 bg-slate-800 rounded-t-md text-slate-100">
                    <ShortTextIcon width="20" height="20" />
                    <span className="text-slate-100">Sample {index + 1}</span>
                  </div>
                  <div className="flex">
                    <div className="flex flex-col flex-1 overflow-auto border-r border-solid border-slate-300 dark:border-slate-800">
                      <div className="flex justify-between border-b border-solid border-slate-300 dark:border-slate-800">
                        <span className="p-2 font-semibold">Input</span>
                      </div>
                      <div className="p-2 h-40 relative">
                        <pre>{testcase.input_content}</pre>
                        <button
                          className="absolute right-2 top-2 p-1 hover:bg-slate-700/30 rounded-md border border-solid border-slate-300 dark:border-slate-800"
                          title="click to copy"
                          onClick={() => {
                            navigator.clipboard.writeText(
                              testcase.input_content
                            );
                            toast.info("input copied");
                          }}
                        >
                          <CopyIcon />
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col flex-1 overflow-auto">
                      <div className="flex justify-between border-b border-solid border-slate-300 dark:border-slate-800">
                        <span className="p-2 font-semibold">Output</span>
                      </div>
                      <div className="p-2 h-40 relative">
                        <pre>{testcase.output_content}</pre>
                        <button
                          className="absolute right-2 top-2 p-1 hover:bg-slate-700/30 rounded-md border border-solid border-slate-300 dark:border-slate-800"
                          title="click to copy"
                          onClick={() => {
                            navigator.clipboard.writeText(
                              testcase.output_content
                            );
                            toast.info("output copied");
                          }}
                        >
                          <CopyIcon color="#3f3f46" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null;
            })}
          </div>
        ) : (
          <Loading />
        )}
      </div>
      <div className="right flex flex-col gap-8 w-[25%]">
        <div className="top">
          <EventTimer event={event} />
        </div>
        {user ? (
          <>
            <div className="mid flex flex-col border border-solid border-slate-300 dark:border-slate-800 rounded-md pb-2">
              <div className="bg-slate-800 text-slate-100 rounded-t-md border-b border-solid border-slate-300 dark:border-slate-800 p-2 flex justify-center">
                <span>Submit</span>
              </div>
              <div className="p-2">
                <Select
                  options={["C", "C++", "Python"]}
                  setSelected={setFileType}
                />
              </div>
              <div className={"p-2 flex flex-col gap-2 justify-center"}>
                <label
                  className={
                    "cursor-pointer border border-solid border-slate-300 dark:border-slate-800 p-2 rounded-md flex items-center"
                  }
                >
                  <span>Choose a file</span>
                  <input
                    type="file"
                    required={true}
                    accept=".c,.cpp,.cc,.py"
                    className="hidden"
                    onChange={(e) => {
                      handleInputFile(
                        e.target?.files?.length
                          ? e.target?.files?.item(0)
                          : undefined
                      );
                    }}
                  />
                </label>
                <span
                  className={
                    "px-2 flex gap-2 " +
                    (inputFile
                      ? "text-slate-500 dark:text-slate-300"
                      : "text-slate-500")
                  }
                >
                  <CodeFileIcon width="20" height="20" />
                  {inputFile ? inputFile?.name : "No file choosen"}
                </span>
              </div>
              {!pending ? (
                <Button
                  className={"mx-2 mb-2"}
                  disabled={inputFile === undefined}
                  title={"choose a file to submit"}
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              ) : (
                <LoaderButton />
              )}
            </div>
            {!submissionsLoading ? (
              <div className="flex flex-col">
                {/* <span className="bg-slate-800 text-slate-100 text-center p-2 border border-solid border-slate-300 dark:border-slate-800 border-b-0 rounded-t-md">
                  Submissions
                </span> */}
                <Table
                  heads={[
                    { content: "Submission" },
                    { content: "Time", className: "min-w-20" },
                    { content: "Verdict" },
                  ]}
                  className="h-full w-full"
                  style={{ marginBottom: "0" }}
                  empty={submissions?.length === 0}
                >
                  {submissions?.map((submission, index) => {
                    let time = new Date(submission.submission_time);
                    return (
                      <TableRow key={index} className="text-sm">
                        <TableCell className="text-sky-500 font-semibold">
                          <Link
                            href={`/submissions?solution_id=${submission?.solution_id}`}
                          >
                            {submission?.solution_id}
                          </Link>
                        </TableCell>
                        <TableCell>
                          {format(
                            submission?.submission_time,
                            "dd-MM-yyyy (EEE) hh:mm a"
                          )}
                        </TableCell>
                        <TableCell
                          className={
                            "font-semibold " +
                            (submission.verdict === "accepted"
                              ? "text-green-600"
                              : "text-red-500")
                          }
                        >
                          {submission.verdict.split("\n")[0]}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </Table>
              </div>
            ) : (
              <div className="w-full h-40">
                <Loading />
              </div>
            )}
          </>
        ) : null}
      </div>
    </div>
  );
}
