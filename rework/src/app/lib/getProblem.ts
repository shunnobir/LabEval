import psql from "@/database.config";
import { Row, RowList } from "postgres";

export async function getProblem(
  problem_id: string
): Promise<{ problem?: Row; ok: boolean }> {
  try {
    const res = await psql`select * 
    from problems
    where problem_id = ${problem_id}`;
    return { problem: res[0], ok: true };
  } catch (err) {
    return { problem: undefined, ok: false };
  }
}
