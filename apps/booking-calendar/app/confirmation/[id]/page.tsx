import Link from "next/link";
import { DemoBanner, Card, Button } from "@portfolio/ui";
import { getBooking } from "@/lib/bookings";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function ConfirmationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const booking = await getBooking(id);
  if (!booking) notFound();

  const paymentNote =
    booking.paymentStatus === "stripe_test"
      ? "Stripe test stub flag is on — no live charge in this demo."
      : "Demo payment skipped — no card was charged.";

  return (
    <>
      <DemoBanner />
      <div className="pt-container" style={{ padding: "2rem 1.25rem 3rem" }}>
        <Card>
          <h1 style={{ marginTop: 0 }}>Booking confirmed</h1>
          <p style={{ color: "var(--pt-muted)" }}>Portfolio demo template — confirmation page only.</p>
          <ul style={{ lineHeight: 1.8 }}>
            <li>
              <strong>When:</strong>{" "}
              {new Date(booking.slotStart).toLocaleString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "2-digit",
              })}
            </li>
            <li>
              <strong>Name:</strong> {booking.name}
            </li>
            <li>
              <strong>Email:</strong> {booking.email}
            </li>
            <li>
              <strong>Reference:</strong> {booking.id.slice(0, 8)}
            </li>
            <li>
              <strong>Payment:</strong> {paymentNote}
            </li>
          </ul>
          <Link href="/" style={{ textDecoration: "none" }}>
            <Button variant="secondary">Book another slot</Button>
          </Link>
        </Card>
      </div>
    </>
  );
}
