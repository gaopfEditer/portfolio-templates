"use client";

import { useState } from "react";
import { Button, Input, Label } from "@portfolio/ui";

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name }),
      });
      const data = (await res.json()) as { ok?: boolean; message?: string; mode?: string };
      if (!res.ok) throw new Error(data.message ?? "Request failed");
      setStatus("success");
      setMessage(data.message ?? "You are on the list.");
      setEmail("");
      setName("");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (status === "success") {
    return (
      <div className="success-box" role="status">
        <strong>Thank you.</strong>
        <p style={{ margin: "0.5rem 0 0" }}>{message}</p>
        <p style={{ margin: "0.75rem 0 0", fontSize: "0.875rem", opacity: 0.9 }}>
          Mock signup recorded locally — configure LEAD_WEBHOOK_URL for production forwarding.
        </p>
        <Button variant="ghost" style={{ marginTop: "1rem" }} onClick={() => setStatus("idle")}>
          Join another email
        </Button>
      </div>
    );
  }

  return (
    <form className="waitlist-form" onSubmit={onSubmit}>
      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Alex" />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />
      </div>
      {status === "error" && (
        <p role="alert" style={{ color: "var(--pt-danger)", margin: 0, fontSize: "0.875rem" }}>
          {message}
        </p>
      )}
      <Button type="submit" disabled={status === "loading"} style={{ width: "100%" }}>
        {status === "loading" ? "Joining…" : "Join the waitlist"}
      </Button>
    </form>
  );
}
