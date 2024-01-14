import { getEvents } from "./lib/getEvents";
import Posts from "@/components/Posts";
import getUser from "./lib/getUser";

export default async function Home() {
  const { events, ok, status } = await getEvents();

  return <Posts events={events} ok={ok} status={status} />;
}
