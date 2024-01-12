"use client";

import { KeyboardEventHandler, useEffect, useState } from "react";
import { JetBrains_Mono, Noto_Serif } from "next/font/google";

import labevalMarkdownParser from "./mdParser";
import MarkdownViewer from "@/components/MarkdownViewer";

const jetbrainsMono = JetBrains_Mono({
  weight: ["200", "300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

// const notoSerif = Noto_Serif({
//   weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
//   style: ["normal", "italic"],
//   subsets: ["latin"],
//   fallback: ["serif"],
//   preload: true,
// });

type MdEditorProps = {
  value: string;
  onChange: any;
  className?: string;
  height?: string;
};

export default function MdEditor({
  value,
  onChange,
  className,
  height,
}: MdEditorProps) {
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
        <div
          className="button-group flex flex-row border border-solid border-zinc-800 border-b-transparent rounded-t-md h-10"
          style={{ borderBottomWidth: "0" }}
        >
          <button
            className={
              "px-4 text-sm" +
              (active === 0 ? " bg-zinc-800 text-zinc-100" : "")
            }
            style={{
              borderTopLeftRadius: "6px",
            }}
            onClick={() => setActive(0)}
          >
            Raw
          </button>
          <button
            className={
              "px-2 min-w-[2rem] text-sm" +
              (active === 1 ? " bg-zinc-800 text-slate-50" : "")
            }
            style={{
              borderTopRightRadius: "6px",
            }}
            onClick={() => setActive(1)}
          >
            Preview
          </button>
        </div>
      </div>
      <div
        className="editor-container flex flex-col border border-solid border-zinc-800 flex-grow h-auto items-stretch"
        style={{
          borderBottomLeftRadius: "6px",
          borderBottomRightRadius: "6px",
          WebkitBorderTopRightRadius: "6px",
          height: height ? height : "20rem",
        }}
      >
        {active === 0 ? (
          <textarea
            className={
              jetbrainsMono.className +
              " labeval-markdown-editor bg-transparent rounded-md p-2 flex-grow overflow-auto flex-1"
            }
            style={{
              padding: "0.5rem",
              borderTopLeftRadius: "0",
            }}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleOnKeyDown}
            placeholder="Type markdown"
          />
        ) : (
          <MarkdownViewer
            str={value}
            className={"flex-1 p-2 h-80 overflow-auto"}
            style={{
              paddingInline: "1rem",
              paddingBottom: "1rem",
            }}
          />
        )}
      </div>
    </div>
  );
}
