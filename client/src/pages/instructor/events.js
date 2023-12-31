import Layout from "@/components/Layout";
import MdEditor from "@/components/markdown/MdEditor";
import Table from "@/components/Table";
import {
  CancelIcon,
  DeleteIcon,
  EventCreateYes,
  EventsCreateIcon,
  ShortTextIcon,
} from "@/icons";
import { random_string } from "@/utility";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

function CreateEventPopup({ setShow, setNotification, reload }) {
  const [value, setValue] = useState(
    sessionStorage.getItem("event-description") || ""
  );

  const [title, setTitle] = useState("");
  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");

  const handleCreate = () => {
    if (title.length === 0) {
      setNotification({
        header: "Empty Title Field",
        body: [
          <span key={0}>
            Event must have a title. And the title must be within 65 characters.
          </span>,
          <span key={1}> Try to give meaningful title. </span>,
        ],
        interval: 5000,
        type: "error",
        page: "/instructor/events",
        save: false,
        render: true,
      });
      return;
    }

    if (
      startDateTime.length === 0 ||
      endDateTime.length === 0 ||
      startDateTime > endDateTime
    ) {
      setNotification({
        header: "Invalid Date and Time",
        body: [
          <span key={0}>
            Event must have a valid start date time and end date time.
          </span>,
          <span key={1}>
            Make sure end date time is greater than start date time
          </span>,
        ],
        interval: 5000,
        type: "error",
        page: "/instructor/events",
        save: false,
        render: true,
      });
      return;
    }

    if (value.length === 0) {
      setNotification({
        header: "Empty Description Field",
        body: [
          <span key={0}>
            Event must have a description describing about the event.
          </span>,
          <span key={1}>
            Description can be as long as you need. But do not overdo it. Try to
            keep it to the point.
          </span>,
        ],
        interval: 5000,
        type: "error",
        page: "/instructor/events",
        save: false,
        render: true,
      });
      return;
    }

    let st = new Date(startDateTime).toString(),
      et = new Date(endDateTime).toString();
    const event = {
      event_id: random_string(10),
      title: title,
      description: value,
      start_time: st,
      end_time: et,
      user_id: JSON.parse(sessionStorage.getItem("user"))?.user_id,
    };

    axios
      .post("/api/instructor/events", event)
      .then((res) => res.data)
      .then((res) => {
        if (res !== "created") {
          setNotification({
            header: "Could Not Create Event",
            body: [
              <span key={0}> Event was not created because of: {res} </span>,
            ],
            interval: 5000,
            type: "error",
            save: false,
            render: true,
            page: "/instructor/events",
          });
        } else {
          setNotification({
            header: "Event Created",
            body: [
              <span key={0}> Successfully created event. </span>,
              <span key={1}> Reload the page to update the event list </span>,
            ],
            interval: 5000,
            type: "info",
            save: false,
            render: true,
            page: "/instructor/events",
          });
          reload();
          setShow(false);
        }
      });
  };

  useEffect(() => {
    sessionStorage.setItem("event-description", value);
  }, [value]);

  return (
    <div className="overlay w-screen h-screen fixed inset-0 bg-[rgba(0,0,0,0.3)] flex flex-col items-center justify-center">
      <div className="create-event bg-slate-50 shadow-[0_0_8px_rgba(0,0,0,0.15)] rounded-[10px] w-1/2">
        <div className="top flex flex-row bg-blue-500 h-16 justify-between items-center p-4 rounded-t-[5px]">
          <div className="left flex flex-row gap-4">
            <EventsCreateIcon height="24" width="24" color="#f8fafc" />
            <span className="text-xl text-slate-50"> Create Event </span>
          </div>
          <div className="right">
            <button
              className="close text-2xl text-slate-50 w-8 h-8 hover:bg-[rgba(0,0,0,0.1)] rounded-full select-none"
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
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
                  value={startDateTime}
                  onChange={(e) => {
                    setStartDateTime(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="input-field flex flex-col gap-1">
              <label className="text-sm font-medium">
                Event End Date and Time
                <span className="text-red-500"> * </span>
              </label>
              <div className="input flex flex-row px-2 h-10 w-full border border-solid border-slate-300 rounded-[5px] items-center">
                <ShortTextIcon height="28" width="28" color="#64748b" />
                <input
                  type="datetime-local"
                  required={true}
                  className="h-10 border-0"
                  value={endDateTime}
                  onChange={(e) => {
                    setEndDateTime(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="input-field flex flex-col gap-1 h-auto">
            <label className="text-sm font-medium">
              Event Description
              <span className="text-red-500"> * </span>
            </label>
            <MdEditor value={value} onChange={(value) => setValue(value)} />
          </div>
        </div>
        <div className="bottom mx-4 mb-2 px-4 pb-4 flex flex-row gap-4 items-center justify-end">
          <div
            className="flex flex-row gap-2 items-center h-10 px-4 bg-blue-500 hover:bg-blue-600 text-slate-50 rounded-[5px] text-sm cursor-pointer"
            onClick={() => handleCreate()}
          >
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

function EventBody({ setNotification }) {
  const [showCreateEventPopup, setShowCreateEventPopup] = useState(false);
  const [pastEvents, setPastEvents] = useState([]);
  const [ongoingEvents, setOngoingEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [curTime, setCurTime] = useState(new Date().getTime());
  const interval = setInterval(() => setCurTime(new Date().getTime()), 1000);

  const fetchPastEvents = () => {
    let user_id = JSON.parse(sessionStorage.getItem("user"))?.user_id;
    axios
      .get(`/api/instructor/events/?type=past&user_id=${user_id}`)
      .then((res) => res.data)
      .then((res) => {
        setPastEvents(res);
      })
      .catch((res) => {
        console.error(res.data);
      });
  };

  const fetchOngoingEvents = () => {
    let user_id = JSON.parse(sessionStorage.getItem("user"))?.user_id;
    axios
      .get(`/api/instructor/events/?type=ongoing&user_id=${user_id}`)
      .then((res) => res.data)
      .then((res) => {
        setOngoingEvents(res);
      });
  };

  const fetchUpcomingEvents = () => {
    let user_id = JSON.parse(sessionStorage.getItem("user"))?.user_id;
    axios
      .get(`/api/instructor/events/?type=upcoming&user_id=${user_id}`)
      .then((res) => res.data)
      .then((res) => {
        setUpcomingEvents(res);
      });
  };

  const reload = () => {
    fetchUpcomingEvents();
    fetchOngoingEvents();
    fetchPastEvents();
  };

  const handleDeleteEvent = (event_id) => {
    // TODO: Yes/No promp
    axios
      .delete(`/api/instructor/events/?event_id=${event_id}`)
      .then((res) => res.data)
      .then((res) => {
        if (res === "deleted") {
          setNotification({
            header: "Event Deleted",
            body: [
              <span key={0}> Successfully deleted event. </span>,
              <span key={1}> Reload the page to update the event list </span>,
            ],
            interval: 5000,
            type: "info",
            save: false,
            render: true,
            page: "/instructor/events",
          });
          reload();
        }
      });
  };

  useEffect(() => {
    fetchPastEvents();
    fetchOngoingEvents();
    fetchUpcomingEvents();
  }, []);

  useEffect(() => {
    return () => {
      clearInterval(interval);
      sessionStorage.removeItem("event-description");
    };
  }, []);

  return (
    <div className="event-body flex flex-col gap-8">
      <button
        className="bg-blue-500 hover:bg-blue-600 flex flex-row gap-2 ml-auto h-10 px-4 rounded-[5px] text-slate-50 items-center duration-[350ms]"
        onClick={() => setShowCreateEventPopup(true)}
      >
        <EventsCreateIcon height="24" width="24" color="#f8fafc" />{" "}
        <span> New event </span>
      </button>
      <div className="block1 flex flex-col gap-4">
        <span className="text-2xl">Ongoing or Soon to Be Starting Events</span>
        <Table
          heads={[
            { content: "Title", className: "w-[50%]" },
            { content: "Start Date", className: "" },
            { content: "End Date", className: "" },
            { content: "Time to Start or Time Remaining", className: "" },
          ]}
          empty={ongoingEvents.length === 0}
          className="w-full"
        >
          {ongoingEvents.map((value, index) => {
            let st = new Date(value.start_time).getTime();
            let et = new Date(value.end_time).getTime();
            let diff =
              st >= curTime ? st - curTime : et >= curTime ? et - curTime : 0;
            let color =
              st >= curTime
                ? "text-slate-900"
                : et >= curTime
                ? "text-blue-500"
                : "text-red-500";
            let hours = Math.floor(diff / (1000 * 60 * 60));
            diff -= hours * 60 * 60 * 1000;
            let minutes = Math.floor(diff / (1000 * 60));
            diff -= minutes * 60 * 1000;
            let seconds = Math.floor(diff / 1000);
            let finished =
              hours === 0 && minutes === 0 && seconds === 0 && et < curTime;
            if (finished) reload();
            return (
              <tr key={index}>
                <td>
                  <Link
                    href={`/instructor/events/${value.event_id}`}
                    className="font-normal hover:text-blue-500 flex flex-row gap-2"
                  >
                    <span>{value.title}</span>
                    {st < curTime && (et >= curTime || et < curTime) ? (
                      <span className="px-2 bg-red-50 border border-solid border-red-200 text-red-500 rounded-[1rem]">
                        Running
                      </span>
                    ) : null}
                  </Link>
                </td>
                <td>{value.start_time}</td>
                <td>{value.end_time}</td>
                <td className={color + " font-medium"}>
                  {finished
                    ? "Completed"
                    : String(hours).padStart(2, 0) +
                      ":" +
                      String(minutes).padStart(2, 0) +
                      ":" +
                      String(seconds).padStart(2, 0)}
                </td>
              </tr>
            );
          })}
        </Table>
      </div>
      <div className="block2 flex flex-col gap-4">
        <span className="text-2xl"> Upcoming Events </span>
        <Table
          heads={[
            { content: "Title", className: "w-[50%]" },
            { content: "Start Date", className: "" },
            { content: "End Date", className: "" },
            { content: "Participant", className: "" },
            { content: "", className: "w-[5%]" },
          ]}
          empty={upcomingEvents.length === 0}
          className="w-full"
        >
          {upcomingEvents.map((value, index) => {
            return (
              <tr key={index}>
                <td>
                  <Link
                    href={`/instructor/events/${value.event_id}`}
                    className="font-normal hover:text-blue-500"
                  >
                    {value.title}
                  </Link>
                </td>
                <td>{value.start_time}</td>
                <td>{value.end_time}</td>
                <td>{0}</td>
                <td>
                  <div className="flex flex-row gap-2 w-full items-center justify-center">
                    <button
                      className="w-6 h-6 border border-solid border-slate-500 flex flex-row items-center justify-center rounded-full"
                      onClick={() => handleDeleteEvent(value.event_id)}
                    >
                      <DeleteIcon width="16" height="16" color="#64748b" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </Table>
      </div>
      <div className="block3 flex flex-col gap-4">
        <span className="text-2xl"> Past Events </span>
        <Table
          heads={[
            { content: "Title", className: "w-[50%]" },
            { content: "Start Date", className: "" },
            { content: "End Date", className: "" },
            { content: "Participant", className: "" },
            { content: "", className: "w-[5%]" },
          ]}
          empty={pastEvents.length === 0}
          className="w-full"
        >
          {pastEvents.map((value, index) => {
            return (
              <tr key={index}>
                <td>
                  <Link
                    href={`/instructor/events/${value.event_id}`}
                    className="font-normal hover:text-blue-500"
                  >
                    {value.title}
                  </Link>
                </td>
                <td>{value.start_time}</td>
                <td>{value.end_time}</td>
                <td>{0}</td>
                <td>
                  <div className="flex flex-row gap-2 w-full items-center justify-center">
                    <button
                      className="w-6 h-6 border border-solid border-slate-500 flex flex-row items-center justify-center rounded-full"
                      onClick={() => handleDeleteEvent(value.event_id)}
                    >
                      <DeleteIcon width="16" height="16" color="#64748b" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </Table>
      </div>
      {showCreateEventPopup ? (
        <CreateEventPopup
          setShow={setShowCreateEventPopup}
          setNotification={setNotification}
          reload={() => {
            fetchPastEvents();
            fetchOngoingEvents();
            fetchUpcomingEvents();
          }}
        />
      ) : null}
    </div>
  );
}

export default function Events(props) {
  return (
    <div className="instructor-events animate-opacity">
      <Layout page={"events"} title={"Events"} {...props}>
        <EventBody {...props} />
      </Layout>
    </div>
  );
}
