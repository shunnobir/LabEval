import psql from "@/database.config";

export default async function handler(req, res) {
  let result;
  if (req.method === "GET") {
    if (req.query.type === "info") {
      result = await psql`select event_id, 
                                 title, 
                                 description,
                                 to_char(start_time, 'DD Month, YYYY HH:MI am') as "start_time", 
                                 to_char(end_time, 'DD Month, YYYY HH:MI am') as "end_time",
                                 user_id
                          from events
                          where event_id = ${req.query.event_id}`;
      res.status(200).json(result);
    } else if (req.query.type === "problem_list") {
      result = await psql`select problem_id,
                                 title,
                                 statement,
                                 points,
                                 time_limit
                          from problems
                          where event_id = ${req.query.event_id}`;
      res.status(200).json(result);
    } else if (req.query.type === "registration") {
      console.log(req.query);
      result = await psql`select 1 as "registered"
                            from participates
                            where event_id = ${req.query.event_id} and
                                  user_id = ${req.query.user_id}`;
      res.status(200).json(result.length > 0);
    }
  } else if (req.method === "POST") {
    if (req.query.type === "register") {
      console.log(req.query, req.body);
      await psql`insert into participates values ${psql(req.body)}`;
      res.status(200).json("Successfully registered");
    }
  }
}
