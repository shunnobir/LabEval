import ProblemForm from "@/components/ProblemForm";
import Separator from "@/components/Separator";
import React from "react";

export default function AddProblem({
  params,
}: {
  params: { event_id: string };
}) {
  return (
    <div className="add-problem flex flex-col gap-4 md:mx-[5%]">
      <div className="flex flex-col gap-2">
        <h1 className="font-bold">New Problem</h1>
        <span className="text-zinc-500">
          Create new problems in markdown and add testcases.
        </span>
        <Separator className="my-4" />
      </div>
      <ProblemForm event_id={params.event_id} />
    </div>
  );
}
