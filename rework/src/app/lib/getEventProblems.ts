import psql from "@/database.config";
import { Row, RowList } from "postgres";

export async function getEventProblems(
  event_id: number
): Promise<{ problems?: RowList<Row[]>; ok: boolean }> {
  try {
    const res = await psql`select *
    from problems
    where event_id = ${event_id}`;
    return { problems: res, ok: true };
  } catch (err) {
    return { problems: undefined, ok: false };
  }
}
