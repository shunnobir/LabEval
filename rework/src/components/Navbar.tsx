"use client";

import React, { useEffect, useState } from "react";
import {
  BackButton,
  HomeIcon,
  LabEvalIcon,
  LabEvalLogo,
  LoginIcon,
} from "@/icons";
import Link from "next/link";
import {
  usePathname,
  useRouter,
  useSearchParams,
  useSelectedLayoutSegments,
} from "next/navigation";
import Button from "./Button";
import getUser from "@/app/lib/getUser";
import { User } from "../../types";
import Image from "next/image";
import UserProfile from "./UserProfile";

type NavLink = {
  name: string;
  link: string;
  userRequired: boolean;
};

interface IThemeIcon {
  [id: string]: string;
}

export default function Navbar({
  theme,
  setTheme,
}: {
  theme: any;
  setTheme: any;
}) {
  const navLinks: NavLink[] = [
    { name: "Posts", link: "", userRequired: false },
    { name: "Events", link: "events", userRequired: false },
    { name: "Problemset", link: "problemset", userRequired: false },
    { name: "Submissions", link: "submissions", userRequired: true },
  ];

  const [isLoggedIn, setIsloggedIn] = useState(false);
  const [user, setUser] = useState<User>();
  const [showUserProfile, setShowUserProfile] = useState(false);
  const segments = useSelectedLayoutSegments();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const themeIcons: IThemeIcon = {
    light: "🌛",
    dark: "☀️",
  };

  useEffect(() => {
    getUser().then((res) => {
      if (!res.ok) {
        setIsloggedIn(false);
        return;
      }
      setUser(res.user);
      setIsloggedIn(true);
    });
  }, [pathName, searchParams]);

  return (
    <nav className="navbar flex flex-col mb-4 gap-4">
      <div className="navbar-top flex gap-4 items-center ">
        <Link href="/" className="hidden lg:block">
          <LabEvalLogo
            width="160"
            color={theme === "light" ? "#09090b" : "#fafafa"}
          />
        </Link>
        <Link href="/" className="lg:hidden">
          <LabEvalIcon width="50" />
        </Link>
        <div className="navbar-mid ml-auto rounded-full flex gap-4 items-center">
          {navLinks.map((link: NavLink, index: number) => {
            return !link.userRequired || (user && link.userRequired) ? (
              <Link href={`/${link.link}`} key={index}>
                <div
                  className={
                    "py-1 px-4 rounded-full flex items-center justify-center hover:bg-slate-200 hover:text-slate-700 hover:dark:bg-slate-800/80 hover:dark:text-slate-300 duration-300 " +
                    ((segments.length === 0 && index == 0) ||
                    segments[0] === link.link
                      ? "bg-slate-200 dark:bg-slate-800/80 dark:text-slate-300"
                      : "text-slate-500")
                  }
                >
                  <span>{link.name}</span>
                </div>
              </Link>
            ) : null;
          })}
          <button
            className="ml-auto dark:bg-slate-800 bg-slate-600 w-10 h-10 rounded-full"
            title="click to change theme"
            onClick={() =>
              setTheme((prev: any) => (prev === "light" ? "dark" : "light"))
            }
          >
            {themeIcons[theme as string]}
          </button>
        </div>
        {segments.length === 0 ||
        (segments.length > 0 && segments[0] !== "auth") ? (
          <div className="navbar-right relative">
            <div className="hidden sm:flex items-center cursor-pointer rounded-full">
              {isLoggedIn ? (
                <button
                  onClick={(e: React.SyntheticEvent) => {
                    e.preventDefault();
                    setShowUserProfile((prev) => !prev);
                  }}
                >
                  <Image
                    src={`/avatar1.png`}
                    width={34}
                    height={34}
                    alt={user?.username || ""}
                  />
                </button>
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
            <div className="flex sm:hidden items-center cursor-pointer rounded-full">
              {isLoggedIn ? (
                <button
                  onClick={(e: React.SyntheticEvent) => {
                    e.preventDefault();
                    setShowUserProfile((prev) => !prev);
                  }}
                >
                  <Image
                    src={`/avatar1.png`}
                    width={30}
                    height={30}
                    alt={user?.username || ""}
                  />
                </button>
              ) : (
                <Button
                  title="Login"
                  icon={<LoginIcon width="20" height="20" />}
                  onClick={() => router.push("/auth?auth=login")}
                />
              )}
            </div>
            {showUserProfile ? (
              <UserProfile
                user={user}
                show={(v: boolean) => setShowUserProfile(v)}
              />
            ) : null}
          </div>
        ) : (
          <div></div>
        )}
      </div>
      <div className="navbar-bottom breadcrum flex flex-row flex-wrap gap-2 items-center">
        <Button
          className="w-8 h-8"
          style={{ borderRadius: 999 }}
          icon={<BackButton width="20" height="20" />}
          title="go back"
          onClick={() => router.back()}
        ></Button>
        <Button
          className="w-8 h-8 rotate-180"
          style={{ borderRadius: 999 }}
          icon={<BackButton width="20" height="20" />}
          title="go forward"
          onClick={() => router.forward()}
        ></Button>
        <Link
          href="/"
          className="rounded-full px-2 py-1 hover:bg-slate-200 dark:hover:bg-slate-800/80"
        >
          <HomeIcon
            className=" fill-slate-400 dark:fill-slate-500 hover:fill-slate-500 dark:hover:fill-slate-300"
            width="18"
            height="18"
          />
        </Link>
        <span className="text-slate-300 dark:text-slate-600 text-sm">
          {"\u276D"}
        </span>
        {segments.map((segment: string, index: number) => {
          return (
            <Link
              key={index}
              href={"/" + segments.slice(0, index + 1).join("/")}
              className="flex gap-2 items-center"
            >
              <span
                className={
                  "text-sm hover:bg-slate-200 dark:hover:bg-slate-800/80 hover:text-slate-800 dark:hover:text-slate-300 hover:underline bg-slate-200 dark:bg-slate-800/50 rounded-full px-4 py-1 " +
                  (index === segments.length - 1
                    ? "bg-slate-200 dark:bg-slate-800/80 text-slate-800 dark:text-slate-300"
                    : "text-slate-400")
                }
              >
                {segment}
              </span>
              {index < segments.length - 1 ? (
                <span className="text-slate-300 dark:text-slate-600 text-sm">
                  {"\u276D"}
                </span>
              ) : null}
            </Link>
          );
        })}
        {segments.length === 0 ? (
          <Link
            href={"/"}
            className="text-sm bg-slate-200 dark:bg-slate-800/80 text-slate-800 dark:text-slate-300 hover:underline px-4 py-1 rounded-full"
          >
            posts
          </Link>
        ) : null}
      </div>
    </nav>
  );
}
