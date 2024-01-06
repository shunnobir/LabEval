import React from "react";
import { Noto_Serif } from "next/font/google";
import { getProblem } from "@/app/lib/getProblem";
import dynamic from "next/dynamic";
const MarkdownViewer = dynamic(() => import("@/components/MarkdownViewer"), {
  ssr: false,
});

const notoSerif = Noto_Serif({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  fallback: ["serif"],
  preload: true,
});

type ProblemProps = {
  params: {
    problem_id: string;
  };
};

async function Problem({ params }: ProblemProps) {
  const { problem, ok } = await getProblem(params.problem_id);

  if (!ok) {
    return <div>Error</div>;
  }

  return (
    <div className={notoSerif.className + " problem flex gap-8"}>
      <div className="left flex flex-col flex-[2] items-center">
        <h2>{problem?.title}</h2>
        <span>time limit: {problem?.time_limit}s</span>
        <span>points: {problem?.points}</span>
        <MarkdownViewer str={problem?.statement as string} />
      </div>
      <div className="right flex flex-col flex-1"></div>
    </div>
  );
}

export default Problem;
