import psql from "@/database.config";
import { Row, RowList } from "postgres";

export async function getProblem(
  order: string,
  event_id: number
): Promise<{ problem?: Row; ok: boolean }> {
  try {
    const res = await psql`select * 
    from problems
    where event_id = ${event_id} and
          problem_order = ${order}`;
    return { problem: res[0], ok: true };
  } catch (err) {
    return { problem: undefined, ok: false };
  }
}
