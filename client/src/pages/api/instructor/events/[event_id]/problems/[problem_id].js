import psql from "@/database.config";

export default async function handler(req, res) {
  let result;
  if (req.method === "GET") {
    result =
      await psql`select * from problems where problem_id = ${req.query.problem_id}`;
    res.status(200).json(result[0]);
  }
}
