import { NextRequest, NextResponse } from "next/server";
import {
  appendGoogleSheet,
  appendMockSubmission,
  sheetsConfigured,
  notifySlack,
} from "@/lib/storage";

export const runtime = "nodejs";

type Body = {
  name?: string;
  email?: string;
  message?: string;
  budget?: string;
  timeline?: string;
};

export async function POST(req: NextRequest) {
  let body: Body;
  const contentType = req.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    body = (await req.json()) as Body;
  } else if (contentType.includes("application/x-www-form-urlencoded")) {
    const form = await req.formData();
    body = {
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      message: String(form.get("message") ?? ""),
      budget: String(form.get("budget") ?? ""),
      timeline: String(form.get("timeline") ?? ""),
    };
  } else {
    return NextResponse.json({ ok: false, message: "Unsupported content type" }, { status: 415 });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const message = body.message?.trim() ?? "";
  if (!name || !email || !message) {
    return NextResponse.json({ ok: false, message: "name, email, and message are required" }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, message: "Invalid email" }, { status: 400 });
  }

  const row = await appendMockSubmission({
    name,
    email,
    message,
    budget: body.budget?.trim(),
    timeline: body.timeline?.trim(),
  });

  let storageMode: "mock" | "sheets" = "mock";
  if (sheetsConfigured()) {
    try {
      await appendGoogleSheet(row);
      storageMode = "sheets";
    } catch (err) {
      console.error("[form-to-sheet sheets error]", err);
      return NextResponse.json(
        { ok: false, message: "Failed to write to Google Sheets", detail: String(err) },
        { status: 502 }
      );
    }
  }

  let slackMode: "mock" | "sent" | "skipped" = "skipped";
  try {
    slackMode = await notifySlack(row);
  } catch (err) {
    console.error("[form-to-sheet slack error]", err);
  }

  return NextResponse.json({
    ok: true,
    id: row.id,
    storageMode,
    slackMode,
    message:
      storageMode === "sheets"
        ? "Saved to Google Sheets (and local mock copy)."
        : "Saved to local JSON mock (see data/submissions.json).",
  });
}
