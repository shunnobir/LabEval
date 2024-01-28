import psql from "@/database.config";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const solution_id = searchParams.get("solution_id") as string;

  let solution;
  try {
    solution = await psql`select * from 
                          solutions
                          where solution_id = ${solution_id}`;
  } catch (err) {
    return NextResponse.json({ status: "internal database error", ok: false });
  }

  let solutions;
  try {
    solutions = await psql`select *
                           from solutions
                           where problem_id = ${solution[0].problem_id}`;
  } catch (err) {
    return NextResponse.json({ status: "internal database error", ok: false });
  }

  return NextResponse.json({ status: "success", solutions, ok: true });
}
