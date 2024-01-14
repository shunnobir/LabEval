import Table, { TableCell, TableRow } from "@/components/Table";
import React from "react";
import { getProblems } from "../lib/getProblems";
import Link from "next/link";
import InternalError from "@/components/InternalError";

async function Problems() {
  const { problems, ok, status } = await getProblems();

  if (!ok) {
    return <InternalError status={status} />;
  }

  return (
    <div className="problems flex gap-8">
      <div className="left flex flex-col w-[75%] gap-2">
        <h2>Problems</h2>
        <Table
          heads={[
            { content: "#", className: "w-[5%]" },
            { content: "Problem" },
          ]}
          className="w-full"
          empty={problems?.length === 0}
        >
          {problems?.map((problem, index) => {
            return (
              <TableRow key={index}>
                <TableCell className="py-2">
                  <Link
                    href={`/events/${problem.event_id}/problems/${problem.problem_order}`}
                    className="hover:text-sky-500 hover:underline"
                  >
                    {problem.event_id + problem.problem_order}
                  </Link>
                </TableCell>
                <TableCell className="py-2">
                  <Link
                    href={`/events/${problem.event_id}/problems/${problem.problem_order}`}
                    className="hover:text-sky-500 hover:underline"
                  >
                    {problem.title}
                  </Link>
                </TableCell>
              </TableRow>
            );
          })}
        </Table>
      </div>
      <div className="right flex flex-col w-[25%]"></div>
    </div>
  );
}

export default Problems;
