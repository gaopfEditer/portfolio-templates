# launch-audit-report (T4)

**Portfolio demo template** — before/after security sandbox and printable launch audit checklist.

| Backlog | C5, C6 |
|---------|--------|

## Quick start

```bash
npm install
npm run dev:launch-audit-report
```

Open [http://localhost:3004](http://localhost:3004).

## Demo path

1. Read the overview at `/`.
2. Visit `/before` — show fake client secrets and XSS via controlled payload.
3. Visit `/after` — escaped output and security headers on hardened routes.
4. Open `/report` — walk the checklist; print to PDF.
5. Discuss webhook idempotency and RLS items with the client.

## Environment

| Variable | Description |
|----------|-------------|
| `DEMO_WEBHOOK_SECRET` | Optional server-only secret; `/api/demo-config` confirms it is not exposed to the browser |

All tokens shown in `/before` are intentionally fake (`pk_demo_NOT_REAL_*`).

## Deploy

Vercel root: `apps/launch-audit-report`.
