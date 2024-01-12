"use client";

import React, { useEffect, useState } from "react";
import { Testcase } from "../../../../../../../types";
import { toast } from "sonner";
import { CopyIcon, ShortTextIcon } from "@/icons";
import Separator from "@/components/Separator";

export default function Testcases({
  params,
}: {
  params: { event_id: string; order: string };
}) {
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

  return (
    <div className="flex flex-col gap-4 pb-8">
      {testcases.map((testcase, index) => {
        return (
          <div
            key={index}
            className="border border-solid border-zinc-800 rounded-md"
          >
            <div className="flex gap-2 border-b border-solid border-zinc-800 w-full p-2 bg-zinc-800">
              <ShortTextIcon width="20" height="20" />
              <span>{testcase.is_sample ? "Sample" : "Hidden"}</span>
            </div>
            <div className="flex">
              <div className="flex flex-col flex-1 overflow-auto border-r border-solid border-zinc-800">
                <div className="flex justify-between border-b border-solid border-zinc-800">
                  <span className="p-2 font-semibold">Input</span>
                  <span className="p-2">size: {testcase.input_size}B</span>
                </div>
                <div className="p-2 h-40 relative">
                  <pre>{testcase.input_content}</pre>
                  <button
                    className="absolute right-2 top-2 p-1 hover:bg-zinc-700/30 rounded-md border border-solid border-zinc-800"
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
                  <span className="p-2">size: {testcase.output_size}B</span>
                </div>
                <div className="p-2 h-40 relative">
                  <pre>{testcase.output_content}</pre>
                  <button
                    className="absolute right-2 top-2 p-1 hover:bg-zinc-700/30 rounded-md border border-solid border-zinc-800"
                    onClick={() => {
                      navigator.clipboard.writeText(testcase.output_content);
                      toast.info("output copied");
                    }}
                  >
                    <CopyIcon color="#3f3f46" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
