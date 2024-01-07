"use client";

import React, { useEffect, useRef } from "react";
import { User } from "../../types";
import Image from "next/image";
import Link from "next/link";
import { DeleteIcon, LogoutIcon, PersonIcon, SettingsIcon } from "@/icons";

type UserProfileProps = {
  user?: User;
  show: (v: boolean) => void;
};

function UserProfile({ user, show }: UserProfileProps) {
  const ref = useRef<HTMLDivElement>(null);
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
      className="user-profile flex flex-col absolute right-0 border border-solid border-zinc-700 bg-zinc-800/90 px-2 py-4 text-sm sm:text-[1rem] rounded-md z-10 text-zinc-100 after:border-[12px] after:border-solid after:border-b-zinc-800 after:border-t-transparent after:border-l-transparent after:border-r-transparent after:w-[24px] after:h-[24px] after:absolute after:right-2 after:top-[-24px] after:z-[10] "
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
          <span className="text-sm text-zinc-400 hover:text-blue-500 hover:underline">
            <Link href={`mailto:${user?.email}`}>{user?.email}</Link>
          </span>
        </div>
      </div>
      <hr />
      <div className="mid flex flex-col flex-1 gap-1">
        <span className="text-sm hover:bg-zinc-700/80 flex-1 cursor-pointer px-2 py-1 rounded-md flex gap-2">
          <PersonIcon width="20" height="20" className="fill-zinc-100" />
          Profile
        </span>
        <span className="text-sm hover:bg-zinc-700/80 flex-1 cursor-pointer px-2 py-1 rounded-md flex gap-2">
          <DeleteIcon width="20" height="20" className="fill-zinc-100" />
          Delete Account
        </span>
      </div>
      <hr />
      <div className="bottom flex flex-col gap-1">
        <span className="text-sm px-2 py-1 hover:bg-zinc-700/80 cursor-pointer rounded-md flex gap-2">
          <SettingsIcon width="20" height="20" className="fill-zinc-100" />
          Settings
        </span>
        <span className="text-sm px-2 py-1 hover:bg-zinc-700/80 cursor-pointer rounded-md flex gap-2">
          <LogoutIcon width="20" height="20" className="fill-zinc-100" />
          Logout
        </span>
      </div>
    </div>
  );
}

export default UserProfile;
