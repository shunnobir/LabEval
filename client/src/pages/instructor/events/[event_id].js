import Layout from "@/components/Layout";
import mdParser from "@/components/markdown/mdParser";
import Table from "@/components/Table";
import { BackButton, ClockIcon, ProblemCreateIcon } from "@/icons";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Event(props) {
  const [eventId, setEventId] = useState("");
  const [event, setEvent] = useState({
    event_id: "",
    title: "",
    description: "",
    start_time: "",
    end_time: "",
    created_by: "",
  });
  const [problemList, setProblemList] = useState([]);
  const router = useRouter();

  const getEvent = (id) => {
    axios
      .get(`/api/instructor/events/?type=info&event_id=${id}`)
      .then((res) => res.data[0])
      .then((res) => {
        if (res) setEvent(res);
      });
  };

  useEffect(() => {
    setEventId(router.query.event_id);
    getEvent(router.query.event_id);
  }, [router.query]);

  return eventId ? (
    <Layout page="events" {...props}>
      <div className="labeval-event flex flex-col gap-4 animate-opacity w-full">
        <div className="left flex flex-col gap-4 w-[75%]">
          <button
            className="w-8 h-8 bg-blue-500 flex flex-row items-center justify-center rounded-full cursor-pointer hover:shadow-[0_0_8px_rgba(0,0,0,0.15)] duration-[350ms]"
            title="Go back"
            onClick={() => router.back()}
          >
            <BackButton height="20" width="20" color="#f8fafc" />
          </button>
          <h1> {event.title} </h1>
          <div className="time-group flex flex-row gap-4 items-center">
            <span className="flex flex-row items-center gap-2">
              <span className="font-bold">Start time:</span>
              <span>{event.start_time}</span>
              <ClockIcon height="20" width="20" />
            </span>
            <span className="flex flex-row items-center gap-2">
              <span className="font-bold">End time:</span>
              <span>{event.end_time}</span>
              <ClockIcon height="20" width="20" />
            </span>
          </div>
          <div className="event-description bg-slate-100 p-4 rounded-[5px]">
            {mdParser(event.description)}
          </div>
          <div className="event-problemlist flex flex-col gap-4">
            <div className="flex flex-row items-center justify-between">
              <span className="text-2xl"> Problems </span>
              <button className="bg-blue-500 flex flex-row items-center gap-2 px-4 rounded-[5px] h-10 text-slate-50 hover:bg-blue-600 duration-[350ms]">
                <ProblemCreateIcon height="24" width="24" color="#f8fafc" />
                New Problem
              </button>
            </div>
            <Table
              heads={[
                { content: "No", className: "w-[5%]" },
                {
                  content: "Problem Title",
                  className: "text-center",
                },
              ]}
              empty={problemList.length === 0}
              className="w-full"
            >
              {problemList.map((value, index) => {
                return <tr key={index}></tr>;
              })}
            </Table>
          </div>
        </div>
        <div className="right flex flex-col gap-4 w-[25%]"></div>
      </div>
    </Layout>
  ) : (
    <div className="page-loader w-screen h-screen flex flex-col gap-4 items-center justify-center bg-blue-500">
      <span className="text-xl text-slate-50">Loading...</span>
      <span className="animate-loader w-12 h-12 rounded-full border-2 border-solid border-slate-50 border-b-transparent"></span>
    </div>
  );
}
