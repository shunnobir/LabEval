"use client";

import getUser from "@/app/lib/getUser";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Loader from "@/components/Loader";
import Separator from "@/components/Separator";
import { Switch } from "@/components/ui/switch";
import { AddIcon, ShowIcon } from "@/icons";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Event, User } from "../../../../../../../../types";
import UnauthorizedAccess from "@/components/UnauthorizedAccess";
import Loading from "@/components/Loading";
import Page404 from "@/components/404";

export default function AddTestcase({
  params,
}: {
  params: { event_id: string; order: string };
}) {
  const [loading, setLoading] = useState(0);
  const [user, setUser] = useState<User>();
  const [event, setEvent] = useState<Event>();
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isSample, setIsSample] = useState(false);
  const [pending, setPending] = useState(false);
  const router = useRouter();

  const handleAddTestcase = async () => {
    if (
      (input.length === 0 && output.length > 0) ||
      (input.length > 0 && output.length === 0) ||
      (input.length === 0 && output.length === 0)
    ) {
      toast.error("both fields have to be filled to add a testcase");
      return;
    }

    setPending(true);
    const time = new Date().getTime();
    const res = await (
      await fetch(`/api/testcase`, {
        method: "POST",
        body: JSON.stringify({
          input_file: isSample ? `sample_${time}.in` : `hidden_${time}.in`,
          output_file: isSample ? `sample_${time}.out` : `hidden_${time}.out`,
          input_content: input,
          output_content: output,
          input_size: input.length,
          output_size: output.length,
          is_sample: isSample,
          event_id: params.event_id,
          problem_order: params.order,
        }),
        cache: "no-store",
      })
    ).json();
    if (!res.ok) toast.error(res.status);
    else {
      toast.success(res.status);
      router.refresh();
    }
    setPending(false);
    setInput("");
    setOutput("");
    setIsSample(false);
  };

  useEffect(() => {
    getUser().then((res) => {
      if (res.ok) setUser(res.user);
      setLoading((prev) => prev + 1);
    });
    fetch(`/api/events?event_id=${params.event_id}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.ok) setEvent(res.event);
        setLoading((prev) => prev + 1);
      });
  }, [params.event_id]);

  if (loading === 0) {
    return <Loading />;
  }

  if (loading > 0 && !event) {
    return <Page404 />;
  }

  if (
    loading > 1 &&
    event &&
    (!user || (user && user.user_id !== event.user_id))
  ) {
    return <UnauthorizedAccess />;
  }

  return user && event && user.user_id === event.user_id ? (
    <div className="add-testcase flex flex-col md:mx-[5%] gap-4 pb-8">
      <div className="flex flex-col gap-2">
        <h1 className="font-bold">Add Testcases</h1>
        <span className="text-slate-500">
          Write testcase inputs and outputs in the given boxes and add them.
        </span>
        <Separator className="my-4" />
      </div>
      <Button
        icon={<ShowIcon width="20" height="20" />}
        className="py-2 gap-2 w-fit ml-auto"
        onClick={() =>
          router.push(
            `/events/${params.event_id}/problems/${params.order}/testcases`
          )
        }
      >
        Show Testcases
      </Button>
      <div className="input-box flex flex-col gap-2">
        <label className="font-semibold">Testcase Input</label>
        <textarea
          className="resize-none bg-transparent border border-solid border-slate-300 dark:border-slate-800 rounded-md h-60 p-2"
          placeholder="write here"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
      <div className="input-box flex flex-col gap-2">
        <label className="font-semibold">Testcase Output</label>
        <textarea
          className="resize-none bg-transparent border border-solid border-slate-300 dark:border-slate-800 rounded-md h-60 p-2"
          placeholder="write here"
          value={output}
          onChange={(e) => setOutput(e.target.value)}
        />
      </div>
      <div className="input-box flex gap-2">
        <Switch
          checked={isSample}
          onCheckedChange={(checked) => setIsSample(checked)}
        />
        <label className="font-semibold">Add as sample testcase</label>
      </div>
      {pending ? (
        <Button className="w-fit px-2 py-2">
          <Loader className="border-slate-50" />
        </Button>
      ) : (
        <Button
          icon={<AddIcon width="24" height="24" />}
          className="w-fit py-2 gap-2"
          disabled={pending}
          onClick={handleAddTestcase}
        >
          Add testcase
        </Button>
      )}
    </div>
  ) : (
    <UnauthorizedAccess />
  );
}
