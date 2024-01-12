"use client";

import React, { useEffect, useState } from "react";
import { Event } from "../../types";
import Link from "next/link";
import Separator from "./Separator";
import { formatDuration, intervalToDuration } from "date-fns";

type EventTimerProps = {
  event?: Event;
};

export default function EventTimer({ event }: EventTimerProps) {
  const [timeNow, setTimeNow] = useState<Date>();

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setTimeNow(new Date());
    }, 1000);
  }, [timeNow]);

  useEffect(() => {
    setTimeNow(new Date());
  }, []);

  return (
    <div className="w-full border border-solid border-zinc-800 rounded-md">
      <div className="p-4 text-center text-sm hover:text-blue-600 hover:underline">
        <Link href={`/events/${event?.event_id}`}>{event?.title}</Link>
      </div>
      <Separator className="my-0" />
      <div className="text-center p-2">
        {event && timeNow && event?.start_time > timeNow ? (
          <span className="text-blue-600">Time to start</span>
        ) : (
          <span className="text-red-600">Time remaining</span>
        )}
      </div>
      <Separator className="my-0" />
      <div className="text-center p-2 text-sm">
        {event && timeNow && event?.end_time > timeNow
          ? formatDuration(
              intervalToDuration({
                end: event.start_time || new Date(),
                start: timeNow,
              }),
              {
                delimiter: " ",
                format: ["days", "hours", "minutes", "seconds"],
              }
            )
          : "Event Finished"}
      </div>
    </div>
  );
}
