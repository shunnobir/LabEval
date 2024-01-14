import psql from "@/database.config";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const res = await psql`select *
                      from solutions s JOIN problems p on s.problem_id = p.problem_id
                      where s.solution_id = ${searchParams.get("solution_id")}`;
  if (res.length === 0) {
    return NextResponse.json({
      status: "invalid solution id",
      ok: false,
    });
  }
  return NextResponse.json({
    status: "success",
    submission: res[0],
    ok: true,
  });
}
