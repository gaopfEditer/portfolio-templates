import { DemoBanner } from "@portfolio/ui";
import { AuditNav } from "../components/AuditNav";
import { AfterDemoClient } from "../components/AfterDemoClient";

export default function AfterPage() {
  return (
    <>
      <DemoBanner />
      <div className="pt-container" style={{ padding: "2rem 1.25rem 3rem" }}>
        <AuditNav />
        <div className="ok-panel">
          <strong>Hardened demo.</strong> User content is escaped, secrets load from server env only, and{" "}
          <code>middleware.ts</code> sets baseline security headers on matching routes.
        </div>
        <h1 style={{ marginTop: 0 }}>After: launch-ready baseline</h1>
        <AfterDemoClient />
        <ul style={{ color: "var(--pt-muted)", fontSize: "0.9375rem", marginTop: "1.5rem" }}>
          <li>Auth: session cookies httpOnly (describe in report — not fully implemented in demo).</li>
          <li>CORS: restrict origins in API routes for production deploys.</li>
          <li>Webhooks: verify signatures + idempotency keys (see report checklist).</li>
        </ul>
      </div>
    </>
  );
}
