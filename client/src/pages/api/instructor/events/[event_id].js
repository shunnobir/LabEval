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
    } else if (req.query.type === "problem_list") {
      result = await psql`select problem_id,
                                 title,
                                 statement,
                                 points,
                                 time_limit
                          from problems
                          where event_id = ${req.query.event_id}`;
    }
    res.status(200).json(result);
  } else if (req.method === "POST") {
    if (req.query.type === "create_problem") {
      let problem = { ...req.body };
      await psql`insert into problems
                      values (${problem.problem_id},
                              ${problem.title},
                              ${problem.statement},
                              ${problem.points},
                              ${problem.time_limit},
                              ${req.query.event_id})
      `;
      res.status(200).json("Successfully Created");
    } else if (req.query.type === "create_testcase") {
      let testcase = { ...req.body };
      await psql`insert into testcases
                        values (${testcase.testcase_id},
                                ${testcase.input_file},
                                ${testcase.output_file},
                                ${testcase.input_content},
                                ${testcase.output_content},
                                ${testcase.input_size},
                                ${testcase.output_size},
                                ${testcase.is_sample},
                                ${testcase.problem_id})
      `;
    }
  } else if (req.method === "DELETE") {
    await psql`delete from problems where problem_id = ${req.query.problem_id}`;
    res.status(200).json("Successfully deleted");
  }
}
