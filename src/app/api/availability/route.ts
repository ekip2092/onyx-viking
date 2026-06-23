import { NextResponse } from "next/server";
import { getAvailability } from "@/lib/googleCalendar";

// GET /api/availability?date=YYYY-MM-DD -> per-window availability.
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date");
  if (!date) return NextResponse.json({ error: "date required" }, { status: 400 });
  try {
    const windows = await getAvailability(date);
    return NextResponse.json({ windows });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
