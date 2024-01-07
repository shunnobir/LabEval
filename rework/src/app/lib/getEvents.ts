import psql from "@/database.config";

export async function getEvents() {
  try {
    const res = await psql`select e.*, 
                        (select count(user_id) f
                         from registrations p 
                         where p.event_id = e.event_id) as "participants" 
                 from events e
                 order by e.create_date desc`;
    return { events: res, ok: true };
  } catch (err) {
    return { events: [], ok: false };
  }
}