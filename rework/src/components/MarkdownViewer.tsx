"use client";

import labevalMarkdownParser from "@/markdown/mdParser";
import React, { useEffect } from "react";

function MarkdownViewer({
  str,
  className,
  style,
}: {
  str: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  useEffect(() => {
    (window as any).MathJax?.typesetClear();
    (window as any).MathJax?.typeset();
    (window as any).MathJax?.startup.document.updateDocument();
  }, []);
  return (
    <div className={className + " w-full"} style={style}>
      {labevalMarkdownParser(str)}
    </div>
  );
}

export default MarkdownViewer;
