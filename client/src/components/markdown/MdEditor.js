import { useState } from "react";
import { Roboto_Mono } from "next/font/google";

import mdParser from "./mdParser";

const robotoMono = Roboto_Mono({
  weight: ["200", "300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export default function MdEditor({ value, onChange }) {
  const [active, setActive] = useState(0);

  return (
    <div className="markdown-editor-frame rounded-[5px]">
      <div className="toolbar flex flex-row h-10 items-end">
        <div className="button-group flex flex-row border border-solid border-slate-300 border-b-[0px] rounded-t-[8px] h-10">
          <button
            className={
              "px-2 min-w-[4rem] text-sm rounded-tl-[5px]" +
              (active === 0 ? " bg-blue-500 text-slate-50" : "")
            }
            onClick={() => setActive(0)}
          >
            Raw
          </button>
          <button
            className={
              "px-2 min-w-[2rem] text-sm rounded-tr-[5px]" +
              (active === 1 ? " bg-blue-500 text-slate-50" : "")
            }
            onClick={() => setActive(1)}
          >
            Preview
          </button>
        </div>
      </div>
      <div className="editor-container flex flex-col border border-solid border-slate-300">
        {active === 0 ? (
          <textarea
            className={
              robotoMono.className +
              " labeval-markdown-editor p-2 min-h-[20rem] h-auto"
            }
            value={value}
            onChange={onChange}
            placeholder="Description..."
          />
        ) : (
          <div className="labeval-markdown-preview-content h-[20rem] overflow-y-auto">
            {mdParser(value)}
          </div>
        )}
      </div>
    </div>
  );
}
