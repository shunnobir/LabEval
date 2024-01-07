import { NextRequest, NextResponse } from "next/server";
import psql, { psql2 } from "@/database.config";
import generateId from "@/app/generateId";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const event_id = generateId(10, false);
  const values = {
    event_id,
    ...body,
  };
  try {
    await psql`insert into events values ${psql(values)}`;
    await psql2`insert into events values ${psql(values)}`;
    return NextResponse.json({ status: "event created", ok: true });
  } catch (err) {
    return NextResponse.json({ status: "internal database error", ok: false });
  }
}
