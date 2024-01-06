import psql from "@/database.config";

export async function getEvents() {
  try {
    const res = await psql`select * 
    from events
    order by create_date desc`;
    return { events: res, ok: true };
  } catch (err) {
    return { events: [], ok: false };
  }
}
