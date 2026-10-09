# landing-waitlist (T1)

**Portfolio demo template** — high-converting waitlist landing page with hero, benefits, FAQ, and signup form.

| Backlog | A1, A10 |
|---------|---------|

## Quick start

```bash
# from monorepo root
npm install
npm run dev:landing-waitlist
```

Open [http://localhost:3001](http://localhost:3001).

## Demo path (3–5 steps)

1. Run `npm run dev:landing-waitlist`.
2. Scroll the landing sections (hero, benefits, FAQ).
3. Submit the waitlist form with any email.
4. See mock success — check terminal for `[landing-waitlist mock lead]` JSON.
5. Optional: set `LEAD_WEBHOOK_URL` in `.env.local` to forward signups.

## Customize for a client

- Replace copy in `app/page.tsx`.
- Adjust colors in `packages/ui/src/styles.css`.
- Point `LEAD_WEBHOOK_URL` to Zapier/Make/Sheets automation.

## Environment

| Variable | Required | Description |
|----------|----------|-------------|
| `LEAD_WEBHOOK_URL` | No | POST JSON `{ email, name, source, createdAt }` to external webhook |

## Deploy

Vercel: set root directory to `apps/landing-waitlist`. `vercel.json` included.
