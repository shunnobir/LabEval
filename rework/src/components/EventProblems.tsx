"use client";

import React from "react";
import { Problem } from "../../types";
import Table from "./Table";
import Button from "./Button";
import { AddIcon } from "@/icons";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

function EventProblems({ problems }: { problems: any }) {
  const router = useRouter();
  const pathName = usePathname();
  return (
    <div className="problems flex flex-col gap-2 mt-4">
      <div className="flex">
        <h2>Problems</h2>
        <Button
          icon={<AddIcon width="24" height="24" />}
          className="ml-auto py-2 rounded-md gap-2"
          onClick={() => {
            router.push(pathName + "/add");
          }}
        >
          <span className="hidden sm:inline-block">Add Problem</span>
        </Button>
      </div>
      <Table
        heads={[{ content: "No", className: "w-[5%]" }, { content: "Problem" }]}
        className="w-full"
        empty={problems?.length === 0}
      >
        {problems?.map((problem: Problem, index: number) => {
          return (
            <tr key={index}>
              <td>{problem.problem_order}</td>
              <td>
                <Link
                  href={`/events/${problem.event_id}/problems/${problem.problem_order}`}
                  className="hover:text-blue-500 hover:underline"
                >
                  <span>{problem.title}</span>
                </Link>
              </td>
            </tr>
          );
        })}
      </Table>
    </div>
  );
}

export default EventProblems;
