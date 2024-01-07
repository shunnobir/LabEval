import React from "react";
import { getEvents } from "../lib/getEvents";
import Table from "@/components/Table";
import { format, formatDistanceStrict } from "date-fns";
import Link from "next/link";

export default async function Events() {
  const { events, ok } = await getEvents();

  if (!ok) {
    return <div>Error</div>;
  }

  return (
    <div className="events flex gap-8">
      <div className="left flex flex-col flex-[2] gap-4">
        <h2>Past Events</h2>
        <Table
          heads={[
            { content: "Start Time", className: "" },
            { content: "Event", className: "" },
            { content: "Duration", className: "" },
            { content: "Participant", className: "" },
          ]}
          empty={events?.length === 0}
        >
          {events?.map((event, index) => {
            return (
              <tr key={index}>
                <td>{format(event.start_time, "dd-MM-yyyy (EEE) HH:mm ")}</td>
                <td>
                  <Link
                    href={`/events/${event.event_id}`}
                    className="hover:text-blue-500 hover:underline"
                  >
                    {event.title}
                  </Link>
                </td>
                <td>
                  {formatDistanceStrict(event.end_time, event.start_time)}
                </td>
                <td>{event.participants}</td>
              </tr>
            );
          })}
        </Table>
      </div>
      <div className="right flex flex-col flex-1"></div>
    </div>
  );
}
