"use client";

import ProblemForm from "@/components/ProblemForm";
import Separator from "@/components/Separator";
import React, { useEffect, useState } from "react";
import { Event, User } from "../../../../../types";
import getUser from "@/app/lib/getUser";
import UnauthorizedAccess from "@/components/UnauthorizedAccess";
import Loading from "@/components/Loading";
import Page404 from "@/components/404";

export default function AddProblem({
  params,
}: {
  params: { event_id: string };
}) {
  const [loading, setLoading] = useState(0);
  const [user, setUser] = useState<User>();
  const [event, setEvent] = useState<Event>();

  useEffect(() => {
    getUser().then((res) => {
      if (res.ok) setUser(res.user);
      setLoading((prev) => prev + 1);
    });
    fetch(`/api/events?event_id=${params.event_id}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.ok) setEvent(res.event);
        setLoading((prev) => prev + 1);
      });
  }, [params.event_id]);

  if (loading === 0) {
    return <Loading />;
  }

  if (loading > 0 && !event) {
    return <Page404 />;
  }

  if (loading > 0 && event && !user) {
    return <UnauthorizedAccess />;
  }

  return user && event && user.user_id === event.user_id ? (
    <div className="add-problem flex flex-col gap-4 md:mx-[5%]">
      <div className="flex flex-col gap-2">
        <h1 className="font-bold">New Problem</h1>
        <span className="text-slate-500">
          Create new problems in markdown and add testcases.
        </span>
        <Separator className="my-4" />
      </div>
      <ProblemForm event_id={params.event_id} />
    </div>
  ) : (
    <UnauthorizedAccess />
  );
}
