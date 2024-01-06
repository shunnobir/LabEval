"use client";

import React, { useEffect, useState } from "react";
import { HomeIcon, LabEvalIcon, LabEvalLogo, LoginIcon } from "@/icons";
import Link from "next/link";
import { useRouter, useSelectedLayoutSegments } from "next/navigation";
import Button from "./Button";

type NavLink = {
  name: string;
  link: string;
};

export default function Navbar() {
  const navLinks: NavLink[] = [
    { name: "Posts", link: "" },
    { name: "Events", link: "events" },
    { name: "Problems", link: "problems" },
  ];
  const [active, setActive] = useState(-1);
  const [isLoggedIn, setIsloggedIn] = useState(false);
  const segments = useSelectedLayoutSegments();
  const router = useRouter();

  useEffect(() => {
    if (sessionStorage.getItem("user")) setIsloggedIn(true);
    if (
      segments.length === 0 ||
      segments[0] === "__DEFAULT__" ||
      segments[0] === ""
    ) {
      setActive(0);
    } else if (segments[0] === "events") {
      setActive(1);
    } else if (segments[0] === "problems") {
      setActive(2);
    } else {
      setActive(-1);
    }
  }, [segments]);
  return (
    <nav className="navbar flex flex-col mb-4">
      <div className="navbar-top flex gap-4 justify-between items-center ">
        <Link href="/" className="hidden lg:block">
          <LabEvalLogo className="fill-current" width="160" />
        </Link>
        <Link href="/" className="lg:hidden">
          <LabEvalIcon width="50" />
        </Link>
        <div className="navbar-mid w-3/4 lg:w-1/2 rounded-full flex items-center justify-between border border-solid border-zinc-700">
          {navLinks.map((link: NavLink, index: number) => {
            return (
              <Link href={`/${link.link}`} key={index}>
                <div
                  className={
                    "h-8 px-4 rounded-full flex items-center justify-center hover:bg-zinc-700/30 " +
                    (active === index ? "bg-zinc-700/50" : "")
                  }
                >
                  <span>{link.name}</span>
                </div>
              </Link>
            );
          })}
        </div>
        {segments.length === 0 ||
        (segments.length > 0 && segments[0] !== "auth") ? (
          <>
            <div className="navbar-right hidden lg:flex items-center">
              {isLoggedIn ? (
                "User Profile"
              ) : (
                <Button
                  title="Login"
                  onClick={() => router.push("/auth?auth=login")}
                  className="rounded-md"
                >
                  Login
                </Button>
              )}
            </div>
            <div className="navbar-right flex lg:hidden items-center">
              {isLoggedIn ? (
                "P"
              ) : (
                <Button
                  title="Login"
                  icon={<LoginIcon width="20" height="20" />}
                  onClick={() => router.push("/auth?auth=login")}
                  className="px-2 py-2 rounded-full bg-transparent bg-gradient-to-tr from-zinc-800 to-zinc-800 border border-solid border-zinc-700 shadow-none"
                />
              )}
            </div>
          </>
        ) : (
          <div></div>
        )}
      </div>
      <div className="navbar-bottom breadcrum flex flex-row flex-wrap gap-2 items-center">
        <Link
          href="/"
          className="rounded-full px-2 py-1 bg-zinc-700/50 hover:bg-zinc-700/80"
        >
          <HomeIcon
            className="fill-zinc-500 hover:fill-blue-500"
            width="18"
            height="18"
          />
        </Link>
        <span className="text-zinc-600 text-sm">{"\u276D"}</span>
        {segments.map((segment: string, index: number) => {
          return (
            <Link
              key={index}
              href={"/" + segments.slice(0, index + 1).join("/")}
              className="text-zinc-500 flex gap-2 items-center"
            >
              <span
                className={
                  "text-sm hover:bg-zinc-700/80 hover:text-zinc-300 hover:underline bg-zinc-700/50 rounded-full px-4 py-1 " +
                  (index === segments.length - 1
                    ? "bg-zinc-700/80 font-bold text-zinc-300"
                    : "text-zinc-400")
                }
              >
                {segment}
              </span>
              {index < segments.length - 1 ? (
                <span className="text-zinc-600 text-sm">{"\u276D"}</span>
              ) : null}
            </Link>
          );
        })}
        {segments.length === 0 ? (
          <Link
            href={"/"}
            className="text-sm bg-zinc-700/80 font-bold text-zinc-300 hover:underline px-4 py-1 rounded-full"
          >
            posts
          </Link>
        ) : null}
      </div>
    </nav>
  );
}
