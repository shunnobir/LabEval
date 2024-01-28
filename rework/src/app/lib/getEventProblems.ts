import psql from "@/database.config";
import { Row, RowList } from "postgres";

export async function getEventProblems(
  event_id: number
): Promise<{ problems?: RowList<Row[]>; ok: boolean }> {
  try {
    const res =
      await psql`select *, (select count(*) from solutions s where s.problem_id = p.problem_id) as "submissions"
    from problems p
    where p.event_id = ${event_id}
    order by p.problem_order`;
    return { problems: res, ok: true };
  } catch (err) {
    return { problems: undefined, ok: false };
  }
}
