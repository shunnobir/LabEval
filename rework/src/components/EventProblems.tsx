"use client";

import React from "react";
import { Problem } from "../../types";
import Table, { TableRow, TableCell } from "./Table";
import Button from "./Button";
import { AddIcon } from "@/icons";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

function EventProblems({
  event,
  problems,
  user,
}: {
  event: any;
  problems: any;
  user: any;
}) {
  const router = useRouter();
  const pathName = usePathname();
  return (
    <div className="problems flex flex-col gap-2 mt-4">
      <div className="flex">
        <h2>Problems</h2>
        {user && event && user.user_id === event.user_id ? (
          <Button
            icon={<AddIcon width="20" height="20" />}
            className="ml-auto py-2 rounded-md gap-2"
            onClick={() => {
              router.push(`/events/${event.event_id}/add`);
            }}
          >
            <span className="hidden sm:inline-block">Add Problem</span>
          </Button>
        ) : null}
      </div>
      <Table
        heads={[
          { content: "No", className: "w-[5%]" },
          { content: "Problem", className: "w-2/3" },
          { content: "Submissions", className: "w-[5%]" },
        ]}
        className="w-full"
        empty={problems?.length === 0}
      >
        {problems?.map(
          (problem: Problem & { submissions: number }, index: number) => {
            return (
              <TableRow key={index}>
                <TableCell className="py-2">{problem.problem_order}</TableCell>
                <TableCell className="py-2">
                  <Link
                    href={`/events/${problem.event_id}/problems/${problem.problem_order}`}
                    className="hover:text-sky-500 hover:underline"
                  >
                    <span>{problem.title}</span>
                  </Link>
                </TableCell>
                <TableCell>
                  <span>{problem.submissions}</span>
                </TableCell>
              </TableRow>
            );
          }
        )}
      </Table>
    </div>
  );
}

export default EventProblems;
