import { useEffect, useState } from "react";
import { Roboto_Mono } from "next/font/google";

import mdParser, { labevalMarkdownParser } from "./mdParser";

const robotoMono = Roboto_Mono({
  weight: ["200", "300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export default function MdEditor({ value, onChange }) {
  const [active, setActive] = useState(0);
  const [caretPosition, setCaretPosition] = useState(value.length);
  const [tabInserted, setTabInserted] = useState(false);

  const handleOnKeyDown = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      let start = e.target.selectionStart,
        end = e.target.selectionEnd;
      e.target.value =
        e.target.value.substring(0, start) +
        "    " +
        e.target.value.substring(end, e.target.value.length);
      onChange(e.target.value);
      e.target.focus();
      setCaretPosition(start + "    ".length);
      setTabInserted(true);
    } else {
      setTabInserted(false);
    }
  };

  useEffect(() => {
    if (tabInserted) return;
    let e = document.querySelector(".labeval-markdown-editor");
    if (e) setCaretPosition(e.selectionStart);
  }, [value]);

  useEffect(() => {
    let e = document.querySelector(".labeval-markdown-editor");
    if (e) e.selectionStart = e.selectionEnd = caretPosition;
    setTabInserted(false);
  }, [caretPosition]);

  useEffect(() => {
    window.MathJax?.typesetClear();
    window.MathJax?.typeset();
    window.MathJax?.document?.updateDocument();
  }, [active]);

  return (
    <div className="markdown-editor-frame rounded-[5px] h-full flex flex-col items-stretch">
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
      <div className="editor-container flex flex-col border border-solid border-slate-300 flex-grow items-stretch">
        {active === 0 ? (
          <textarea
            className={
              robotoMono.className +
              " labeval-markdown-editor p-2 min-h-[20rem] flex-grow"
            }
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleOnKeyDown}
            placeholder="Type..."
          />
        ) : (
          <div className="labeval-markdown-preview-content h-[20rem] overflow-y-auto p-2 flex-grow">
            {labevalMarkdownParser(value)}
          </div>
        )}
      </div>
    </div>
  );
}
