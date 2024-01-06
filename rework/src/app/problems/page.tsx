import Table from "@/components/Table";
import React from "react";
import { getProblems } from "../lib/getProblems";
import Link from "next/link";

async function Problems() {
  const { problems, ok } = await getProblems();

  if (!ok) {
    return <div>error</div>;
  }

  return (
    <div className="problems flex gap-8">
      <div className="left flex flex-col flex-[2]">
        Problems
        <Table
          heads={[{ content: "", className: "w-[5%]" }, { content: "Problem" }]}
          className="w-full"
        >
          {problems?.map((problem, index) => {
            return (
              <tr key={index}>
                <td></td>
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
      <div className="right flex flex-col flex-1"></div>
    </div>
  );
}

export default Problems;
