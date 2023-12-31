import psql from "@/database.config";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const q = { ...req.query };
    let result;
    if (q.type === "past") {
      result = await psql`select e.event_id, 
                                 e.title, 
                                 to_char(e.start_time, 'DD Month, YYYY HH:MI am') as "start_time", 
                                 to_char(e.end_time, 'DD Month, YYYY HH:MI am') as "end_time"
                          from events e JOIN participates p ON e.event_id = p.event_id
                          where end_time < current_timestamp at time zone 'Asia/Dhaka' and p.user_id = ${q.user_id}
                          order by e.start_time`;
    } else if (q.type === "ongoing") {
      result = await psql`select event_id, 
                           title, 
                           to_char(start_time , 'DD Month, YYYY HH:MI am') as "start_time", 
                           to_char(end_time , 'DD Month, YYYY HH:MI am') as "end_time"
                          from events
                          where (((current_timestamp at time zone 'Asia/Dhaka' >= start_time) or
                                ((current_timestamp + interval '6 hours') at time zone 'Asia/Dhaka' >= start_time)) and
                                (current_timestamp at time zone 'Asia/Dhaka' <= end_time))
                          order by start_time`;
    } else if (q.type === "upcoming") {
      result = await psql`select event_id, 
                                 title, 
                                 to_char(start_time , 'DD Month, YYYY HH:MI am') as "start_time", 
                                 to_char(end_time , 'DD Month, YYYY HH:MI am') as "end_time"
                          from events
                          where (start_time  > (current_timestamp + interval '6 hours') at time zone 'Asia/Dhaka')
                          order by start_time`;
    } else if (q.type === "info") {
      result = await psql`select event_id, 
                                 title, 
                                 description,
                                 to_char(start_time , 'DD Month, YYYY HH:MI am') as "start_time", 
                                 to_char(end_time , 'DD Month, YYYY HH:MI am') as "end_time",
                                 user_id
                          from events
                          where event_id = ${q.event_id}`;
    }
    res.status(200).json(result);
  }
}
