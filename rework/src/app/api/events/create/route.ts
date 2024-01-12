import { NextRequest, NextResponse } from "next/server";
import psql, { psql2 } from "@/database.config";
import generateId from "@/app/generateId";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const values = {
    ...body,
  };
  try {
    await psql`insert into events (title, 
                                  description,
                                  start_time,
                                  end_time,
                                  isopen,
                                  creator_controlled,
                                  user_id,
                                  create_date)
                      values ${psql(values)}`;
    if (process.env.NODE_ENV === "development") {
      await psql2`insert into events (title, 
                                  description,
                                  start_time,
                                  end_time,
                                  isopen,
                                  creator_controlled,
                                  user_id,
                                  create_date)
                      values ${psql(values)}`;
    }
    return NextResponse.json({ status: "event created", ok: true });
  } catch (err) {
    return NextResponse.json({ status: "internal database error", ok: false });
  }
}
