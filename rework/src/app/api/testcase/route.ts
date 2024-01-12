import psql, { psql2 } from "@/database.config";
import { NextRequest, NextResponse } from "next/server";
import generateId from "@/app/generateId";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const problem_id = await psql`select problem_id 
                                  from problems
                                  where problem_order = ${body.problem_order} and
                                        event_id = ${body.event_id}`;

    if (problem_id.length === 0) {
      return NextResponse.json({
        status: "trying to add testcase to non-existing problem",
        ok: false,
      });
    }

    const testcase = {
      testcase_id: generateId(20),
      input_file: body.input_file,
      output_file: body.output_file,
      input_content: body.input_content,
      output_content: body.output_content,
      input_size: body.input_size,
      output_size: body.output_size,
      is_sample: body.is_sample,
      problem_id: problem_id[0].problem_id,
    };

    await psql`insert into testcases
                values ${psql(testcase)}`;
    if (process.env.NODE_ENV === "development") {
      await psql2`insert into testcases
                  values ${psql(testcase)}`;
    }
    return NextResponse.json({
      status: "testcase added successfuly",
      ok: true,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ status: "internal database error", ok: false });
  }
}

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const problem = await psql`select problem_id 
                                      from problems
                                      where problem_order = ${searchParams.get(
                                        "order"
                                      )} and
                                          event_id = ${searchParams.get(
                                            "event_id"
                                          )}`;
    const res = await psql`select * 
                           from testcases
                           where problem_id = ${problem[0].problem_id}`;
    return NextResponse.json({ status: "success", testcases: res, ok: true });
  } catch (err) {
    return NextResponse.json({ status: "internal database error", ok: false });
  }
}
