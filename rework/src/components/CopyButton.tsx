import { CopyIcon } from "@/icons";
import React from "react";
import { toast } from "sonner";

export default function CopyButton({
  className,
  content,
}: {
  className: string;
  content: string;
}) {
  return (
    <button
      className={
        className +
        " p-1 hover:bg-slate-700/30 rounded-md border border-solid border-slate-300 dark:border-slate-800"
      }
      onClick={() => {
        navigator.clipboard.writeText(content);
        toast.info("text copied to clipboard");
      }}
    >
      <CopyIcon />
    </button>
  );
}
