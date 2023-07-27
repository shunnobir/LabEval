import Layout from "@/components/Layout";
import { EventsCreateIcon } from "@/icons";

function EventBody() {
  return (
    <div className="event-body flex flex-col gap-8">
      <button className="bg-blue-500 hover:bg-blue-600 flex flex-row gap-2 ml-auto h-10 px-4 rounded-[5px] text-slate-50 items-center">
        <EventsCreateIcon height="24" width="24" color="#f8fafc" />{" "}
        <span> new event </span>
      </button>
      <div className="block1">
        <span className="text-2xl"> Ongoing Events </span>
      </div>
      <div className="block2">
        <span className="text-2xl"> Upcoming Events </span>
      </div>
      <div className="block3">
        <span className="text-2xl"> Past Events </span>
      </div>
    </div>
  );
}

export default function Events() {
  return (
    <div className="instructor-events animate-opacity">
      <Layout page={"events"}>
        <EventBody />
      </Layout>
    </div>
  );
}
