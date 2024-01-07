"use client";

import MarkdownViewer from "@/components/MarkdownViewer";
import { formatDistance } from "date-fns";
import Link from "next/link";
import { PostsIcon, UnfilledPostsIcon } from "@/icons";
import postgres from "postgres";
import { useEffect, useState } from "react";
import { User } from "../../types";
import getUser from "@/app/lib/getUser";

type PostsProps = {
  events: postgres.RowList<postgres.Row[]> | never[];
  ok: boolean | never;
};

export default function Posts({ events, ok }: PostsProps) {
  const [active, setActive] = useState(0);
  const [user, setUser] = useState<User>();
  const [isLoggedIn, setIsloggedIn] = useState(false);

  useEffect(() => {
    getUser().then((res) => {
      if (!res.ok) {
        setIsloggedIn(false);
        return;
      }
      setUser(res.user);
      setIsloggedIn(true);
    });
  }, []);

  if (!ok) {
    return <main>error</main>;
  }

  return (
    <main className="flex flex-1 gap-10 pb-4">
      <div className="left flex flex-col flex-1 gap-2 rounded-md items-end">
        <button
          className={
            (active === 0 ? "bg-zinc-800/80" : "") +
            " flex flex-col sm:flex-row gap-2 px-4 py-2 hover:bg-zinc-800/80 rounded-md items-center justify-center"
          }
          onClick={(_) => {
            setActive(0);
          }}
        >
          <PostsIcon className="fill-zinc-300" />
          All Posts
        </button>
        {isLoggedIn ? (
          <button
            className={
              (active === 1 ? "bg-zinc-800/80" : "") +
              " flex flex-col sm:flex-row gap-2 px-4 py-2 w-full sm:w-fit hover:bg-zinc-800/80 rounded-md items-center justify-center"
            }
            onClick={(_) => {
              setActive(1);
            }}
          >
            <UnfilledPostsIcon className="fill-zinc-300" />
            <span>My Posts</span>
          </button>
        ) : null}
      </div>
      <div className="right flex flex-col gap-10 flex-[5] sm:flex-[4]">
        {events.map((event, index) => {
          return (
            <div
              key={index}
              className="event flex flex-col justify-center border border-solid border-zinc-800 rounded-md"
            >
              <div className="top flex items-center bg-zinc-800 p-3 rounded-t-md">
                <Link
                  href={`/events/${event.event_id}`}
                  className="hover:text-blue-500 hover:underline"
                >
                  {event.title}
                </Link>
              </div>
              <div className="description p-3">
                <MarkdownViewer str={event.description} />
              </div>
              <div className="tail border-t border-solid border-zinc-800 p-3">
                Posted:{" "}
                {formatDistance(new Date(event.create_date), new Date(), {
                  addSuffix: true,
                })}
              </div>
            </div>
          );
        })}
        {events.length === 0 ? (
          <div className="flex flex-1 items-center justify-center text-zinc-600">
            No posts yet
          </div>
        ) : null}
      </div>
    </main>
  );
}
