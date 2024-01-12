import React, { useEffect, useState } from "react";
import Button from "./Button";
import { EventsCreateIcon } from "@/icons";
import Table from "./Table";
import { Event, User } from "../../types";
import {
  format,
  formatDistance,
  formatDistanceStrict,
  formatDuration,
  intervalToDuration,
} from "date-fns";
import Link from "next/link";
import { useRouter } from "next/navigation";

type EventsViewerProps = {
  events: any;
  user?: User;
};

type NEvent = Event & { participants: number };

function EventsViewer({ events, user }: EventsViewerProps) {
  const router = useRouter();
  const [ongoingEvents, setOngoingEvents] = useState<NEvent[]>();
  const [pastEvents, setPastEvents] = useState<NEvent[]>();
  const [timeNow, setTimeNow] = useState(new Date());

  useEffect(() => {
    setOngoingEvents(
      events?.filter(
        (event: Event & { participants: number }) =>
          new Date(event.end_time) >= new Date()
      )
    );
    setPastEvents(
      events?.filter(
        (event: Event & { participants: number }) =>
          new Date(event.end_time) < new Date()
      )
    );
  }, [events]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setTimeNow(new Date());
    }, 1000);
  }, [timeNow]);

  return (
    <div className="events flex gap-8">
      <div className="left flex flex-col w-[80%] gap-4">
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
              { content: "Time to start or Time Remaining", className: "" },
            ]}
            empty={ongoingEvents?.length === 0}
          >
            {ongoingEvents?.map((event: NEvent, index: number) => {
              return (
                <tr key={index}>
                  <td>
                    {format(event.start_time, "dd-MM-yyyy (EEE) hh:mm a")}
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
                    {formatDuration(
                      intervalToDuration({
                        end: event.end_time,
                        start: event.start_time,
                      }),
                      {
                        delimiter: " ",
                        format: ["days", "hours", "minutes"],
                      }
                    )}
                  </td>
                  <td>{event.participants}</td>
                  {event.start_time > timeNow ? (
                    <td className="text-blue-600 font-semibold">
                      {formatDuration(
                        intervalToDuration({
                          end: event.start_time,
                          start: timeNow,
                        }),
                        {
                          delimiter: " ",
                          format: ["hours", "minutes", "seconds"],
                        }
                      )}
                    </td>
                  ) : (
                    <td className="text-red-600 font-semibold">
                      {formatDuration(
                        intervalToDuration({
                          end: event.end_time,
                          start: timeNow,
                        }),
                        {
                          delimiter: " ",
                          format: ["hours", "minutes", "seconds"],
                        }
                      )}
                    </td>
                  )}
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
            empty={pastEvents?.length === 0}
          >
            {pastEvents?.map((event: NEvent, index: number) => {
              return (
                <tr key={index}>
                  <td>
                    {format(event.start_time, "dd-MM-yyyy (EEE) HH:mm a")}
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
                    {formatDuration(
                      intervalToDuration({
                        end: event.end_time,
                        start: event.start_time,
                      }),
                      {
                        delimiter: " ",
                        format: ["hours", "minutes"],
                      }
                    )}
                  </td>
                  <td>{event.participants}</td>
                </tr>
              );
            })}
          </Table>
        </div>
      </div>
      <div className="right flex flex-col w-[20%]"></div>
    </div>
  );
}

export default EventsViewer;
