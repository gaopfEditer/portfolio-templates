import { DemoBanner, Card } from "@portfolio/ui";
import { AuditNav } from "./components/AuditNav";

export default function OverviewPage() {
  return (
    <>
      <DemoBanner />
      <div className="pt-container" style={{ padding: "2rem 1.25rem 3rem" }}>
        <p style={{ color: "var(--pt-muted)", fontWeight: 600, fontSize: "0.875rem" }}>
          T4 · launch-audit-report · Backlog C5, C6
        </p>
        <h1 style={{ marginTop: 0 }}>Launch security audit demo</h1>
        <p style={{ color: "var(--pt-muted)", maxWidth: "42rem" }}>
          Compare an intentionally weak pre-launch page with a hardened version, then export a printable audit
          checklist for client conversations. All secrets shown here are fake tokens for teaching only.
        </p>
        <AuditNav />
        <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
          <Card>
            <h2 style={{ marginTop: 0, fontSize: "1.0625rem" }}>Before sandbox</h2>
            <p style={{ color: "var(--pt-muted)", fontSize: "0.9375rem" }}>
              Demonstrates unsafe patterns (XSS-prone rendering, exposed fake keys, missing headers guidance).
            </p>
          </Card>
          <Card>
            <h2 style={{ marginTop: 0, fontSize: "1.0625rem" }}>After sandbox</h2>
            <p style={{ color: "var(--pt-muted)", fontSize: "0.9375rem" }}>
              Escaped output, env-only configuration, and security headers middleware example.
            </p>
          </Card>
          <Card>
            <h2 style={{ marginTop: 0, fontSize: "1.0625rem" }}>Audit report</h2>
            <p style={{ color: "var(--pt-muted)", fontSize: "0.9375rem" }}>
              Printable HTML/Markdown-style checklist covering auth, CORS, headers, RLS, and webhooks.
            </p>
          </Card>
        </div>
      </div>
    </>
  );
}
