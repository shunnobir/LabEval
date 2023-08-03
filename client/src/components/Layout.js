import {
  DashboardIcon,
  EventsIcon,
  LogoutIcon,
  SettingsIcon,
  PersonIcon,
  LabEvalLogo,
} from "@/icons";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

function Navbar({ page, setNotification }) {
  const [user, setUser] = useState({
    uid: "",
    username: "",
    email: "",
    role: "",
    join_date: "",
  });
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [tabBg, setTabBg] = useState("");
  const router = useRouter();
  const profileRef = useRef(null);

  useEffect(() => {
    let item = sessionStorage.getItem("user");
    if (item === null) {
      setNotification({
        header: "You were logged out",
        page: "",
        body: [
          <span key={0}>
            Session expired. You got logged out. Each time you close labeval tab
            or your browser, you get logged out.
          </span>,
          <span key={1}>
            Please{" "}
            <Link href="/login" className="text-blue-500">
              login
            </Link>{" "}
            again!
          </span>,
        ],
        interval: 0,
        type: "error",
        save: false,
        render: true,
      });
      return;
    }

    const u = JSON.parse(item);
    setUser(u);

    if (u.role === "admin")
      setTabBg(
        "border-b-2 border-solid border-b-red-500 hover:border-b-red-600"
      );
    else
      setTabBg(
        "border-b-2 border-solid border-b-blue-500 hover:border-b-blue-600"
      );
  }, [setNotification]);

  useEffect(() => {
    const handleShowProfilePopup = (e) => {
      if (profileRef?.current && !profileRef.current.contains(e.target))
        setShowProfilePopup(false);
    };

    document.addEventListener("mousedown", handleShowProfilePopup);
    return () =>
      document.removeEventListener("mousedown", handleShowProfilePopup);
  }, []);

  useEffect(() => {}, [user]);

  return user.username?.length > 0 ? (
    <div className="navbar flex flex-col gap-4 animate-opacity">
      <div className="top flex flex-row justify-between items-center">
        <div className="nav-left">
          <Link href={`/${user.role}/dashboard`}>
            <LabEvalLogo />
          </Link>
        </div>

        <div className="nav-right flex flex-row gap-4 items-center">
          <div className="nav-links flex flex-row rounded-[5px]">
            <div
              className={
                "px-4 h-10 flex flex-row gap-2 items-center justify-center cursor-pointer" +
                (page === "dashboard" ? " " + tabBg : "")
              }
              onClick={() => router.push(`/${user.role}/dashboard`)}
            >
              <DashboardIcon height="24" width="24" /> <span> Dashboard </span>
            </div>
            <div
              className={
                "px-4 h-10 flex flex-row gap-2 items-center justify-center cursor-pointer" +
                (page === "events" ? " " + tabBg : "")
              }
              onClick={() => router.push(`/${user.role}/events`)}
            >
              <EventsIcon height="24" width="24" /> <span> Events </span>
            </div>
          </div>
          <div
            ref={profileRef}
            className="profile flex flex-row items-center gap-2 relative"
          >
            <span
              className="text-slate-50 font-medium flex flex-row items-center justify-between h-10 w-[4.5rem] px-3 rounded-[5px] bg-blue-500 cursor-pointer hover:bg-blue-600 duration-[350ms]"
              onClick={() => setShowProfilePopup(true)}
            >
              <PersonIcon height="24" width="24" color="#f8fafc" />
              <span className="border-[5px] border-solid border-b-transparent border-l-transparent border-r-transparent border-t-slate-50 w-[12px] h-[10px] translate-y-[2px]"></span>
            </span>
            {showProfilePopup ? (
              <div className="profile-popup animate-opacity absolute right-0 top-[110%] min-w-[20rem] bg-slate-50 shadow-[0_0_8px_rgba(0,0,0,0.15)] rounded-[5px] z-10 before:border-[12px] before:border-solid before:border-b-slate-50 before:border-t-transparent before:border-l-transparent before:border-r-transparent before:w-[24px] before:h-[24px] before:absolute before:right-2 before:top-[-24px] before:z-[10]">
                <div className="p-4 flex flex-row gap-3 items-center">
                  <div className="left flex flex-row gap-4 items-center">
                    <span className="border border-solid border-slate-900 p-1 flex flex-row items-center justify-center rounded-full">
                      <PersonIcon height="28" width="28" />
                    </span>
                    <div className="name-email flex flex-col gap-1">
                      <span>
                        {user.username + " "}
                        <span className="font-medium px-2 bg-red-100 border border-solud border-red-200 rounded-[5px] text-red-500">
                          {user.role.toUpperCase()[0] + user.role.slice(1)}
                        </span>
                      </span>
                      <span className="text-blue-500"> {user.email} </span>
                    </div>
                  </div>
                </div>
                <hr className="border-t border-solid border-slate-200" />
                <div
                  className="px-4 h-12 hover:bg-slate-200 flex flex-row gap-3 items-center cursor-pointer"
                  onClick={() => {
                    sessionStorage.removeItem("user");
                    router.push("/login");
                  }}
                >
                  <LogoutIcon width="24" height="24" />
                  <span> Logout </span>
                </div>
                <div className="px-4 h-12 hover:bg-slate-200 flex flex-row gap-3 items-center cursor-pointer rounded-b-[5px]">
                  <SettingsIcon width="24" height="24" />
                  <span> Settings </span>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  ) : null;
}

export default function Layout({ children, page, setNotification }) {
  let title = page.toUpperCase()[0] + page.slice(1) + " | LabEval";
  const [userLoggedIn, setUserLoggedIn] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!sessionStorage.getItem("user")) setUserLoggedIn(false);
  }, []);

  if (!userLoggedIn) {
    router.push("/login");
    return null;
  }

  return (
    <div className="layout flex flex-col gap-8 px-[10%] py-8">
      <Head>
        <title>{title}</title>
      </Head>
      <Navbar page={page} setNotification={setNotification} />
      {children}
    </div>
  );
}
