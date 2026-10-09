# portfolio-templates

Monorepo of **portfolio demo templates** for freelancer **gaopfEditer**. Each app is English UI, Vercel-ready, and runs in **mock mode with zero environment variables**.

| ID | App | Backlog links | Port (dev) |
|----|-----|---------------|------------|
| **T1** | [`apps/landing-waitlist`](apps/landing-waitlist) | A1, A10 | 3001 |
| **T2** | [`apps/form-to-sheet`](apps/form-to-sheet) | A10 | 3002 |
| **T3** | [`apps/booking-calendar`](apps/booking-calendar) | A3, B6 | 3003 |
| **T4** | [`apps/launch-audit-report`](apps/launch-audit-report) | C5, C6 | 3004 |

Shared UI primitives live in [`packages/ui`](packages/ui).

## Requirements

- Node.js 20+
- npm 10+ (workspaces)

## Install & build

```bash
npm install
npm run build
```

Build each app individually:

```bash
npm run build -w landing-waitlist
npm run build -w form-to-sheet
npm run build -w booking-calendar
npm run build -w launch-audit-report
```

## Run locally

| Command | URL |
|---------|-----|
| `npm run dev:landing-waitlist` | http://localhost:3001 |
| `npm run dev:form-to-sheet` | http://localhost:3002 |
| `npm run dev:booking-calendar` | http://localhost:3003 |
| `npm run dev:launch-audit-report` | http://localhost:3004 |

## Demo each template (3–5 steps)

### T1 — landing-waitlist

1. `npm run dev:landing-waitlist`
2. Review hero, benefits, FAQ.
3. Submit the waitlist form.
4. Confirm mock success banner.
5. Optional: set `LEAD_WEBHOOK_URL` in `apps/landing-waitlist/.env.local`.

### T2 — form-to-sheet

1. `npm run dev:form-to-sheet`
2. Submit the test contact form.
3. Read success message (mock JSON).
4. Inspect `apps/form-to-sheet/data/submissions.json`.
5. Optional: configure `SHEETS_*` and `SLACK_WEBHOOK_URL` (see app README).

### T3 — booking-calendar

1. `npm run dev:booking-calendar`
2. Select a free slot.
3. Complete name/email and book.
4. View confirmation page (payment skipped).
5. Verify slot is marked booked on return.

### T4 — launch-audit-report

1. `npm run dev:launch-audit-report`
2. Compare `/before` vs `/after`.
3. Try safe XSS teaching payload on `/before`.
4. Open `/report` and use Print → PDF.
5. Copy Markdown checklist from the report section.

## Customize for a client

1. Fork or duplicate the relevant `apps/<name>` folder.
2. Update copy, branding colors in `packages/ui/src/styles.css`.
3. Wire env vars documented in each app README (never commit secrets).
4. Deploy on Vercel with **Root Directory** set to the app folder.

## Screenshots

Each app includes `docs/screenshots/` (captured after build). Regenerate:

```bash
npm run build
npx playwright install chromium
node scripts/capture-screenshots.mjs
```

## Constraints (all templates)

- Labeled **Portfolio demo template** — no client names, testimonials, or fake revenue.
- No invented metrics or unpaid product screenshots.
- Free-hosting friendly: mock defaults, no paid APIs required.
- We do **not** deploy to your Vercel account from this repo.

## Second batch (planned)

T5 `support-triage`, T6 `expert-directory`, T7 `price-rules-diff` — see plan in project docs.
