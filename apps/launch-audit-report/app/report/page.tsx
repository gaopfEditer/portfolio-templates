import { DemoBanner } from "@portfolio/ui";
import { AuditNav } from "../components/AuditNav";
import { PrintHint } from "../components/PrintHint";
import { CHECKLIST } from "@/lib/checklist";

export default function ReportPage() {
  const date = new Date().toISOString().slice(0, 10);

  return (
    <>
      <DemoBanner />
      <div className="pt-container-wide" style={{ padding: "2rem 1.25rem 3rem" }}>
        <div className="no-print">
          <AuditNav />
          <PrintHint />
        </div>

        <article id="audit-report">
          <header style={{ borderBottom: "2px solid var(--pt-text)", paddingBottom: "1rem" }}>
            <p style={{ margin: 0, fontSize: "0.875rem", color: "var(--pt-muted)" }}>
              Portfolio demo template · Launch audit report
            </p>
            <h1 style={{ margin: "0.25rem 0 0" }}>Pre-launch security & readiness review</h1>
            <p style={{ margin: "0.5rem 0 0", color: "var(--pt-muted)" }}>
              Report date: {date} · Project: [Client name TBD] · Assessor: [Your name]
            </p>
          </header>

          <section style={{ marginTop: "1.5rem" }}>
            <h2>Executive summary</h2>
            <p style={{ color: "var(--pt-muted)" }}>
              This template documents common gaps found in early launches (authentication, transport security,
              headers, data access, and webhook handling). Replace bracketed fields when delivering a real client
              audit. No fabricated metrics or revenue claims are included.
            </p>
          </section>

          <section style={{ marginTop: "1.5rem" }}>
            <h2>Findings checklist</h2>
            <ul className="checklist">
              {CHECKLIST.map((item) => (
                <li key={item.id}>
                  <span aria-hidden>{item.status === "pass" ? "☑" : item.status === "fail" ? "☐" : "◐"}</span>
                  <div>
                    <strong>{item.title}</strong>
                    <p style={{ margin: "0.25rem 0 0", color: "var(--pt-muted)", fontSize: "0.9375rem" }}>
                      {item.note}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section style={{ marginTop: "1.5rem" }}>
            <h2>Before / after narrative</h2>
            <p style={{ color: "var(--pt-muted)" }}>
              Use the <code>/before</code> and <code>/after</code> routes in this app to walk stakeholders through
              XSS, secret handling, and header baselines. Link to your hardened branch or deployment in a real
              engagement.
            </p>
          </section>

          <section style={{ marginTop: "1.5rem" }}>
            <h2>Markdown export (copy for Notion/GitHub)</h2>
            <pre
              style={{
                background: "#f1f5f9",
                padding: "1rem",
                borderRadius: "var(--pt-radius)",
                fontSize: "0.8125rem",
                overflow: "auto",
                whiteSpace: "pre-wrap",
              }}
            >
              {CHECKLIST.map((c) => `- [${c.status === "pass" ? "x" : " "}] **${c.title}** — ${c.note}`).join("\n")}
            </pre>
          </section>
        </article>

        <p className="no-print" style={{ marginTop: "2rem", color: "var(--pt-muted)", fontSize: "0.875rem" }}>
          Print this page from the browser to generate a PDF deliverable.
        </p>
      </div>
    </>
  );
}
