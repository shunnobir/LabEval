import React from "react";
import Button from "./Button";
import { EventsCreateIcon } from "@/icons";
import Table from "./Table";
import { Event, User } from "../../types";
import { format, formatDistanceStrict } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/navigation";

type EventsViewerProps = {
  events: any;
  user?: User;
};

function EventsViewer({ events, user }: EventsViewerProps) {
  const router = useRouter();
  return (
    <div className="events flex gap-8">
      <div className="left flex flex-col flex-[2] gap-4">
        <div className="flex flex-col flex-1 gap-2">
          <h2 className="flex justify-between">
            Upcoming Events or Ongoing Events
            {user && user.role === "instructor" ? (
              <Button
                icon={<EventsCreateIcon width="20" height="20" />}
                className="text-[1rem] gap-2 rounded-md py-2"
                onClick={() => router.push("/events/create")}
              >
                <span className="hidden lg:block">New Event</span>
              </Button>
            ) : null}
          </h2>
          <Table
            heads={[
              { content: "Start Time", className: "" },
              { content: "Event", className: "" },
              { content: "Duration", className: "" },
              { content: "Participant", className: "" },
            ]}
            empty={events?.length === 0}
          >
            {events
              ?.filter(
                (event: Event & { participants: number }) =>
                  new Date(event.end_time) >= new Date()
              )
              .map((event: Event & { participants: number }, index: number) => {
                return (
                  <tr key={index}>
                    <td>
                      {format(event.start_time, "dd-MM-yyyy (EEE) HH:mm ")}
                    </td>
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
        <div className="flex flex-col flex-1 gap-2">
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
            {events
              ?.filter(
                (event: Event & { participants: number }) =>
                  new Date(event.end_time) < new Date()
              )
              .map((event: Event & { participants: number }, index: number) => {
                return (
                  <tr key={index}>
                    <td>
                      {format(event.start_time, "dd-MM-yyyy (EEE) HH:mm ")}
                    </td>
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
      </div>
      <div className="right flex flex-col flex-1"></div>
    </div>
  );
}

export default EventsViewer;
