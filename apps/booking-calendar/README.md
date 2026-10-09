# booking-calendar (T3)

**Portfolio demo template** — week view calendar, 30-minute slots Mon–Fri, confirmation page, JSON persistence.

| Backlog | A3, B6 |
|---------|--------|

## Quick start

```bash
npm install
npm run dev:booking-calendar
```

Open [http://localhost:3003](http://localhost:3003).

## Demo path

1. Start the server.
2. Click an available slot in the week grid.
3. Enter name and email, confirm booking.
4. Land on `/confirmation/[id]` with “demo payment skipped” messaging.
5. Return home — booked slot shows as unavailable.

## Environment

| Variable | Default | Description |
|----------|---------|-------------|
| `ENABLE_STRIPE_TEST_STUB` | unset | Set to `true` to label payment as `stripe_test` (still no live charge) |

Bookings stored in `data/bookings.json` in mock mode.

## Deploy

Vercel root: `apps/booking-calendar`.
