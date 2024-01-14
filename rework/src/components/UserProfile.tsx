"use client";

import React, { useEffect, useRef } from "react";
import { User } from "../../types";
import Image from "next/image";
import Link from "next/link";
import { DeleteIcon, LogoutIcon, PersonIcon, SettingsIcon } from "@/icons";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import Separator from "./Separator";

type UserProfileProps = {
  user?: User;
  show: (v: boolean) => void;
};

function UserProfile({ user, show }: UserProfileProps) {
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathName = usePathname();

  const handleLogout = () => {
    const res = fetch("/api/auth?auth=logout", {
      method: "POST",
      cache: "no-store",
    });
    toast.promise(res, {
      loading: "logging out",
      success: (data) => {
        localStorage.removeItem("isLoggedIn");
        location.reload();
        return "logged out";
      },
      error: (data) => {
        return `${JSON.stringify(data)}`;
      },
    });
    show(false);
  };

  useEffect(() => {
    const handleShowProfilePopup = (e: MouseEvent) => {
      if (!ref?.current?.contains(e.target as HTMLDivElement)) show(false);
    };

    document.addEventListener("mousedown", handleShowProfilePopup);
    return () =>
      document.removeEventListener("mousedown", handleShowProfilePopup);
  }, [ref, show]);

  return (
    <div
      className="user-profile flex flex-col absolute right-0 border border-solid border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-950 px-2 py-4 text-sm sm:text-[1rem] rounded-md z-10 text-slate-700 dark:text-slate-300 after:border-[12px] after:border-solid after:border-b-slate-800 after:border-t-transparent after:border-l-transparent after:border-r-transparent after:w-[24px] after:h-[24px] after:absolute after:right-2 after:top-[-24px] after:z-[10] "
      ref={ref}
      style={{
        width: "15rem",
        boxShadow: "0 0 0.5rem rgba(0, 0, 0, 0.3)",
      }}
    >
      <div className="top flex gap-4 items-center px-2">
        <Image
          src={`/avatar${(user?.avatar || 0) + 1}.png`}
          alt={`${user?.username || "avatar"}`}
          width={32}
          height={32}
        />
        <div className="flex flex-col">
          <span>{user?.username}</span>
          <span className="text-sm text-slate-400 hover:text-sky-500 hover:underline">
            <Link href={`mailto:${user?.email}`}>{user?.email}</Link>
          </span>
        </div>
      </div>
      <Separator className="my-4" />
      {/* <hr /> */}
      <div className="mid flex flex-col flex-1">
        <span className="text-sm hover:bg-slate-200 hover:dark:bg-slate-700 flex-1 cursor-pointer px-2 py-2 rounded-md flex gap-2">
          <PersonIcon width="20" height="20" className="fill-slate-300" />
          Profile
        </span>
        <span className="text-sm hover:bg-slate-200 hover:dark:bg-slate-700 flex-1 cursor-pointer px-2 py-2 rounded-md flex gap-2">
          <DeleteIcon width="20" height="20" className="fill-slate-300" />
          Delete Account
        </span>
      </div>
      <Separator className="my-4" />
      {/* <hr /> */}
      <div className="bottom flex flex-col">
        <span className="text-sm px-2 py-2 hover:bg-slate-200 hover:dark:bg-slate-700 cursor-pointer rounded-md flex gap-2">
          <SettingsIcon width="20" height="20" className="fill-slate-300" />
          Settings
        </span>
        <button
          className="text-sm px-2 py-2 hover:bg-slate-200 hover:dark:bg-slate-700 cursor-pointer rounded-md flex gap-2"
          onClick={handleLogout}
        >
          <LogoutIcon width="20" height="20" className="fill-slate-300" />
          Logout
        </button>
      </div>
    </div>
  );
}

export default UserProfile;
