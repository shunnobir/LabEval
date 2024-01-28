"use client";

import { HashIcon, UnfilledPostsIcon } from "@/icons";
import LButton from "./LButton";
import { usePathname, useRouter } from "next/navigation";
import { Event } from "../../types";

export default function EventQuickLinks({ event }: { event?: Event }) {
  const pathName = `/events/${event?.event_id}`;
  const router = useRouter();
  return (
    <div className="button-group flex flex-col border border-solid border-slate-300 dark:border-slate-800 rounded-md">
      <span className="text-center p-4 bg-slate-800 text-slate-100 rounded-t-md">
        Quick Links
      </span>
      <div className="flex flex-col p-4">
        <LButton
          variant="option"
          icon={<HashIcon width="20" height="20" />}
          onClick={() => router.push(pathName + "/problems")}
        >
          Problems
        </LButton>
        <LButton
          variant="option"
          icon={<HashIcon width="20" height="20" />}
          onClick={() => router.push(pathName + "/submissions")}
        >
          Submissions
        </LButton>
        <LButton
          variant="option"
          icon={<HashIcon width="20" height="20" />}
          onClick={() => router.push(pathName + "/standings")}
        >
          Standings
        </LButton>
      </div>
    </div>
  );
}
