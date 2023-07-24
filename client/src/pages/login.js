import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

import Select from "@/components/Select";

export default function Login() {
  const [username, setUserName] = useState("");
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

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("/api/login", {
        username,
        password,
        role: selected === 1 ? "instructor" : "participant",
      })
      .then((res) => res.data)
      .then((res) => {
        if (res.status !== "Successful") handleError(res.status);
        else {
          localStorage.setItem(
            "user",
            JSON.stringify({
              uid: res.uid,
              username: res.username,
              email: res.email,
              role: res.role,
              join_date: res.join_date,
            })
          );
          router.push("/");
        }
        setLoading(false);
      })
      .catch((err) => {
        handleError(err);
      });
  };

  return (
    <div className="login translate-x-[calc(calc(100vw-450px)/2)] translate-y-[25%] flex flex-col w-[450px] h-fit p-8 gap-4 animate-opacity">
      <Head key={new Date().getMilliseconds()}>
        <title> Login | LabEval </title>
      </Head>
      <Image
        src="/labeval_logo.png"
        alt="LabEval Logo"
        width={190}
        height={40}
        style={{ objectFit: "contain", margin: "auto" }}
      />
      <span className="text-2xl font-medium text-center"> LOGIN </span>
      <form
        className="login-form flex flex-col gap-6 w-full"
        onSubmit={handleLogin}
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
          <label className="text-sm font-medium"> Login as </label>
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
          className={
            "text-slate-50 h-10 rounded-[5px] duration-300" +
            (selected === 0
              ? " bg-blue-500 hover:bg-blue-600"
              : " bg-yellow-500 hover:bg-yellow-600")
          }
          onClick={handleLogin}
        >
          {loading ? "Logging in..." : "LOGIN"}
        </button>
        <span className="text-center">
          Already have an account?
          <Link
            href="/signup"
            className={selected === 0 ? "text-blue-500" : "text-yellow-500"}
          >
            {" Signup"}
          </Link>
        </span>
      </form>
    </div>
  );
}
