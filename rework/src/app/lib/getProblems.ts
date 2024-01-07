import psql from "@/database.config";
import { Row, RowList } from "postgres";

export async function getProblems(): Promise<{
  problems?: RowList<Row[]>;
  ok: boolean;
}> {
  try {
    const res = await psql`select * from problems`;
    return { problems: res, ok: true };
  } catch (err) {
    return { problems: undefined, ok: false };
  }
}
