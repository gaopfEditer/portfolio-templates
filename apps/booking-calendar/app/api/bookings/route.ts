import { NextRequest, NextResponse } from "next/server";
import { createBooking } from "@/lib/bookings";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const body = (await req.json()) as { slotStart?: string; name?: string; email?: string };
  const name = body.name?.trim();
  const email = body.email?.trim();
  if (!body.slotStart || !name || !email) {
    return NextResponse.json({ ok: false, message: "slotStart, name, and email required" }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, message: "Invalid email" }, { status: 400 });
  }

  const result = await createBooking({ slotStart: body.slotStart, name, email });
  if ("error" in result) {
    return NextResponse.json({ ok: false, message: result.error }, { status: 409 });
  }

  return NextResponse.json({ ok: true, bookingId: result.booking.id, booking: result.booking });
}
