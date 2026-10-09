import { NextResponse } from "next/server";

export async function GET() {
  const hasWebhook = Boolean(process.env.DEMO_WEBHOOK_SECRET?.trim());
  return NextResponse.json({
    message: hasWebhook
      ? "Webhook secret present on server (DEMO_WEBHOOK_SECRET) — not exposed to the browser."
      : "Mock mode: configure DEMO_WEBHOOK_SECRET in env for production webhooks.",
    clientSecretsExposed: false,
  });
}
