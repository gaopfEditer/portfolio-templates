# form-to-sheet (T2)

**Portfolio demo template** — accept form POSTs and append to Google Sheets when configured, otherwise store in local JSON mock.

| Backlog | A10 |
|---------|-----|

## Quick start

```bash
npm install
npm run dev:form-to-sheet
```

Open [http://localhost:3002](http://localhost:3002) for the HTML test form.

## Demo path

1. Start the dev server.
2. Fill name, email, message (budget/timeline optional).
3. Submit — response confirms mock JSON storage.
4. Open `data/submissions.json` to see the row.
5. Check server logs for `[form-to-sheet mock slack payload]`.

## API

`POST /api/submit` — `application/json` or `application/x-www-form-urlencoded`.

Required fields: `name`, `email`, `message`.

## Environment (never commit values)

| Variable | Required for Sheets | Description |
|----------|---------------------|-------------|
| `SHEETS_SPREADSHEET_ID` | Yes | Google spreadsheet ID |
| `SHEETS_CLIENT_EMAIL` | Yes | Service account email |
| `SHEETS_PRIVATE_KEY` | Yes | Service account private key (use `\n` for newlines in env) |
| `SHEETS_SHEET_NAME` | No | Tab name (default `Sheet1`) |
| `SLACK_WEBHOOK_URL` | No | Incoming webhook URL for notifications |

When Sheets vars are unset, mock mode writes to `data/submissions.json` only.

## Deploy

Vercel root: `apps/form-to-sheet`. Use Node.js runtime for filesystem mock, or swap mock for KV in production.
