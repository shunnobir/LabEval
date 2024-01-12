"use client";

import React, { useEffect, useState } from "react";
import MdEditor from "@/markdown/MdEditor";
import { EventCreateYes, InfoIcon } from "@/icons";
import { User } from "../../../../types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import getUser from "@/app/lib/getUser";
import Input from "@/components/Input";
import { Switch } from "@/components/ui/switch";
import Button from "@/components/Button";
import { toast } from "sonner";
import Popover from "@/components/Popover";
import Separator from "@/components/Separator";
import Loader from "@/components/Loader";

type CreateEventProps = {
  user?: User;
};

function CreateEvent() {
  const [user, setUser] = useState<User>();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [isopen, setIsOpen] = useState(false);
  const [creatorControlled, setCreatorControlled] = useState(false);
  const [creationPending, setCreationPending] = useState(false);
  const router = useRouter();

  const handleCreate = async () => {
    if (
      title.length === 0 ||
      description.length === 0 ||
      startTime.length === 0 ||
      endTime.length === 0
    ) {
      toast.error("required fields can not be empty");
      return;
    }
    setCreationPending(true);
    const res = await fetch("/api/events/create", {
      method: "POST",
      body: JSON.stringify({
        title,
        description,
        start_time: new Date(startTime),
        end_time: new Date(endTime),
        isopen,
        creator_controlled: creatorControlled,
        user_id: user?.user_id,
        create_date: new Date(),
      }),
      cache: "no-store",
    });
    const data = await res.json();
    if (!data.ok) toast.error(data.status);
    else {
      toast.success(data.status);
      router.push("/events");
    }
    setCreationPending(false);
  };

  useEffect(() => {
    getUser().then((res) => {
      if (!res.ok) {
        return;
      }
      setUser(res.user);
    });
  }, [pathName, searchParams]);

  return (
    <div className="flex flex-col min-h-fit gap-4 pb-6 md:mx-[5%]">
      <div className="flex flex-col gap-2">
        <h1 className="font-bold">New Event</h1>
        <span className="text-zinc-500">
          Create your events with your preffered settings
        </span>
        <Separator className="my-4" />
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="font-semibold">
            Event Title<span className="text-red-500">{" *"}</span>
          </label>
          <Input
            className="rounded-md bg-transparent"
            placeholder="event title"
            maxLength={80}
            showLimit={true}
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-semibold">
            Event Description<span className="text-red-500">{" *"}</span>
          </label>
          <MdEditor value={description} onChange={setDescription} />
        </div>
        <div className="flex flex-col lg:flex-row flex-1 gap-10">
          <div className="flex flex-col flex-1 gap-2">
            <label className="font-semibold">
              Start Time<span className="text-red-500">{" *"}</span>
            </label>
            <Input
              type="datetime-local"
              className="rounded-md"
              value={startTime}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setStartTime(e.target.value)
              }
            />
          </div>
          <div className="flex flex-col flex-1 gap-2">
            <label className="font-semibold">
              End Time<span className="text-red-500">{" *"}</span>
            </label>
            <Input
              type="datetime-local"
              className="rounded-md"
              value={endTime}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEndTime(e.target.value)
              }
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row flex-1 gap-10">
          <div className="flex gap-2 items-center">
            <Switch
              checked={isopen}
              onCheckedChange={(e: any) => setIsOpen(e)}
            />
            <label className="font-semibold">Public Event</label>
            <Popover
              content={
                <InfoIcon width="20" height="20" className="fill-zinc-300" />
              }
              tip={
                <span>
                  Do you want to make the event accessible to everyone?
                </span>
              }
            />
          </div>
          <div className="flex gap-2 items-center">
            <Switch
              checked={creatorControlled}
              onCheckedChange={(e: any) => setCreatorControlled(e)}
            />
            <label className="font-semibold">Manual Evaluation</label>
            <Popover
              content={
                <InfoIcon width="20" height="20" className="fill-zinc-300" />
              }
              tip={<span>Do you want to evaluate submissions manually?</span>}
            />
          </div>
        </div>
        <Button
          icon={
            !creationPending ? <EventCreateYes width="24" height="24" /> : null
          }
          className="w-fit gap-2 py-2 rounded-md mt-4"
          onClick={handleCreate}
        >
          {creationPending ? <Loader /> : "Create"}
        </Button>
      </div>
    </div>
  );
}

export default CreateEvent;
