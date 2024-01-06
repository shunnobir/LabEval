import { getEvents } from "./lib/getEvents";
import { labevalMarkdownParser } from "@/markdown/mdParser";
import { formatDistance } from "date-fns";
import Link from "next/link";

export default async function Home() {
  const { events, ok } = await getEvents();

  if (!ok) {
    return <main>error</main>;
  }

  return (
    <main className="min-h-fit w-full flex gap-10 pb-4">
      <div className="left flex flex-col gap-10 flex-[2]">
        {events.map((event, index) => {
          return (
            <div
              key={index}
              className="event flex flex-col justify-center border border-solid border-zinc-700 rounded-md"
            >
              <div className="top flex items-center bg-zinc-700 p-3 rounded-t-md">
                <Link
                  href={`/events/${event.event_id}`}
                  className="hover:text-blue-500 hover:underline"
                >
                  {event.title}
                </Link>
              </div>
              <div className="description p-3">
                {labevalMarkdownParser(event.description)}
              </div>
              <div className="tail border-t border-solid border-zinc-700 p-3">
                Posted:{" "}
                {formatDistance(new Date(event.create_date), new Date(), {
                  addSuffix: true,
                })}
              </div>
            </div>
          );
        })}
      </div>
      <div className="right flex-1 border border-solid border-zinc-700 rounded-md"></div>
    </main>
  );
}
