import psql from "@/database.config";
import { Row, RowList } from "postgres";

export async function getProblems(): Promise<{
  problems?: RowList<Row[]>;
  ok: boolean;
  status: string;
}> {
  try {
    const res = await psql`select p.* 
                          from problems p join
                                events e
                                on p.event_id = e.event_id
                          where e.isopen = true`;
    return { problems: res, status: "success", ok: true };
  } catch (err) {
    return {
      problems: undefined,
      status: "internal database error",
      ok: false,
    };
  }
}
