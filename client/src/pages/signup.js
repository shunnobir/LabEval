import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

import Select from "@/components/Select";
import Loader from "@/components/Loader";

export default function Signup({ setNotification }) {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [selected, setSelected] = useState(0);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleError = (s) => {
    setError(s);
    setTimeout(() => {
      setError("");
    }, 5000);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (username.length === 0) {
      handleError("Invalid username");
      return;
    }

    if (email.length === 0) {
      handleError("Invalid email");
      return;
    }

    if (password.length === 0) {
      handleError("Empty password is not allowed");
      return;
    }

    setLoading(true);
    axios
      .post("/api/signup", {
        username,
        email,
        password,
        role: selected === 1 ? "instructor" : "participant",
        // accepted: selected === 0 ? "true" : "false",
        accepted: true,
      })
      .then((res) => res.data)
      .then((res) => {
        if (res !== "Successful") handleError(res);
        else {
          setNotification({
            header: "Successfully Signed Up",
            body: [
              <span key={0}>You have successfully signed up to LabEval.</span>,
              <span key={1}>
                <Link href="/login" className="text-blue-500">
                  Login{" "}
                </Link>{" "}
                to explore LabEval.
              </span>,
            ],
            page: "/signup",
            type: "info",
            interval: 0,
            save: false,
            render: true,
          });
          router.push("/login");
        }
        setLoading(false);
      })
      .catch((err) => {
        handleError(err);
      });
  };

  return (
    <div className="signup absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col w-[450px] h-fit p-8 gap-4 animate-opacity">
      <Head key={new Date().getMilliseconds()}>
        <title> Signup | LabEval </title>
      </Head>
      <Image
        src="/labeval_logo.png"
        alt="LabEval Logo"
        width={190}
        height={40}
        style={{ objectFit: "contain", margin: "auto" }}
      />
      <span className="text-2xl font-medium text-center"> SIGNUP </span>
      <form
        className="signup-form flex flex-col gap-6 w-full"
        onSubmit={handleSignup}
      >
        <div className="form-row flex flex-col gap-1">
          <label className="text-sm font-medium"> Username </label>
          <input
            type="text"
            placeholder="username"
            className="h-10 px-4"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="form-row flex flex-col gap-1">
          <label className="text-sm font-medium"> Email </label>
          <input
            type="text"
            placeholder="email"
            className="h-10 px-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-row flex flex-col gap-1">
          <label className="text-sm font-medium"> Password </label>
          <input
            type="password"
            placeholder="password"
            className="h-10 px-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-row flex flex-col gap-1">
          <label className="text-sm font-medium"> Signup as </label>
          <Select
            options={["Participant", "Instructor"]}
            setSelected={setSelected}
          />
        </div>
        {error.length > 0 ? (
          <span className="animate-opacity min-h-[2.5rem] rounded-[5px] w-full pl-4 pr-6 bg-red-500 text-slate-50 flex flex-row items-center justify-center relative">
            {error}
            <span
              className="absolute right-4 text-xl cursor-pointer"
              onClick={() => setError("")}
            >
              &times;
            </span>
          </span>
        ) : null}
        <button
          className="text-slate-50 h-10 rounded-[5px] duration-300 flex flex-row items-center justify-center bg-blue-500 hover:bg-blue-600"
          onClick={handleSignup}
        >
          {loading ? <Loader /> : "SIGNUP"}
        </button>
        <span className="text-center">
          Already have an account?
          <Link href="/login" className="text-blue-500">
            {" Login"}
          </Link>
        </span>
      </form>
    </div>
  );
}
