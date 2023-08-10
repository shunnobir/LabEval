import Layout from "@/components/Layout";
import MdEditor from "@/components/markdown/MdEditor";
import { labevalMarkdownParser } from "@/components/markdown/mdParser";
import Table from "@/components/Table";
import {
  BackButton,
  CancelIcon,
  ClockIcon,
  ProblemCreateIcon,
  ProblemCreateYesIcon,
  ShortTextIcon,
} from "@/icons";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function CreateProblemPopup({ setShow, setNotification, reload }) {
  const [title, setTitle] = useState(
    sessionStorage.getItem("problem-title") || ""
  );
  const [problemRunTime, setProblemRunTime] = useState(
    sessionStorage.getItem("problem-time") || ""
  );
  const [problemOrder, setProblemOrder] = useState(
    sessionStorage.getItem("problem-order") || ""
  );
  const [value, setValue] = useState(
    sessionStorage.getItem("problem-statement") || ""
  );

  return (
    <div className="overlay fixed w-screen h-screen left-0 top-0 bg-[rgba(0,0,0,0.3)] z-10 animate-opacity flex flex-row items-center justify-center">
      <div className="problem-popup animate-popup bg-slate-50 rounded-[5px] w-screen h-screen flex flex-col">
        <div className="top flex flex-row bg-blue-500 h-16 justify-between items-center p-4 rounded-t-[ 5px] px-[10%]">
          <div className="left flex flex-row gap-4">
            <ProblemCreateIcon height="24" width="24" color="#f8fafc" />
            <span className="text-xl text-slate-50"> Create Problem </span>
          </div>
          <div className="right">
            <button
              className="close text-2xl text-slate-50 w-8 h-8 bg-[rgba(0,0,0,0.1)] hover:bg-[rgba(0,0,0,0.2)] rounded-full"
              onClick={() => setShow(false)}
            >
              &times;
            </button>
          </div>
        </div>
        <div className="middle flex flex-col gap-4 py-4 px-[10%] h-full mx-4">
          <div className="input-field flex flex-col gap-1">
            <label className="text-sm font-medium">
              Event Title
              <span className="text-red-500"> * </span>
            </label>
            <div className="input flex flex-row px-2 h-10 w-full gap-1 border border-solid border-slate-300 rounded-[5px] items-center overflow-visible">
              <ShortTextIcon height="28" width="28" color="#64748b" />
              <input
                type="text"
                pattern={/.+/}
                maxLength="80"
                size="80"
                required={true}
                placeholder="Problem Title"
                className="h-10 border-0"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  sessionStorage.setItem("problem-title", e.target.value);
                }}
              />
            </div>
          </div>
          <div className="times flex flex-row flex-wrap gap-4">
            <div className="input-field flex flex-col gap-1">
              <label className="text-sm font-medium">
                Time Limit Per Test Case
                <span className="text-red-500"> * </span>
              </label>
              <div className="input flex flex-row px-2 h-10 w-full border border-solid border-slate-300 rounded-[5px] items-center">
                <ShortTextIcon height="28" width="28" color="#64748b" />
                <input
                  type="text"
                  pattern={/\d+s/}
                  required={true}
                  placeholder="e.g. 2s"
                  className="h-10 border-0 w-fit"
                  value={problemRunTime}
                  onChange={(e) => {
                    setProblemRunTime(e.target.value);
                    sessionStorage.setItem("problem-time", e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="input-field flex flex-col gap-1">
              <label className="text-sm font-medium">
                Problem Order
                <span className="text-red-500"> * </span>
              </label>
              <div className="input flex flex-row px-2 h-10 w-full border border-solid border-slate-300 rounded-[5px] items-center">
                <ShortTextIcon height="28" width="28" color="#64748b" />
                <input
                  type="text"
                  pattern={/\d+/}
                  required={true}
                  placeholder="e.g. 3"
                  className="h-10 border-0"
                  value={problemOrder}
                  onChange={(e) => {
                    setProblemOrder(e.target.value);
                    sessionStorage.setItem("problem-order", e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="input-field flex flex-col gap-1 h-full">
            <label className="text-sm font-medium">
              Problem Statement
              <span className="text-red-500"> * </span>
            </label>
            <MdEditor
              value={value}
              onChange={(value) => {
                setValue(value);
                sessionStorage.setItem("problem-statement", value);
              }}
            />
          </div>
        </div>
        <div className="bottom mx-4 mb-2 px-[10%] pb-4 flex flex-row gap-4 items-center justify-end">
          <div
            className="flex flex-row gap-2 items-center h-10 px-4 bg-blue-500 hover:bg-blue-600 text-slate-50 rounded-[5px] text-sm cursor-pointer"
            onClick={() => handleCreate()}
          >
            <ProblemCreateYesIcon height="20" width="20" color="#f8fafc" />
            <span> Create </span>
          </div>
          <div
            className="flex flex-row gap-2 items-center h-10 px-4 bg-slate-200 hover:bg-slate-300 rounded-[5px] text-sm cursor-pointer"
            onClick={() => setShow(false)}
          >
            <CancelIcon height="20" width="20" />
            Cancel
          </div>
        </div>
      </div>
    </div>
  );
}

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
  const [showCreateProblemPopup, setShowCreateProblemPopup] = useState(false);
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
            {labevalMarkdownParser(event.description)}
          </div>
          <div className="event-problemlist flex flex-col gap-4">
            <div className="flex flex-row items-center justify-between">
              <span className="text-2xl"> Problems </span>
              <button
                className="bg-blue-500 flex flex-row items-center gap-2 px-4 rounded-[5px] h-10 text-slate-50 hover:bg-blue-600 duration-[350ms]"
                onClick={() => setShowCreateProblemPopup(true)}
              >
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
        {showCreateProblemPopup ? (
          <CreateProblemPopup
            setShow={setShowCreateProblemPopup}
            setNotification={props.setNotification}
          />
        ) : null}
      </div>
    </Layout>
  ) : (
    <div className="page-loader w-screen h-screen flex flex-col gap-4 items-center justify-center bg-blue-500">
      <span className="text-xl text-slate-50">Loading...</span>
      <span className="animate-loader w-12 h-12 rounded-full border-2 border-solid border-slate-50 border-b-transparent"></span>
    </div>
  );
}
