import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

type LeadBody = { email?: string; name?: string };

export async function POST(req: NextRequest) {
  let body: LeadBody;
  try {
    body = (await req.json()) as LeadBody;
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid JSON" }, { status: 400 });
  }

  const email = body.email?.trim();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, message: "Valid email is required" }, { status: 400 });
  }

  const payload = {
    email,
    name: body.name?.trim() || "",
    source: "landing-waitlist",
    createdAt: new Date().toISOString(),
  };

  const webhook = process.env.LEAD_WEBHOOK_URL?.trim();
  if (webhook) {
    try {
      const whRes = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!whRes.ok) {
        return NextResponse.json(
          { ok: false, message: `Webhook returned ${whRes.status}` },
          { status: 502 }
        );
      }
      return NextResponse.json({
        ok: true,
        mode: "webhook",
        message: "You are on the list. We will be in touch soon.",
      });
    } catch {
      return NextResponse.json({ ok: false, message: "Webhook unreachable" }, { status: 502 });
    }
  }

  console.info("[landing-waitlist mock lead]", JSON.stringify(payload));
  return NextResponse.json({
    ok: true,
    mode: "mock",
    message: "You are on the list (demo mock — check server logs).",
  });
}
