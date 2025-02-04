import { getEvent } from "@/app/lib/getEvent";
import { getEventProblems } from "@/app/lib/getEventProblems";
import EventProblems from "@/components/EventProblems";
import MarkdownViewer from "@/components/MarkdownViewer";
import React from "react";
import { Event } from "../../../../types";
import EventTimer from "@/components/EventTimer";
import { notFound } from "next/navigation";
import Loading from "@/components/Loading";
import LButton from "@/components/LButton";
import Link from "next/link";
import { UnfilledPostsIcon } from "@/icons";
import EventQuickLinks from "@/components/EventQuickLinks";

type EventProps = {
  params: {
    event_id: number;
  };
};

export default async function Event({ params }: EventProps) {
  const { event, ok } = await getEvent(params.event_id);
  const problems = await getEventProblems(params.event_id);

  if (!ok || !problems.ok) {
    notFound();
  }

  return (
    <div className="events flex gap-10">
      <div className="left flex flex-col w-[75%]">
        <h1 className="title">{event?.title}</h1>
        <div>
          <MarkdownViewer str={event?.description || ""} />
        </div>
      </div>
      <div className="right flex flex-col gap-8 w-[25%]">
        <div className="top">
          <EventTimer event={event as any as Event} />
        </div>
        <div className="mid">
          <EventQuickLinks event={event} />
        </div>
      </div>
    </div>
  );
}
