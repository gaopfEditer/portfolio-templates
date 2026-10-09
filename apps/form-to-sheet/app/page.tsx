"use client";

import { useState } from "react";
import { DemoBanner, Button, Input, Label, Textarea, Card } from "@portfolio/ui";

export default function TestFormPage() {
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch("/api/submit", { method: "POST", body: data });
      const json = (await res.json()) as { ok?: boolean; message?: string };
      setResult(res.ok ? json.message ?? "OK" : json.message ?? "Error");
    } catch {
      setResult("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <DemoBanner />
      <div className="pt-container" style={{ padding: "2rem 1.25rem 3rem" }}>
        <p style={{ color: "var(--pt-muted)", fontWeight: 600, fontSize: "0.875rem" }}>
          T2 · form-to-sheet · Backlog A10
        </p>
        <h1 style={{ marginTop: 0 }}>Contact form test page</h1>
        <p style={{ color: "var(--pt-muted)", maxWidth: "40rem" }}>
          POSTs to <code>/api/submit</code>. With no env vars, submissions append to{" "}
          <code>data/submissions.json</code> and a Slack-style payload is logged to the console.
        </p>

        <Card style={{ marginTop: "1.5rem" }}>
          <form className="form-grid" onSubmit={onSubmit}>
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" required placeholder="Jordan Lee" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required placeholder="jordan@example.com" />
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" name="message" required placeholder="Tell us about your project…" />
            </div>
            <div className="form-row-two">
              <div>
                <Label htmlFor="budget">Budget (optional)</Label>
                <Input id="budget" name="budget" placeholder="$5k–$10k" />
              </div>
              <div>
                <Label htmlFor="timeline">Timeline (optional)</Label>
                <Input id="timeline" name="timeline" placeholder="Q2 launch" />
              </div>
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? "Sending…" : "Submit"}
            </Button>
          </form>
          {result && (
            <p role="status" style={{ marginTop: "1rem", color: "var(--pt-success)" }}>
              {result}
            </p>
          )}
        </Card>
      </div>
    </>
  );
}
