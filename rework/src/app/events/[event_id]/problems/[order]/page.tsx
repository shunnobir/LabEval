import React, { Suspense } from "react";
import { getProblem } from "@/app/lib/getProblem";
import ProblemViewer from "@/components/ProblemViewer";
import { getEvent } from "@/app/lib/getEvent";
import { Event, Problem, Testcase } from "../../../../../../types";
import Loader from "@/components/Loader";
import InternalError from "@/components/InternalError";

type ProblemProps = {
  params: {
    order: string;
    event_id: number;
  };
};

async function Problem({ params }: ProblemProps) {
  const { problem, ok } = await getProblem(params.order, params.event_id);
  const event = await getEvent(params.event_id);

  if (!ok || !event.ok) {
    return <InternalError />;
  }

  return (
    <ProblemViewer
      problem={problem as any as Problem}
      event={event.event as any as Event}
      params={params}
    />
  );
}

export default Problem;
