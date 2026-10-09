"use client";

import { Button } from "@portfolio/ui";

export function PrintHint() {
  return (
    <p style={{ color: "var(--pt-muted)", fontSize: "0.9375rem" }}>
      <Button variant="secondary" type="button" onClick={() => window.print()}>
        Print / Save as PDF
      </Button>
      <span style={{ marginLeft: "0.75rem" }}>Or use Ctrl/Cmd+P</span>
    </p>
  );
}
