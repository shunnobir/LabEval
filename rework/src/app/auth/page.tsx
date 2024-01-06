"use client";

import Button from "@/components/Button";
import EyeInput from "@/components/EyeInput";
import Input from "@/components/Input";
import { LabEvalLogo } from "@/icons";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Auth() {
  const pathName = usePathname();
  const [isSignup, setIsSignup] = useState(true);
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("auth") === "signup") setIsSignup(true);
    else setIsSignup(false);
  }, [searchParams]);
  return (
    <div className="auth flex flex-col flex-1 gap-4 items-center justify-center">
      <div className="flex flex-col gap-4 items-center border border-solid border-zinc-700 px-10 py-20 rounded-md">
        <Link href="/">
          <LabEvalLogo width="180" />
        </Link>
        <span className="text-3xl">{isSignup ? "SIGNUP" : "LOGIN"}</span>
        <form className="mt-4 flex flex-col gap-6 w-4/5 sm:w-96">
          <Input type="text" placeholder="enter username" />
          {isSignup ? <Input type="text" placeholder="enter email" /> : null}
          <EyeInput placeholder="enter password" />
          <Button className="rounded-full py-2">
            {isSignup ? "Signup" : "Login"}
          </Button>
        </form>
        {isSignup ? (
          <span>
            Already have an account?{" "}
            <Link href="/auth?auth=login" className="text-blue-500 font-bold">
              Login
            </Link>
          </span>
        ) : (
          <span>
            {"Don't have an account? "}
            <Link href="/auth?auth=signup" className="text-blue-500 font-bold">
              Signup
            </Link>
          </span>
        )}
      </div>
    </div>
  );
}
