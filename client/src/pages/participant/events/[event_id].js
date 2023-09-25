import Layout from "@/components/Layout";
import { labevalMarkdownParser } from "@/components/markdown/mdParser";
import Table from "@/components/Table";
import {
  BackButton,
  ClockIcon,
  RegisteredIcon,
  RegistrationIcon,
} from "@/icons";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Event(props) {
  const [eventId, setEventId] = useState("");
  const [userId, setUserId] = useState("");
  const [event, setEvent] = useState({
    event_id: "",
    title: "",
    description: "",
    start_time: "",
    end_time: "",
    created_by: "",
  });
  const [problemList, setProblemList] = useState([]);
  const [isRegistered, setIsRegistered] = useState(false);
  const router = useRouter();

  const getEvent = (id) => {
    axios
      .get(`/api/participant/events/${id}/?type=info`)
      .then((res) => res.data[0])
      .then((res) => {
        if (res) setEvent(res);
      });
  };

  const getProblemList = (id) => {
    axios
      .get(`/api/participant/events/${id}/?type=problem_list`)
      .then((res) => res.data)
      .then((res) => {
        if (res) setProblemList(res);
      });
  };

  const getRegistration = (event_id, user_id) => {
    axios
      .get(
        `/api/participant/events/${event_id}/?type=registration&user_id=${user_id}`
      )
      .then((res) => res.data)
      .then((res) => {
        setIsRegistered(res);
      });
  };

  const handleRegister = () => {
    if (isRegistered) return;
    axios
      .post(`/api/participant/events/${eventId}/?type=register`, {
        user_id: userId,
        event_id: eventId,
      })
      .then((res) => res.data)
      .then((res) => {
        // TODO: handle success
        router.reload();
      });
  };

  useEffect(() => {
    if (router.query?.event_id) {
      setUserId(JSON.parse(sessionStorage.getItem("user")).user_id);
      setEventId(router.query.event_id);
      getEvent(router.query.event_id);
      getProblemList(router.query.event_id);
      getRegistration(
        router.query.event_id,
        JSON.parse(sessionStorage.getItem("user")).user_id
      );
    }
  }, [router.query]);

  return eventId ? (
    <Layout page="events" {...props}>
      <div className="labeval-event flex flex-row gap-4 animate-opacity w-full">
        <div className="left flex flex-col gap-4 w-3/4">
          <button
            className="w-8 h-8 bg-blue-500 flex flex-row items-center justify-center rounded-full cursor-pointer hover:shadow-[0_0_8px_rgba(0,0,0,0.15)] duration-[350ms]"
            title="Go back"
            onClick={() => router.back()}
          >
            <BackButton height="20" width="20" color="#f8fafc" />
          </button>
          <div className="flex flex-row justify-between items-center">
            <h1> {event.title} </h1>
            <button
              className={
                (isRegistered
                  ? "bg-green-500 hover:bg-green-600 "
                  : "bg-red-500 hover:bg-red-600 ") +
                "px-4 text-slate-50 h-10 rounded-[5px] flex flex-row gap-2 items-center duration-[350ms]"
              }
              disabled={isRegistered}
              onClick={() => handleRegister()}
            >
              {isRegistered ? (
                <RegisteredIcon width="24" height="24" color="#f8fafc" />
              ) : (
                <RegistrationIcon width="24" height="24" color="#f8fafc" />
              )}
              {isRegistered ? "Registered" : "Register"}
            </button>
          </div>
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
                return (
                  <tr key={index}>
                    <td>{String.fromCharCode(65 + index)}</td>
                    <td>
                      <Link
                        href={`/participant/events/${eventId}/problems/${
                          value.problem_id
                        }?order=${String.fromCharCode(65 + index)}`}
                        className="text-blue-500 flex flex-row"
                      >
                        {value.title}
                      </Link>
                    </td>
                  </tr>
                );
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