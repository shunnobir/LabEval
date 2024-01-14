"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import { Problem, Solutions } from "../../../types";
import { toast } from "sonner";
import Loader from "@/components/Loader";
import Loading from "@/components/Loading";
import Table, { TableCell, TableRow } from "@/components/Table";
import { format } from "date-fns";
import Link from "next/link";
import CopyButton from "@/components/CopyButton";

export default function Submissions() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [submission, setSubmission] = useState<Solutions & Problem>();
  const [sourceCode, setSourceCode] = useState<string[]>();
  const router = useRouter();

  useEffect(() => {
    fetch(`/api/submissions?solution_id=${searchParams.get("solution_id")}`)
      .then((res) => res.json())
      .then((res) => {
        if (!res.ok) {
          toast.error(res.status);
          router.push("/");
        } else {
          setSubmission(res.submission);
          setSourceCode(res.submission.code.split("\n"));
        }
        setLoading(false);
      });
  }, [searchParams, router]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="w-full h-full flex flex-col gap-8">
      <Table
        heads={[
          { content: "#", className: "text-center" },
          { content: "Date", className: "" },
          { content: "Problem", className: "" },
          { content: "Verdict", className: "" },
          { content: "Time", className: "" },
          { content: "Meory", className: "" },
        ]}
      >
        <TableRow>
          <TableCell className="py-4 text-sky-600 text-center">
            <Link
              href={`/submissions?solution_id=${submission?.solution_id}`}
              className="hover:underline"
            >
              {submission?.solution_id}
            </Link>
          </TableCell>
          <TableCell className="py-4">
            {format(submission!.submission_time, "dd-MM-yyyy (EEE) hh:mm a")}
          </TableCell>
          <TableCell className="py-4 text-sky-600">
            <Link
              href={`/events/${submission?.event_id}/problems/${submission?.problem_order}`}
              className="hover:underline"
            >
              {submission?.title}
            </Link>
          </TableCell>
          <TableCell
            className={
              (submission?.verdict === "accepted"
                ? "text-green-600"
                : submission?.verdict.match(/wrong answer/)?.length
                ? "text-red-600"
                : "text-orange-600") + " py-4"
            }
          >
            {submission?.verdict.split("\n")[0]}
          </TableCell>
          <TableCell className="py-4">
            {submission?.execution_time || 0}ms
          </TableCell>
          <TableCell className="py-4">
            {submission?.memory_taken || 0}KB
          </TableCell>
        </TableRow>
      </Table>
      <div className="source-code border border-solid border-slate-200 dark:border-slate-800 rounded-md">
        <div className="top flex gap-2 p-2 border-b border-solid border-slate-200 dark:border-slate-800 rounded-t-md bg-slate-800 text-slate-100">
          <pre>language: {submission?.language}</pre>
          <pre>({sourceCode?.length} lines)</pre>
        </div>
        <div className="bottom relative py-1 overflow-auto max-h-[30rem]">
          {sourceCode?.map((line, index) => {
            return (
              <div key={index} className="source-code-line flex gap-3 px-2">
                <pre>
                  {String(index + 1).padStart(
                    Math.log10((sourceCode?.length || 0) + 1) + 1,
                    " "
                  )}
                </pre>
                <pre>{line}</pre>
              </div>
            );
          })}
          <CopyButton
            className="absolute right-2 top-2"
            content={submission?.code || ""}
          />
        </div>
      </div>
    </div>
  );
}
