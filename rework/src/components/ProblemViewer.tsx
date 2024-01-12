"use client";

import React, { useEffect, useState } from "react";
import { Noto_Serif } from "next/font/google";
import dynamic from "next/dynamic";
import { User, Event, Problem, Testcase } from "../../types";
import EventTimer from "./EventTimer";
import getUser from "@/app/lib/getUser";
import Button from "./Button";
import { AddIcon, CopyIcon, ShortTextIcon, ShowIcon } from "@/icons";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
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
  const [user, setUser] = useState<User>();
  const router = useRouter();
  const pathName = usePathname();

  const [testcases, setTestcases] = useState<Testcase[]>([]);

  useEffect(() => {
    fetch(`/api/testcase?event_id=${params.event_id}&order=${params.order}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        if (!res.ok) toast.error(res.status);
        else setTestcases(res.testcases);
      });
  }, [params.event_id, params.order]);

  useEffect(() => {
    getUser().then((res) => {
      if (!res.ok) {
        return;
      }
      setUser(res.user);
    });
  }, []);

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
        <div className="w-full flex flex-col gap-4 p-2 mt-4">
          <h2 className="font-bold">Samples</h2>
          {testcases.map((testcase, index) => {
            return testcase.is_sample ? (
              <div
                key={index}
                className="border border-solid border-zinc-800 rounded-md"
              >
                <div className="flex gap-2 border-b border-solid border-zinc-800 w-full p-2 bg-zinc-800">
                  <ShortTextIcon width="20" height="20" />
                  <span>Sample {index + 1}</span>
                </div>
                <div className="flex">
                  <div className="flex flex-col flex-1 overflow-auto border-r border-solid border-zinc-800">
                    <div className="flex justify-between border-b border-solid border-zinc-800">
                      <span className="p-2 font-semibold">Input</span>
                    </div>
                    <div className="p-2 h-40 relative">
                      <pre>{testcase.input_content}</pre>
                      <button
                        className="absolute right-2 top-2 p-1 hover:bg-zinc-700/30 rounded-md border border-solid border-zinc-800"
                        title="click to copy"
                        onClick={() => {
                          navigator.clipboard.writeText(testcase.input_content);
                          toast.info("input copied");
                        }}
                      >
                        <CopyIcon color="#3f3f46" />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col flex-1 overflow-auto">
                    <div className="flex justify-between border-b border-solid border-zinc-800">
                      <span className="p-2 font-semibold">Output</span>
                    </div>
                    <div className="p-2 h-40 relative">
                      <pre>{testcase.output_content}</pre>
                      <button
                        className="absolute right-2 top-2 p-1 hover:bg-zinc-700/30 rounded-md border border-solid border-zinc-800"
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
      </div>
      <div className="right flex flex-col w-[25%]">
        <div className="top">
          <EventTimer event={event} />
        </div>
      </div>
    </div>
  );
}
