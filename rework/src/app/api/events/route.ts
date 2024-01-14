import psql from "@/database.config";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const event_id = req.nextUrl.searchParams.get("event_id");
  try {
    const res = await psql`select * 
    from events
    where event_id = ${event_id}
    order by create_date desc`;
    return NextResponse.json({ status: "success", event: res[0], ok: true });
  } catch (err) {
    return NextResponse.json({ status: "internal database error", ok: false });
  }
}
