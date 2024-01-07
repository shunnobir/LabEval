import { getEvents } from "./lib/getEvents";
import Posts from "@/components/Posts";
import getUser from "./lib/getUser";

export default async function Home() {
  const { events, ok } = await getEvents();

  if (!ok) {
    return <main>error</main>;
  }

  return <Posts events={events} ok={ok} />;
}
