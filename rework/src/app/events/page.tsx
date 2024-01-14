import React from "react";
import { getEvents } from "../lib/getEvents";
import Table from "@/components/Table";
import { format, formatDistanceStrict } from "date-fns";
import Link from "next/link";
import Events from "@/components/Events";
import InternalError from "@/components/InternalError";

export default async function EventsWrapper() {
  const { events, ok, status } = await getEvents();

  if (!ok) {
    return <InternalError status={status} />;
  }

  return <Events events={events} />;
}
