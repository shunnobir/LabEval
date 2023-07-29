import { useState } from "react";

import mdParser from "./mdParser";

export default function MdEditor({ value, onChange }) {
  const [active, setActive] = useState(0);

  return (
    <div className="markdown-editor-frame border border-solid border-slate-300 rounded-[5px]">
      <div className="toolbar flex flex-row border-b border-solid border-slate-300 h-14 p-2 items-center">
        <div className="button-group flex flex-row border border-solid border-slate-300 rounded-[8px] h-8">
          <button
            className={
              "px-2 min-w-[4rem] text-sm rounded-l-[5px]" +
              (active === 0 ? " bg-blue-500 text-slate-50" : "")
            }
            onClick={() => setActive(0)}
          >
            Raw
          </button>
          <button
            className={
              "px-2 min-w-[2rem] text-sm rounded-r-[5px]" +
              (active === 1 ? " bg-blue-500 text-slate-50" : "")
            }
            onClick={() => setActive(1)}
          >
            Preview
          </button>
        </div>
      </div>
      <div className="editor-container flex flex-col">
        {active === 0 ? (
          <textarea
            className="labeval-markdown-editor p-2 min-h-[20rem] h-auto"
            value={value}
            onChange={onChange}
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
