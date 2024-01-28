"use client";

import Button from "@/components/Button";
import EyeInput from "@/components/EyeInput";
import Input from "@/components/Input";
import Select from "@/components/Select";
import { LabEvalLogo } from "@/icons";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import Loader from "@/components/Loader";
import { toast } from "sonner";
import LoaderButton from "@/components/LoaderButton";
import { ThemeContext } from "../contexts/ThemeContext";
import Loading from "@/components/Loading";

export default function Auth() {
  const router = useRouter();
  const [isSignup, setIsSignup] = useState(true);
  const [selected, setSelected] = useState(0);
  const [loading, setLoading] = useState(true);
  const [signupPending, setSignupPending] = useState(false);
  const [loginPending, setLoginPending] = useState(false);
  const searchParams = useSearchParams();
  const theme = useContext(ThemeContext);

  const [uname, setUname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setSignupPending(true);
    let res = await fetch("/api/auth?auth=signup", {
      method: "POST",
      body: JSON.stringify({
        uname: uname,
        email: email,
        password: password,
        isInstructor: selected === 0,
      }),
      cache: "no-store",
    });

    let data: { status: string; ok: boolean } = await res.json();
    if (!data.ok) toast.error(data.status);
    else {
      toast.success("signup successful");
      router.replace("/auth?auth=login");
    }
    setSignupPending(false);
  };

  const handleLogin = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoginPending(true);
    let res = await fetch("/api/auth?auth=login", {
      method: "POST",
      body: JSON.stringify({
        uname: uname,
        password: password,
        role: selected === 0 ? "instructor" : "participant",
      }),
      cache: "no-store",
    });

    let data: { status: string; ok: boolean } = await res.json();
    if (!data.ok) toast.error(data.status);
    else {
      toast.success(data.status);
      localStorage.setItem("isLoggedIn", "true");
      router.push("/");
    }
    setLoginPending(false);
  };

  useEffect(() => {
    setLoading(false);
    if (searchParams.get("auth") === "signup") setIsSignup(true);
    else setIsSignup(false);
    setUname("");
    setEmail("");
    setPassword("");
  }, [searchParams]);

  if (loading) return <Loading />;

  return (
    <div className="auth flex flex-col flex-1 gap-4 sm:items-center sm:justify-center px-[2.5%]">
      <div className="m-auto w-[95%] sm:w-[30rem] flex flex-col gap-4 sm:items-center border border-solid border-slate-300 dark:border-slate-800 px-4 py-8 sm:px-10 sm:py-20 rounded-md">
        <Link href="/" className="mx-auto">
          <LabEvalLogo
            color={theme === "light" ? "#09090b" : "#f0f9ff"}
            width="180"
            className="w-[140px] sm:w-[180px]"
          />
        </Link>
        <span className="text-2xl sm:text-3xl mx-auto">
          {isSignup ? "SIGNUP" : "LOGIN"}
        </span>
        <form
          className="mt-4 flex flex-col gap-6 w-[90%] sm:w-96 mx-auto flex-1"
          onSubmit={isSignup ? handleSignup : handleLogin}
        >
          <Input
            type="text"
            placeholder="enter username"
            value={uname}
            onChange={(e) => setUname(e.target.value)}
          />
          {isSignup ? (
            <Input
              type="text"
              placeholder="enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          ) : null}
          <EyeInput
            placeholder="enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Select
            options={["Instructor", "Participant"]}
            setSelected={setSelected}
          />
          {isSignup ? (
            signupPending ? (
              <LoaderButton />
            ) : (
              <Button onClick={handleSignup}>Signup</Button>
            )
          ) : loginPending ? (
            <LoaderButton />
          ) : (
            <Button onClick={handleLogin}>Login</Button>
          )}
        </form>
        {isSignup ? (
          <span className="mx-auto">
            Already have an account?{" "}
            <Link
              href="/auth?auth=login"
              className="text-sky-500 hover:underline"
            >
              Login
            </Link>
          </span>
        ) : (
          <span className="mx-auto">
            {"Don't have an account? "}
            <Link
              href="/auth?auth=signup"
              className="text-sky-500 hover:underline"
            >
              Signup
            </Link>
          </span>
        )}
      </div>
    </div>
  );
}
