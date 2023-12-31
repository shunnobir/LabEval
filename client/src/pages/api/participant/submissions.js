import psql from "@/database.config";

export default async function handler(req, res) {
  let result;
  try {
  if (req.method === "POST") { 
    if (req.query.type === "all") {
      result = await psql`select *
                          from submissions s JOIN problems p ON s.problem_id = p.problem_id
                          where s.user_id = ${req.body.user_id}
                          order by s.submission_time desc`;
      res.status(200).json({ submissions: result, status: "success" });
    } else if (req.query.type === "single") {
      result = await psql`select *
                          from submissions s JOIN 
                               (select problem_id, 
                                       title as "problem_title",
                                       event_id
                                from problems) p ON s.problem_id = p.problem_id JOIN
                                (select event_id,
                                        title as "event_title"
                                from events) e ON p.event_id = e.event_id
                          where s.submission_id = ${req.body.submission_id};`;
      console.log(result);
      res.json({ submission: result[0], status: "success" });
    }
  }
  } catch (err) {
    res.status(200).json({ status: "Database internal error" });
  }
}
