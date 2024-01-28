"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Problem, Solutions, User } from "../../../types";
import Loading from "@/components/Loading";
import Table, { TableCell, TableRow } from "@/components/Table";
import { format } from "date-fns";
import Link from "next/link";
import getUser from "../lib/getUser";
import UnauthorizedAccess from "@/components/UnauthorizedAccess";

export default function Submissions() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User>();
  const [submissions, setSubmissions] = useState<(Solutions & Problem)[]>();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      fetch(`/api/submissions?user_id=${user.user_id}`)
        .then((res) => res.json())
        .then((res) => {
          setSubmissions(res.submissions);
          setLoading(false);
        });
    }
  }, [user, router]);

  useEffect(() => {
    getUser().then((res) => {
      if (res.ok) setUser(res.user);
      if (!res.ok) setLoading(false);
    });
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return <UnauthorizedAccess />;
  }

  return (
    <div className="w-full min-h-max flex flex-col gap-8 py-8">
      <Table
        heads={[
          { content: "#", className: "text-center" },
          { content: "Date", className: "" },
          { content: "Problem", className: "" },
          { content: "Verdict", className: "" },
          { content: "Time", className: "" },
          { content: "Meory", className: "" },
        ]}
        empty={submissions?.length === 0}
      >
        {submissions?.map((submission, index) => {
          return (
            <TableRow key={index}>
              <TableCell className="py-4 text-sky-600 text-center">
                <Link
                  href={`/submissions/${submission?.solution_id}`}
                  className="hover:underline font-normal"
                >
                  {submission?.solution_id}
                </Link>
              </TableCell>
              <TableCell className="py-4">
                {format(
                  submission!.submission_time,
                  "dd-MM-yyyy (EEE) hh:mm a"
                )}
              </TableCell>
              <TableCell className="py-4 text-sky-600">
                <Link
                  href={`/events/${submission?.event_id}/problems/${submission?.problem_order}`}
                  className="hover:underline font-normal"
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
                    : "text-orange-600") + " py-4 font-semibold"
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
          );
        })}
      </Table>
    </div>
  );
}
