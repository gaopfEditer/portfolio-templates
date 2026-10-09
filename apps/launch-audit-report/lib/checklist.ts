export type CheckItem = {
  id: string;
  title: string;
  note: string;
  status: "pass" | "fail" | "partial";
};

export const CHECKLIST: CheckItem[] = [
  {
    id: "auth",
    title: "Authentication & session handling",
    note: "Use httpOnly cookies or server sessions; avoid storing tokens in localStorage for sensitive apps.",
    status: "partial",
  },
  {
    id: "cors",
    title: "CORS & origin policy",
    note: "Restrict API routes to known front-end origins; avoid wildcard credentials in production.",
    status: "partial",
  },
  {
    id: "env",
    title: "Secrets & environment variables",
    note: "No API keys in client bundles; load from Vercel/host env; rotate demo keys before go-live.",
    status: "fail",
  },
  {
    id: "headers",
    title: "Security headers (CSP, XFO, nosniff)",
    note: "Apply via middleware or platform config; tune CSP for your analytics/scripts.",
    status: "partial",
  },
  {
    id: "xss",
    title: "XSS & output encoding",
    note: "Never assign user HTML to innerHTML; sanitize or render as text.",
    status: "fail",
  },
  {
    id: "rls",
    title: "Database RLS / authorization",
    note: "If using Supabase/Postgres, enable RLS policies per tenant; test horizontal privilege escalation.",
    status: "partial",
  },
  {
    id: "webhooks",
    title: "Webhook idempotency & signature verification",
    note: "Verify HMAC signatures; store event IDs to prevent duplicate side effects.",
    status: "partial",
  },
];
