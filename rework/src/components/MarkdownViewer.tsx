"use client";

import { labevalMarkdownParser } from "@/markdown/mdParser";
import React, { useEffect } from "react";

function MarkdownViewer({
  str,
  className,
}: {
  str: string;
  className?: string;
}) {
  useEffect(() => {
    (window as any).MathJax?.typesetClear();
    (window as any).MathJax?.typeset();
    (window as any).MathJax?.startup.document.updateDocument();
  }, []);
  return <div className={className}>{labevalMarkdownParser(str)}</div>;
}

export default MarkdownViewer;