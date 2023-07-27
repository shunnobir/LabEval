import { DashboardIcon, EventsIcon, LogoutIcon, SettingsIcon } from "@/icons";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

function Navbar({ page }) {
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
    const u = JSON.parse(localStorage.getItem("user"));
    setUser(u);

    if (u.role === "admin")
      setTabBg(
        "border-b-2 border-solid border-b-red-500 hover:border-b-red-600"
      );
    else
      setTabBg(
        "border-b-2 border-solid border-b-blue-500 hover:border-b-blue-600"
      );
  }, []);

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
          <Image
            src={
              user.role === "admin"
                ? "/labeval_logo_admin.png"
                : "/labeval_logo.png"
            }
            alt="LabEval logo"
            height={40}
            width={190}
          />
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
              className="text-slate-50 font-medium flex flex-row items-end justify-center text-xl leading-8 h-10 w-10 rounded-full bg-blue-500 cursor-pointer hover:bg-blue-600"
              onClick={() => setShowProfilePopup(true)}
            >
              {user.username.toUpperCase()[0]}
            </span>
            {showProfilePopup ? (
              <div className="profile-popup animate-opacity absolute right-0 top-[110%] w-60 bg-slate-50 shadow-[0_0_8px_rgba(0,0,0,0.15)] rounded-[5px] z-10 before:border-[12px] before:border-solid before:border-b-slate-50 before:border-t-transparent before:border-l-transparent before:border-r-transparent before:w-[24px] before:h-[24px] before:absolute before:right-2 before:top-[-24px] before:z-[10]">
                <div
                  className="px-4 h-10 w-full hover:bg-slate-200 flex flex-row gap-3 items-center cursor-pointer"
                  onClick={() => {
                    localStorage.removeItem("user");
                    router.push("/login");
                  }}
                >
                  <LogoutIcon width="24" height="24" />
                  <span> Logout </span>
                </div>
                <div className="px-4 h-10 w-full hover:bg-slate-200 flex flex-row gap-3 items-center cursor-pointer">
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

export default function Layout({ children, page }) {
  return (
    <div className="layout flex flex-col gap-8 px-[10%] py-8">
      <Head>
        {" "}
        <title> {page.toUpperCase()[0] + page.slice(1)} | LabEval </title>{" "}
      </Head>
      <Navbar page={page} />
      {children}
    </div>
  );
}
