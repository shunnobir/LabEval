import psql, { psql2 } from "@/database.config";
import { NextRequest, NextResponse } from "next/server";
import generateId from "@/app/generateId";

export async function POST(
  req: NextRequest,
  { params }: { params: { event_id: string } }
) {
  try {
    const body = await req.json();
    let prob = await psql`select * 
                          from problems
                          where event_id = ${params.event_id} and
                          problem_order = ${body.problem_order}`;
    if (prob.length !== 0) {
      return NextResponse.json({
        status: `problem ${body.problem_order} already exists`,
        ok: false,
      });
    }

    prob = {
      problem_id: generateId(20, true),
      ...body,
    };

    await psql`insert into problems values ${psql(prob)}`;
    if (process.env.NODE_ENV === "development") {
      await psql2`insert into problems values ${psql(prob)}`;
    }
    return NextResponse.json({
      status: "problem added successfully",
      ok: true,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ status: "internal database error", ok: false });
  }
}
