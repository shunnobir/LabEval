"use client";

import React, { useState } from "react";
import { User } from "../../types";
import Input from "./Input";
import MdEditor from "@/markdown/MdEditor";
import { InfoIcon } from "@/icons";

type CreateEventProps = {
  user?: User;
};

function CreateEvent({ user }: CreateEventProps) {
  const [description, setDescription] = useState("");
  return (
    <div className="flex flex-col sm:px-[10%] md:px-[15%] lg:px-[20%] gap-4">
      {/* <h1 className="text-center w-full">New Event</h1> */}
      <div className="flex flex-col">
        <label>
          Event Title<span className="text-red-500">{" *"}</span>
        </label>
        <Input className="rounded-md bg-transparent" />
      </div>
      <div className="flex flex-col">
        <label>
          Event Description<span className="text-red-500">{" *"}</span>
        </label>
        <MdEditor value={description} onChange={setDescription} />
      </div>
      <div className="flex flex-1 gap-10">
        <div className="flex flex-col flex-1">
          <label>
            Start Time<span className="text-red-500">{" *"}</span>
          </label>
          <Input type="datetime-local" className="rounded-md" />
        </div>
        <div className="flex flex-col flex-1">
          <label>
            End Time<span className="text-red-500">{" *"}</span>
          </label>
          <Input type="datetime-local" className="rounded-md" />
        </div>
      </div>
      <div className="flex flex-1 gap-10">
        <div className="flex gap-2 items-center">
          <Input type="checkbox" className="rounded-md" />
          <label>Public Event</label>
          <div
            className="p-1 cursor-pointer bg-slate-800/30 hover:bg-slate-800/80 rounded-full"
            title="Do you want to make the event accessible to everyone?"
          >
            <InfoIcon width="20" height="20" className="fill-slate-300" />
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <Input type="checkbox" className="rounded-md" />
          <label>Manual Evaluation</label>
          <div
            className="p-1 cursor-pointer bg-slate-800/30 hover:bg-slate-800/80 rounded-full"
            title="Do you want to evaluate submissions manually?"
          >
            <InfoIcon width="20" height="20" className="fill-slate-300" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateEvent;
