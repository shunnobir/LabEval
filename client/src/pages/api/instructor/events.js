import psql from "@/database.config";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const body = { ...req.body };
    try {
      await psql`insert into events values (${body.event_id}, ${body.title}, ${body.description}, to_timestamp(${body.start_time}, 'YYYY-MM-DD HH24:MI'), to_timestamp(${body.end_time}, 'YYYY-MM-DD HH24:MI'), ${body.user_id})`;
      res.status(200).json("created");
    } catch (err) {
      console.log(err);
      res.status(200).json("Invalid Data");
    }
  } else if (req.method === "GET") {
    const q = { ...req.query };
    console.log(q);
    let result;
    if (q.type === "past") {
      result = await psql`select event_id, 
                                 title, 
                                 to_char(start_time, 'DD Month, YYYY HH:MI am') as "start_time", 
                                 to_char(end_time, 'DD Month, YYYY HH:MI am') as "end_time"
                          from events
                          where end_time < current_timestamp and user_id = ${q.user_id}`;
    } else if (q.type === "ongoing") {
      result = await psql`select event_id, 
                           title, 
                           to_char(start_time, 'DD Month, YYYY HH:MI am') as "start_time", 
                           to_char(end_time, 'DD Month, YYYY HH:MI am') as "end_time"
                          from events
                          where current_timestamp + interval '5 hour' >= end_time and current_timestamp <= end_time and user_id = ${q.user_id}`;
    } else if (q.type === "upcoming") {
      result = await psql`select event_id, 
                                 title, 
                                 to_char(start_time, 'DD Month, YYYY HH:MI am') as "start_time", 
                                 to_char(end_time, 'DD Month, YYYY HH:MI am') as "end_time"
                          from events
                          where start_time > current_timestamp and user_id = ${q.user_id}`;
    } else if (q.type === "info") {
      result = await psql`select event_id, 
                                 title, 
                                 description,
                                 to_char(start_time, 'DD Month, YYYY HH:MI am') as "start_time", 
                                 to_char(end_time, 'DD Month, YYYY HH:MI am') as "end_time",
                                 user_id
                          from events
                          where event_id = ${q.event_id}`;
    }
    console.log(result);
    res.status(200).json(result);
  } else if (req.method === "DELETE") {
    let event_id = req.query.event_id;
    await psql`delete from events where event_id = ${event_id}`;
    res.status(200).json("deleted");
  }
}
