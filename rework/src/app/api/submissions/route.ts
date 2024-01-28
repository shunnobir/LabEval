import psql from "@/database.config";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  if (searchParams.get("solution_id")) {
    const res = await getSubmission(searchParams.get("solution_id"));
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
  } else if (searchParams.get("user_id")) {
    const res = await getAllSubmissions(searchParams.get("user_id"));
    return NextResponse.json({
      status: "successfully submissions retrieved",
      submissions: res,
      ok: true,
    });
  }
}

async function getSubmission(solution_id: string | null) {
  try {
    return await psql`select *
    from solutions s JOIN problems p on s.problem_id = p.problem_id
    where s.solution_id = ${solution_id}`;
  } catch (err) {
    return [];
  }
}

async function getAllSubmissions(user_id: string | null) {
  try {
    return await psql`select *
    from solutions s JOIN problems p on s.problem_id = p.problem_id
    where s.user_id = ${user_id}
    order by s.submission_time desc`;
  } catch (err) {
    return [];
  }
}
