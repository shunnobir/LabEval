"use client";

import React, { useState } from "react";
import Input from "./Input";
import MdEditor from "@/markdown/MdEditor";
import Select from "./Select";
import Button from "./Button";
import { ProblemCreateYesIcon } from "@/icons";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import Loader from "./Loader";

export default function ProblemForm({ event_id }: { event_id: string }) {
  const problemOrders = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];

  const [problemOrder, setProblemOrder] = useState(0);
  const [title, setTitle] = useState("");
  const [points, setPoints] = useState("");
  const [timeLimit, setTimeLimit] = useState("");
  const [memoryLimit, setMemoryLimit] = useState("");
  const [statement, setStatement] = useState("");
  const [addPending, setAddPending] = useState(false);
  const pathName = usePathname();
  const router = useRouter();

  const handleAdd = async () => {
    if (
      title.length === 0 ||
      statement.length === 0 ||
      points.length === 0 ||
      timeLimit.length === 0 ||
      memoryLimit.length === 0
    ) {
      toast.error("required fileds can not be empty");
      return;
    }
    setAddPending(true);
    const body = {
      title,
      statement,
      points,
      time_limit: timeLimit,
      memory_limit: memoryLimit,
      problem_order: String.fromCharCode(problemOrder + 65),
      event_id,
    };
    const res = await (
      await fetch(`/api${pathName}`, {
        method: "POST",
        body: JSON.stringify(body),
      })
    ).json();

    if (!res.ok) toast.error(res.status);
    else {
      toast.success(res.status);
      router.push(`/events/${event_id}/problems`);
    }
    setAddPending(false);
  };

  return (
    <div className="problem-form flex flex-col gap-8 pb-12">
      <div className="flex gap-4 w-full items-end">
        <div className="flex flex-col gap-2 w-[15%]">
          <label className="font-semibold">
            Problem Order<span className="text-red-600">{" *"}</span>
          </label>
          <Select
            options={problemOrders}
            setSelected={setProblemOrder}
            className="rounded-md"
          />
        </div>
        <div className="flex flex-col gap-2 w-[85%]">
          <label className="font-semibold">
            Problem Title<span className="text-red-600">{" *"}</span>
          </label>
          <Input
            className="rounded-md w-full"
            placeholder="problem title"
            maxLength={65}
            showLimit={true}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
      </div>
      <div className="flex gap-4 items-end">
        <div className="flex flex-col gap-2 w-full">
          <label className="font-semibold">
            Points<span className="text-red-600">{" *"}</span>
          </label>
          <Input
            type="text"
            className="rounded-md w-full"
            placeholder="points (e.g. 100)"
            value={points}
            onChange={(e) => setPoints(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label className="font-semibold">
            Time Limit (seconds)<span className="text-red-600">{" *"}</span>
          </label>
          <Input
            type="text"
            className="rounded-md w-full"
            placeholder="time limit (e.g. 2)"
            value={timeLimit}
            onChange={(e) => setTimeLimit(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label className="font-semibold">
            Memory Limit (megabytes)
            <span className="text-red-600">{" *"}</span>
          </label>
          <Input
            type="text"
            className="rounded-md w-full"
            placeholder="memory limit (e.g. 256)"
            value={memoryLimit}
            onChange={(e) => setMemoryLimit(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label className="font-semibold">
          Problem Statements<span className="text-red-600">{" *"}</span>
        </label>
        <MdEditor height="30rem" value={statement} onChange={setStatement} />
      </div>
      {!addPending ? (
        <Button
          icon={<ProblemCreateYesIcon width="24" height="24" />}
          className="w-fit gap-2 rounded-md px-4 py-2"
          onClick={() => handleAdd()}
        >
          Add
        </Button>
      ) : (
        <Button className="w-fit gap-2 rounded-md px-4 py-2">
          <Loader className="border-slate-50" />
        </Button>
      )}
    </div>
  );
}
