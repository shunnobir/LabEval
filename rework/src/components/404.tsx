import Image from "next/image";
import React from "react";
import Link from "next/link";

export default function Page404() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <Image src={"/page404.png"} width="350" height="350" alt="404" />
      {/* <span className="text-9xl font-bold">404</span> */}
      <span className="text-lg">
        Page could not be found❗Visit{" "}
        <Link href="/" className="text-sky-600 font-semibold">
          Home
        </Link>
      </span>
      <span className="absolute right-20 bottom-20">
        <Link href="https://storyset.com/web">
          Web illustrations by{" "}
          <span className="text-sky-600 font-bold">Storyset</span>
        </Link>
      </span>
    </div>
  );
}
