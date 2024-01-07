import { getEvent } from "@/app/lib/getEvent";
import { getEventProblems } from "@/app/lib/getEventProblems";
import MarkdownViewer from "@/components/MarkdownViewer";
import Table from "@/components/Table";
import { labevalMarkdownParser } from "@/markdown/mdParser";
import Link from "next/link";
import React from "react";

type EventProps = {
  params: {
    event_id: string;
  };
};

export default async function Event({ params }: EventProps) {
  const { event, ok } = await getEvent(params.event_id);
  const problems = await getEventProblems(params.event_id);

  if (!ok || !problems.ok) {
    return <div>error</div>;
  }

  return (
    <div className="events flex gap-10">
      <div className="left flex flex-col flex-[2]">
        <h1 className="title">{event?.title}</h1>
        <div>
          <MarkdownViewer str={event?.description || ""} />
        </div>
        <div className="problems flex flex-col gap-2 mt-4">
          <h2>Problems</h2>
          <Table
            heads={[
              { content: "No", className: "w-[5%]" },
              { content: "Problem" },
            ]}
            className="w-full"
          >
            {problems.problems?.map((problem, index) => {
              return (
                <tr key={index}>
                  <td>{String.fromCharCode(65 + index + 1)}</td>
                  <td>
                    <Link
                      href={`/problems/${problem.problem_id}`}
                      className="hover:text-blue-500 hover:underline"
                    >
                      {problem.title}
                    </Link>
                  </td>
                </tr>
              );
            })}
          </Table>
        </div>
      </div>
      <div className="right flex flex-col flex-1"></div>
    </div>
  );
}
