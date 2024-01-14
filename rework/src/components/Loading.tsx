import React from "react";
import Loader from "./Loader";

function Loading() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Loader style={{ width: "2.5rem", height: "2.5rem" }} />
    </div>
  );
}

export default Loading;
