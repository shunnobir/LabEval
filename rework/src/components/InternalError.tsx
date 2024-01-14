import React from "react";

function InternalError({ status }: { status?: string }) {
  return (
    <main className="w-full h-full flex flex-col items-center justify-center">
      <span className="first-line:capitalize text-4xl font-bold">
        ❌ {status || "Internal Database Error"}{" "}
      </span>
      <span>
        Make sure your database is connected internet connection is stable
      </span>
    </main>
  );
}

export default InternalError;
