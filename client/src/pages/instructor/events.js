import Layout from "@/components/Layout";
import MdEditor from "@/components/markdown/MdEditor";
import {
  CancelIcon,
  EventCreateYes,
  EventsCreateIcon,
  ShortTextIcon,
} from "@/icons";
import { useEffect, useState } from "react";

function CreateEventPopup({ setShow }) {
  const [value, setValue] = useState(
    sessionStorage.getItem("event-description") || ""
  );

  useEffect(() => {
    sessionStorage.setItem("event-description", value);
  }, [value]);

  return (
    <div className="overlay w-screen h-screen fixed inset-0 bg-[rgba(0,0,0,0.3)] animate-opacity">
      <div className="create-event bg-slate-50 shadow-[0_0_8px_rgba(0,0,0,0.15)] fixed w-[50%] min-h-[auto] h-auto top-[15%] left-[25%] rounded-[10px] animate-popup">
        <div className="top flex flex-row bg-blue-500 h-16 justify-between items-center p-4 rounded-t-[5px]">
          <div className="left flex flex-row gap-4">
            <EventsCreateIcon height="24" width="24" color="#f8fafc" />
            <span className="text-xl text-slate-50"> Create Event </span>
          </div>
          <div className="right">
            <button
              className="close text-2xl text-slate-50 w-8 h-8 hover:bg-[rgba(0,0,0,0.1)] rounded-full"
              onClick={() => setShow(false)}
            >
              &times;
            </button>
          </div>
        </div>
        <div className="middle flex flex-col gap-4 p-4 h-auto mx-4">
          <div className="input-field flex flex-col gap-1">
            <label className="text-sm font-medium">
              Event Title
              <span className="text-red-500"> * </span>
            </label>
            <div className="input flex flex-row px-2 h-10 w-full gap-1 border border-solid border-slate-300 rounded-[5px] items-center overflow-visible">
              <ShortTextIcon height="28" width="28" color="#64748b" />
              <input
                type="text"
                maxLength="80"
                size="80"
                required={true}
                placeholder="Event Title"
                className="h-10 border-0"
              />
            </div>
          </div>
          <div className="times flex flex-row flex-wrap gap-4">
            <div className="input-field flex flex-col gap-1">
              <label className="text-sm font-medium">
                Event Start Date and Time
                <span className="text-red-500"> * </span>
              </label>
              <div className="input flex flex-row px-2 h-10 w-full border border-solid border-slate-300 rounded-[5px] items-center">
                <ShortTextIcon height="28" width="28" color="#64748b" />
                <input
                  type="datetime-local"
                  required={true}
                  className="h-10 border-0 w-fit"
                />
              </div>
            </div>
            <div className="input-field flex flex-col gap-1">
              <label className="text-sm font-medium">
                Event End Date and Time{" "}
                <span className="text-red-500"> * </span>
              </label>
              <div className="input flex flex-row px-2 h-10 w-full border border-solid border-slate-300 rounded-[5px] items-center">
                <ShortTextIcon height="28" width="28" color="#64748b" />
                <input
                  type="datetime-local"
                  required={true}
                  className="h-10 border-0"
                />
              </div>
            </div>
          </div>
          <div className="input-field flex flex-col gap-1 h-auto">
            <label className="text-sm font-medium">
              Event Description
              <span className="text-red-500"> * </span>
            </label>
            <MdEditor
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
        </div>
        <div className="bottom mx-4 mb-2 px-4 pb-4 flex flex-row gap-4 items-center justify-end">
          <div className="flex flex-row gap-2 items-center h-10 px-4 bg-blue-500 hover:bg-blue-600 text-slate-50 rounded-[5px] text-sm cursor-pointer">
            <EventCreateYes height="20" width="20" color="#f8fafc" />
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

function EventBody() {
  const [showCreateEventPopup, setShowCreateEventPopup] = useState(false);
  return (
    <div className="event-body flex flex-col gap-8">
      <button
        className="bg-blue-500 hover:bg-blue-600 flex flex-row gap-2 ml-auto h-10 px-4 rounded-[5px] text-slate-50 items-center"
        onClick={() => setShowCreateEventPopup(true)}
      >
        <EventsCreateIcon height="24" width="24" color="#f8fafc" />{" "}
        <span> New event </span>
      </button>
      <div className="block1">
        <span className="text-2xl"> Ongoing Events </span>
      </div>
      <div className="block2">
        <span className="text-2xl"> Upcoming Events </span>
      </div>
      <div className="block3">
        <span className="text-2xl"> Past Events </span>
      </div>
      {showCreateEventPopup ? (
        <CreateEventPopup setShow={setShowCreateEventPopup} />
      ) : null}
    </div>
  );
}

export default function Events() {
  return (
    <div className="instructor-events animate-opacity">
      <Layout page={"events"}>
        <EventBody />
      </Layout>
    </div>
  );
}
