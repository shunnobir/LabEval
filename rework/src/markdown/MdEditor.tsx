"use client";

import { KeyboardEventHandler, useEffect, useState } from "react";
import { Roboto_Mono } from "next/font/google";

import labevalMarkdownParser from "./mdParser";

const robotoMono = Roboto_Mono({
  weight: ["200", "300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

type MdEditorProps = {
  value: string;
  onChange: any;
};

export default function MdEditor({ value, onChange }: MdEditorProps) {
  const [active, setActive] = useState(0);
  const [caretPosition, setCaretPosition] = useState(value.length);
  const [tabInserted, setTabInserted] = useState(false);

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      let target = e.target as HTMLTextAreaElement;
      let start = target.selectionStart,
        end = target.selectionEnd;
      target.value =
        target.value.substring(0, start) +
        "    " +
        target.value.substring(end, target.value.length);
      onChange(target.value);
      target.focus();
      setCaretPosition(start + "    ".length);
      setTabInserted(true);
    } else {
      setTabInserted(false);
    }
  };

  useEffect(() => {
    if (tabInserted) return;
    let e = document.querySelector(
      ".labeval-markdown-editor"
    ) as HTMLTextAreaElement;
    if (e) setCaretPosition(e.selectionStart);
  }, [value, tabInserted]);

  useEffect(() => {
    let e = document.querySelector(
      ".labeval-markdown-editor"
    ) as HTMLTextAreaElement;
    if (e) e.selectionStart = e.selectionEnd = caretPosition;
    setTabInserted(false);
  }, [caretPosition]);

  useEffect(() => {
    (window as any).MathJax?.typesetClear();
    (window as any).MathJax?.typeset();
    (window as any).MathJax?.document?.updateDocument();
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
