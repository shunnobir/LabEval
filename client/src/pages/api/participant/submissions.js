import psql from "@/database.config";

export default async function handler(req, res) {
  let result;
  try {
  if (req.method === "POST") { 
    result = await psql`select *
                        from submissions s JOIN problems p ON s.problem_id = p.problem_id
                        where s.user_id = ${req.body.user_id}
                        order by s.submission_time desc`;
    res.status(200).json({ submissions: result, status: "success" });
  }
  } catch (err) {
    res.status(200).json({ status: "Database internal error" });
  }
}
