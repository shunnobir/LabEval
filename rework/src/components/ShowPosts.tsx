"use server";

import MarkdownViewer from "@/components/MarkdownViewer";
// import { labevalMarkdownParser } from "@/markdown/mdParser";
import { formatDistance } from "date-fns";
import Link from "next/link";
// import Button from "@/components/Button";
// import { AllIcon } from "@/icons";
import { getEvents } from "@/app/lib/getEvents";

type ShowPostsProps = {
  all: boolean;
};

export default async function ShowPosts({ all }: ShowPostsProps) {
  const { events, ok } = await getEvents();

  if (!ok) {
    return <main>error</main>;
  }

  return (
    <main className="show-posts flex flex-col gap-10 flex-[4]">
      {events.map((event, index) => {
        return (
          <div
            key={index}
            className="event flex flex-col justify-center border border-solid border-slate-800 rounded-md"
          >
            <div className="top flex items-center bg-slate-800 p-3 rounded-t-md">
              <Link
                href={`/events/${event.event_id}`}
                className="hover:text-sky-500 hover:underline"
              >
                {event.title}
              </Link>
            </div>
            <div className="description p-3">
              <MarkdownViewer str={event.description} />
            </div>
            <div className="tail border-t border-solid border-slate-800 p-3">
              Posted:{" "}
              {formatDistance(new Date(event.create_date), new Date(), {
                addSuffix: true,
              })}
            </div>
          </div>
        );
      })}
      {events.length === 0 ? (
        <div className="flex flex-1 items-center justify-center text-slate-600">
          No posts yet
        </div>
      ) : null}
    </main>
  );
}
