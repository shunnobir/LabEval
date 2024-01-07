"use client";

import React, { useEffect, useState } from "react";
import Table from "@/components/Table";
import { format, formatDistanceStrict } from "date-fns";
import Link from "next/link";
import { Event, User } from "../../types";
import getUser from "@/app/lib/getUser";
import Button from "./Button";
import { EventsCreateIcon } from "@/icons";
import CreateEvent from "./CreateEvent";
import EventsViewer from "./EventsViewer";

type EventsProps = {
  events: any;
};

export default function Events({ events }: EventsProps) {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    getUser().then((res) => {
      if (!res.ok) {
        return;
      }
      setUser(res.user);
    });
  }, []);

  return <EventsViewer user={user} events={events} />;
}
