import { DemoBanner } from "@portfolio/ui";
import { AuditNav } from "../components/AuditNav";
import { BeforeDemoClient } from "../components/BeforeDemoClient";

export default function BeforePage() {
  return (
    <>
      <DemoBanner />
      <div className="pt-container" style={{ padding: "2rem 1.25rem 3rem" }}>
        <AuditNav />
        <div className="warning-panel">
          <strong>Teaching sandbox only.</strong> Patterns below are deliberately unsafe for demo. Tokens are fake
          (e.g. <code>pk_demo_NOT_REAL_7f3a</code>). Do not copy into production.
        </div>
        <h1 style={{ marginTop: 0 }}>Before: typical pre-audit launch page</h1>
        <p style={{ color: "var(--pt-muted)" }}>
          Missing security headers, client-side &quot;secret&quot;, and DOM XSS via unsanitized HTML insertion.
        </p>
        {/* Anti-pattern: fake secret in source for demo discussion */}
        <pre
          style={{
            background: "#1e293b",
            color: "#f8fafc",
            padding: "0.75rem",
            borderRadius: "var(--pt-radius)",
            fontSize: "0.8125rem",
            overflow: "auto",
          }}
        >
          {`// ANTI-PATTERN (demo): never ship API keys in client bundles
const STRIPE_PUBLISHABLE = "pk_demo_NOT_REAL_7f3a";
const INTERNAL_WEBHOOK = "whsec_demo_fake_idempotency_off";`}
        </pre>
        <BeforeDemoClient />
        <p style={{ fontSize: "0.875rem", color: "var(--pt-muted)", marginTop: "1.5rem" }}>
          Expected headers missing on this route: Content-Security-Policy, X-Frame-Options, Referrer-Policy.
        </p>
      </div>
    </>
  );
}
