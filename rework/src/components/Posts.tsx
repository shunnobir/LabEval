"use client";

import MarkdownViewer from "@/components/MarkdownViewer";
import { formatDistance } from "date-fns";
import Link from "next/link";
import { PostsIcon, UnfilledPostsIcon } from "@/icons";
import postgres from "postgres";
import { useEffect, useState } from "react";
import { User } from "../../types";
import getUser from "@/app/lib/getUser";
import Loading from "./Loading";
import InternalError from "./InternalError";

type PostsProps = {
  events: postgres.RowList<postgres.Row[]> | never[];
  ok: boolean | never;
  status: string;
};

export default function Posts({ events, ok, status }: PostsProps) {
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(0);
  const [user, setUser] = useState<User>();
  const [isLoggedIn, setIsloggedIn] = useState(false);

  useEffect(() => {
    getUser().then((res) => {
      if (res.ok) {
        setUser(res.user);
        setIsloggedIn(true);
      }
      setLoading(false);
    });
  }, []);

  if (!ok) {
    return <InternalError status={status} />;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <main className="flex flex-1 gap-4 md:gap-10 pb-4">
      <div className="left flex flex-col w-[20%] gap-2 rounded-md items-end">
        <button
          className={
            (active === 0
              ? "bg-slate-800 text-slate-100 dark:bg-slate-800/80"
              : "") +
            " flex flex-col sm:flex-row gap-2 px-4 py-2 rounded-md items-center justify-center"
          }
          onClick={(_) => {
            setActive(0);
          }}
        >
          <PostsIcon className="fill-slate-100 dark:fill-slate-300" />
          <span className="hidden md:inline-block">All Posts</span>
        </button>
        {isLoggedIn && user && user.role === "instructor" ? (
          <button
            className={
              (active === 1
                ? "bg-slate-800 text-slate-100 dark:bg-slate-800/80"
                : "") +
              " flex flex-col sm:flex-row gap-2 px-4 py-2 rounded-md items-center justify-center"
            }
            onClick={(_) => {
              setActive(1);
            }}
          >
            <UnfilledPostsIcon className="fill-slate-100 dark:fill-slate-300" />
            <span className="hidden md:inline-block">My Posts</span>
          </button>
        ) : null}
      </div>
      <div className="right flex flex-col gap-10 w-[80%]">
        {events
          .filter((event) => event.isopen)
          .map((event, index) => {
            return (
              <div
                key={index}
                className="event flex flex-col justify-center border border-solid border-slate-300 dark:border-slate-800 rounded-md"
              >
                <div className="top flex items-center bg-slate-800 text-slate-100 dark:bg-slate-800 p-3 rounded-t-md">
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
                <div className="tail border-t border-solid border-slate-300 dark:border-slate-800 p-3">
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
      </div>
    </main>
  );
}
