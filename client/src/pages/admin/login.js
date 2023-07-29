import Loader from "@/components/Loader";
import { random_string } from "@/utility";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Login() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
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

    if (password.length === 0) {
      handleError("Empty password field");
      return;
    }

    setLoading(true);
    if (password === process.env.LABEVAL_ADMIN_PASS) {
      localStorage.setItem(
        "user",
        JSON.stringify({
          uid: random_string(10),
          username: "admin",
          email: "admin.labeval@gmail.com",
          role: "admin",
        })
      );
      router.push("/");
    } else {
      handleError("Wrong password");
    }
    setLoading(false);
  };

  return (
    <div className="admin-login absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col w-[450px] h-fit p-8 gap-4 animate-opacity">
      <Head key={new Date().getMilliseconds()}>
        <title>{"Admin Login | LabEval"}</title>
      </Head>
      <Image
        src="/labeval_logo_admin.png"
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
          <label className="text-sm font-medium"> Password </label>
          <input
            type="password"
            placeholder="password"
            className="h-10 px-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
          className="text-slate-50 h-10 flex flex-row rounded-[5px] duration-300 bg-red-500 hover:bg-red-600 justify-center items-center"
          onClick={handleLogin}
        >
          {loading ? <Loader /> : "LOGIN"}
        </button>
      </form>
    </div>
  );
}
