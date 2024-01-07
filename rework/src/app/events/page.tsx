import React from "react";
import { getEvents } from "../lib/getEvents";
import Table from "@/components/Table";
import { format, formatDistanceStrict } from "date-fns";
import Link from "next/link";
import Events from "@/components/Events";

export default async function EventsWrapper() {
  const { events, ok } = await getEvents();

  if (!ok) {
    return <div>Error</div>;
  }

  return (
    <div>
      <Events events={events} />
    </div>
  );
}
