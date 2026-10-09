"use client";

import { useEffect, useState } from "react";
import { Input, Label, Button } from "@portfolio/ui";

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function AfterDemoClient() {
  const [bio, setBio] = useState("We ship secure defaults.");
  const [safePreview, setSafePreview] = useState("");
  const [configHint, setConfigHint] = useState("Loading…");

  useEffect(() => {
    fetch("/api/demo-config")
      .then((r) => r.json())
      .then((d: { message?: string }) => setConfigHint(d.message ?? "Configured via server env"))
      .catch(() => setConfigHint("Server env only — no client secrets"));
  }, []);

  function renderSafe() {
    setSafePreview(escapeHtml(bio));
  }

  return (
    <section>
      <h2 style={{ fontSize: "1.125rem" }}>Profile preview (escaped)</h2>
      <p style={{ color: "var(--pt-muted)", fontSize: "0.875rem" }}>
        Same XSS payload renders as harmless text:{" "}
        <code>{escapeHtml("<img src=x onerror=alert(1)>")}</code>
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", maxWidth: "28rem" }}>
        <div>
          <Label htmlFor="bio-safe">Bio (text only)</Label>
          <Input id="bio-safe" value={bio} onChange={(e) => setBio(e.target.value)} />
        </div>
        <Button onClick={renderSafe}>Render bio (escaped)</Button>
      </div>
      <div
        style={{
          marginTop: "1rem",
          padding: "1rem",
          border: "1px solid var(--pt-border)",
          borderRadius: "var(--pt-radius)",
          background: "var(--pt-surface)",
        }}
      >
        <p style={{ margin: 0, fontSize: "0.875rem", color: "var(--pt-muted)" }}>{configHint}</p>
        {safePreview && (
          <p style={{ marginTop: "0.75rem", marginBottom: 0 }} dangerouslySetInnerHTML={{ __html: safePreview }} />
        )}
      </div>
    </section>
  );
}
