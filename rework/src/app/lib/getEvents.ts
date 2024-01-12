import psql from "@/database.config";

export async function getEvents() {
  try {
    const res = await psql`select e.*, 
                        (select count(user_id)
                         from registrations p 
                         where p.event_id = e.event_id) as "participants" 
                 from events e
                 order by e.start_time desc`;
    return { events: res, ok: true };
  } catch (err) {
    console.error(err);
    return { events: [], ok: false };
  }
}
