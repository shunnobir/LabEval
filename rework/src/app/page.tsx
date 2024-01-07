import MarkdownViewer from "@/components/MarkdownViewer";
import { getEvents } from "./lib/getEvents";
import { labevalMarkdownParser } from "@/markdown/mdParser";
import { formatDistance } from "date-fns";
import Link from "next/link";
import Button from "@/components/Button";
import Posts from "@/components/Posts";

export default async function Home() {
  const { events, ok } = await getEvents();

  if (!ok) {
    return <main>error</main>;
  }

  return <Posts events={events} ok={ok} />;
}
