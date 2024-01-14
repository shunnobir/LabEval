import React, { useEffect, useRef, useState } from "react";

function Popover({ content, tip }: { content: any; tip: any }) {
  const [showTip, setShowTip] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as HTMLDivElement)) setShowTip(false);
    };
    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, []);

  return (
    <div
      className="relative cursor-pointer"
      ref={ref}
      onClick={() => setShowTip((prev) => !prev)}
    >
      {content}
      {showTip ? (
        <div className="absolute z-[999] bg-white dark:bg-slate-950 border border-solid border-slate-300 dark:border-slate-800 shadow-[0_0_5px_rgba(0,0,0,0.3)] rounded-md w-40 text-sm sm:w-60 p-2">
          {tip}
        </div>
      ) : null}
    </div>
  );
}

export default Popover;
