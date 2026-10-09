"use client";

import { useState } from "react";
import { Input, Label, Button } from "@portfolio/ui";

/** Deliberately unsafe: renders user HTML with innerHTML for XSS demo. */
export function BeforeDemoClient() {
  const [nickname, setNickname] = useState("Guest");
  const [previewHtml, setPreviewHtml] = useState("<em>Hello</em>");

  function applyPreview() {
    const el = document.getElementById("before-xss-target");
    if (el) {
      el.innerHTML = previewHtml;
    }
  }

  return (
    <section style={{ marginTop: "1.5rem" }}>
      <h2 style={{ fontSize: "1.125rem" }}>Profile preview (vulnerable)</h2>
      <p style={{ color: "var(--pt-muted)", fontSize: "0.875rem" }}>
        Try: <code>&lt;img src=x onerror=alert('XSS-demo')&gt;</code> — runs in this sandbox only.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", maxWidth: "28rem" }}>
        <div>
          <Label htmlFor="nick">Display name</Label>
          <Input id="nick" value={nickname} onChange={(e) => setNickname(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="html">Bio HTML (unsanitized)</Label>
          <Input id="html" value={previewHtml} onChange={(e) => setPreviewHtml(e.target.value)} />
        </div>
        <Button onClick={applyPreview}>Render bio (unsafe innerHTML)</Button>
      </div>
      <div
        style={{
          marginTop: "1rem",
          padding: "1rem",
          border: "1px dashed #f87171",
          borderRadius: "var(--pt-radius)",
        }}
      >
        <p style={{ margin: 0 }}>
          Signed in as <span suppressHydrationWarning>{nickname}</span>
        </p>
        <div id="before-xss-target" style={{ marginTop: "0.5rem", color: "var(--pt-muted)" }}>
          (preview appears here)
        </div>
      </div>
    </section>
  );
}
