import Layout from "@/components/Layout";
import Table from "@/components/Table";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

function EventBody({ setNotification }) {
  const [pastEvents, setPastEvents] = useState([]);
  const [ongoingEvents, setOngoingEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [curTime, setCurTime] = useState(new Date().getTime());
  const interval = setInterval(() => setCurTime(new Date().getTime()), 1000);

  const fetchPastEvents = () => {
    let user_id = JSON.parse(sessionStorage.getItem("user"))?.user_id;
    axios
      .get(`/api/participant/events/?type=past&user_id=${user_id}`)
      .then((res) => res.data)
      .then((res) => {
        setPastEvents(res);
      });
  };

  const fetchOngoingEvents = () => {
    let user_id = JSON.parse(sessionStorage.getItem("user"))?.user_id;
    axios
      .get(`/api/participant/events/?type=ongoing&user_id=${user_id}`)
      .then((res) => res.data)
      .then((res) => {
        setOngoingEvents(res);
      });
  };

  const fetchUpcomingEvents = () => {
    let user_id = JSON.parse(sessionStorage.getItem("user"))?.user_id;
    axios
      .get(`/api/participant/events/?type=upcoming&user_id=${user_id}`)
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
                    href={`/participant/events/${value.event_id}`}
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
          ]}
          empty={upcomingEvents.length === 0}
          className="w-full"
        >
          {upcomingEvents.map((value, index) => {
            return (
              <tr key={index}>
                <td>
                  <Link
                    href={`/participant/events/${value.event_id}`}
                    className="font-normal hover:text-blue-500"
                  >
                    {value.title}
                  </Link>
                </td>
                <td>{value.start_time}</td>
                <td>{value.end_time}</td>
                <td>{0}</td>
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
          ]}
          empty={pastEvents.length === 0}
          className="w-full"
        >
          {pastEvents.map((value, index) => {
            return (
              <tr key={index}>
                <td>
                  <Link
                    href={`/participant/events/${value.event_id}`}
                    className="font-normal hover:text-blue-500"
                  >
                    {value.title}
                  </Link>
                </td>
                <td>{value.start_time}</td>
                <td>{value.end_time}</td>
                <td>{0}</td>
              </tr>
            );
          })}
        </Table>
      </div>
    </div>
  );
}

export default function Events(props) {
  return (
    <div className="instructor-events animate-opacity">
      <Layout page={"events"} title="Events" {...props}>
        <EventBody {...props} />
      </Layout>
    </div>
  );
}
