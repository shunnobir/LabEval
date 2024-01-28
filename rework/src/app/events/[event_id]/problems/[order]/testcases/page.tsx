"use client";

import React, { useEffect, useState } from "react";
import { Event, Testcase, User } from "../../../../../../../types";
import { toast } from "sonner";
import { CopyIcon, ShortTextIcon } from "@/icons";
import getUser from "@/app/lib/getUser";
import UnauthorizedAccess from "@/components/UnauthorizedAccess";
import Loading from "@/components/Loading";
import Page404 from "@/components/404";
import CopyButton from "@/components/CopyButton";

export default function Testcases({
  params,
}: {
  params: { event_id: string; order: string };
}) {
  const [loading, setLoading] = useState(0);
  const [testcases, setTestcases] = useState<Testcase[]>([]);
  const [user, setUser] = useState<User>();
  const [event, setEvent] = useState<Event>();

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
      if (res.ok) setUser(res.user);
      setLoading((prev) => prev + 1);
    });
    fetch(`/api/events?event_id=${params.event_id}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.ok) setEvent(res.event);
        setLoading((prev) => prev + 1);
      });
  }, [params.event_id]);

  if (loading === 0) {
    return <Loading />;
  }

  if (loading > 0 && !event) {
    return <Page404 />;
  }

  if (loading > 0 && event && !user) {
    return <UnauthorizedAccess />;
  }

  return user && event && user.user_id === event.user_id ? (
    <div className="flex flex-col gap-4 pb-8">
      {testcases.map((testcase, index) => {
        return (
          <div
            key={index}
            className="border border-solid border-slate-300 dark:border-slate-800 rounded-md"
          >
            <div className="flex gap-2 border-b border-solid border-slate-300 dark:border-slate-800 w-full p-2 bg-slate-800 text-slate-100">
              <ShortTextIcon width="20" height="20" />
              <span>{testcase.is_sample ? "Sample" : "Hidden"}</span>
            </div>
            <div className="flex">
              <div className="flex flex-col flex-1 overflow-auto border-r border-solid border-slate-300 dark:border-slate-800">
                <div className="flex border-b border-solid border-slate-300 dark:border-slate-800">
                  <span className="p-2 font-semibold">
                    Input
                    <span className="text-slate-400 dark:text-slate-600 text-sm">
                      {" "}
                      ({testcase.input_size}B)
                    </span>
                  </span>
                  <CopyButton
                    className="ml-auto border-transparent dark:border-transparent"
                    content={testcase.input_content}
                  />
                </div>
                <div className="p-2 h-40 relative overflow-auto">
                  <pre>{testcase.input_content}</pre>
                </div>
              </div>
              <div className="flex flex-col flex-1 overflow-auto">
                <div className="flex border-b border-solid border-slate-300 dark:border-slate-800">
                  <span className="p-2 font-semibold">
                    Output
                    <span className="text-slate-400 dark:text-slate-600 text-sm">
                      {" "}
                      ({testcase.output_size}B)
                    </span>
                  </span>
                  <CopyButton
                    className="ml-auto border-transparent dark:border-transparent"
                    content={testcase.output_content}
                  />
                </div>
                <div className="p-2 h-40 relative overflow-auto">
                  <pre>{testcase.output_content}</pre>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  ) : (
    <UnauthorizedAccess />
  );
}
