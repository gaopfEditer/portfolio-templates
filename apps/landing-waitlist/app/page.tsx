import { DemoBanner } from "@portfolio/ui";
import { WaitlistForm } from "./components/WaitlistForm";

const benefits = [
  { title: "Ship faster", body: "Replace placeholder copy with your offer and launch in an afternoon." },
  { title: "Capture leads", body: "Posts to /api/lead or your webhook — mock mode works with zero env vars." },
  { title: "Deploy anywhere", body: "Next.js App Router, Vercel-ready. No paid APIs required for demos." },
];

const faqs = [
  {
    q: "Is this a real product?",
    a: "No. This is a portfolio demo template for freelancers to fork and customize for clients.",
  },
  {
    q: "Where do signups go?",
    a: "By default they are logged in mock mode. Set LEAD_WEBHOOK_URL to forward JSON to Zapier, Make, or your API.",
  },
  {
    q: "Can I change the design?",
    a: "Yes. Edit app/page.tsx and shared styles in packages/ui.",
  },
];

export default function Home() {
  return (
    <>
      <DemoBanner />
      <section className="hero pt-container">
        <p style={{ color: "var(--pt-muted)", fontWeight: 600, fontSize: "0.875rem", margin: 0 }}>
          T1 · landing-waitlist · Backlog A1, A10
        </p>
        <h1>Launch your membership waitlist without rebuilding the page every time</h1>
        <p style={{ color: "var(--pt-muted)", fontSize: "1.125rem", maxWidth: "36rem", margin: "0 auto 2rem" }}>
          A focused landing page with benefits, FAQ, and a waitlist form — built as a reusable portfolio demo
          template.
        </p>
        <WaitlistForm />
      </section>

      <section className="pt-container">
        <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>Why teams use this pattern</h2>
        <div className="benefits-grid">
          {benefits.map((b) => (
            <article key={b.title} style={{ padding: "1.25rem", background: "var(--pt-surface)", borderRadius: "var(--pt-radius)", border: "1px solid var(--pt-border)" }}>
              <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.0625rem" }}>{b.title}</h3>
              <p style={{ margin: 0, color: "var(--pt-muted)", fontSize: "0.9375rem" }}>{b.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="pt-container" style={{ maxWidth: "40rem" }}>
        <h2 style={{ textAlign: "center" }}>FAQ</h2>
        {faqs.map((f) => (
          <details key={f.q} className="faq-item" open={f.q.startsWith("Is")}>
            <summary>{f.q}</summary>
            <p style={{ color: "var(--pt-muted)", margin: "0.5rem 0 0" }}>{f.a}</p>
          </details>
        ))}
      </section>

      <footer style={{ padding: "2rem", textAlign: "center", color: "var(--pt-muted)", fontSize: "0.875rem" }}>
        Portfolio demo template · No testimonials or revenue claims
      </footer>
    </>
  );
}
