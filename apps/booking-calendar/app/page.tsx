import { DemoBanner } from "@portfolio/ui";
import { WeekCalendar } from "./components/WeekCalendar";
import { getWeekStart, listBookings } from "@/lib/bookings";

export const dynamic = "force-dynamic";

export default async function BookingPage() {
  const weekStart = getWeekStart();
  const bookings = await listBookings();
  const bookedKeys = bookings.map((b) => b.slotStart);

  return (
    <>
      <DemoBanner />
      <div className="pt-container-wide" style={{ padding: "2rem 1.25rem 3rem" }}>
        <p style={{ color: "var(--pt-muted)", fontWeight: 600, fontSize: "0.875rem" }}>
          T3 · booking-calendar · Backlog A3, B6
        </p>
        <h1 style={{ marginTop: 0 }}>Book a consultation</h1>
        <p style={{ color: "var(--pt-muted)", maxWidth: "42rem" }}>
          Pick an open 30-minute slot Monday–Friday, 9:00–17:00. Bookings persist to{" "}
          <code>data/bookings.json</code> in mock mode. No real Stripe charge — demo shows payment skipped unless{" "}
          <code>ENABLE_STRIPE_TEST_STUB=true</code>.
        </p>
        <WeekCalendar weekStartIso={weekStart.toISOString()} bookedKeys={bookedKeys} />
      </div>
    </>
  );
}
