import React from "react";

function Separator({ className }: { className?: string }) {
  return <div className={className + " h-[1px] bg-zinc-800"}></div>;
}

export default Separator;
