"use client";

import { useMemo, useState } from "react";
import { Button, Input, Label, Card } from "@portfolio/ui";
import { useRouter } from "next/navigation";

type SlotInfo = { key: string; label: string; dayIndex: number };

export function WeekCalendar({
  weekStartIso,
  bookedKeys,
}: {
  weekStartIso: string;
  bookedKeys: string[];
}) {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const weekStart = useMemo(() => new Date(weekStartIso), [weekStartIso]);

  const { slotsByDay, dayLabels } = useMemo(() => {
    const labels: string[] = [];
    const byDay: SlotInfo[][] = [[], [], [], [], []];
    for (let day = 0; day < 5; day++) {
      const d = new Date(weekStart);
      d.setDate(d.getDate() + day);
      labels.push(
        d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })
      );
      for (let hour = 9; hour < 17; hour++) {
        for (const minute of [0, 30]) {
          const start = new Date(d);
          start.setHours(hour, minute, 0, 0);
          const key = start.toISOString();
          const label = start.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
          byDay[day].push({ key, label, dayIndex: day });
        }
      }
    }
    return { slotsByDay: byDay, dayLabels: labels };
  }, [weekStart]);

  const booked = useMemo(() => new Set(bookedKeys), [bookedKeys]);

  async function confirmBooking(e: React.FormEvent) {
    e.preventDefault();
    if (!selected) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slotStart: selected, name, email }),
      });
      const data = (await res.json()) as { ok?: boolean; bookingId?: string; message?: string };
      if (!res.ok || !data.bookingId) throw new Error(data.message ?? "Booking failed");
      router.push(`/confirmation/${data.bookingId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Booking failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="calendar-grid" role="grid" aria-label="Available time slots this week">
        {dayLabels.map((label, dayIndex) => (
          <div key={label} className="day-col">
            <div className="day-label">{label}</div>
            {slotsByDay[dayIndex].map((slot) => {
              const taken = booked.has(slot.key);
              const isSelected = selected === slot.key;
              return (
                <button
                  key={slot.key}
                  type="button"
                  className={`slot-btn${isSelected ? " selected" : ""}`}
                  disabled={taken}
                  onClick={() => setSelected(slot.key)}
                  aria-pressed={isSelected}
                >
                  {taken ? "Booked" : slot.label}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {selected && (
        <Card style={{ marginTop: "1.5rem", maxWidth: "28rem" }}>
          <h2 style={{ marginTop: 0, fontSize: "1.125rem" }}>Confirm your slot</h2>
          <p style={{ color: "var(--pt-muted)", fontSize: "0.875rem" }}>
            {new Date(selected).toLocaleString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "2-digit",
            })}
          </p>
          <form onSubmit={confirmBooking} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <div>
              <Label htmlFor="bk-name">Name</Label>
              <Input id="bk-name" required value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="bk-email">Email</Label>
              <Input
                id="bk-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {error && (
              <p role="alert" style={{ color: "var(--pt-danger)", margin: 0, fontSize: "0.875rem" }}>
                {error}
              </p>
            )}
            <Button type="submit" disabled={loading}>
              {loading ? "Booking…" : "Book appointment (demo payment skipped)"}
            </Button>
          </form>
        </Card>
      )}
    </>
  );
}
