import psql from "@/database.config";
import { Event } from "../../../types";

export async function getEvent(event_id: number) {
  try {
    const res = await psql`select * 
    from events
    where event_id = ${event_id}
    order by create_date desc`;
    return { event: res[0] as Event, ok: true };
  } catch (err) {
    return { event: undefined, ok: false };
  }
}
