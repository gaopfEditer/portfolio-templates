import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

export type Submission = {
  id: string;
  name: string;
  email: string;
  message: string;
  budget?: string;
  timeline?: string;
  createdAt: string;
};

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "submissions.json");

async function ensureDataFile(): Promise<Submission[]> {
  await mkdir(DATA_DIR, { recursive: true });
  try {
    const raw = await readFile(DATA_FILE, "utf8");
    return JSON.parse(raw) as Submission[];
  } catch {
    return [];
  }
}

export async function appendMockSubmission(
  row: Omit<Submission, "id" | "createdAt">
): Promise<Submission> {
  const list = await ensureDataFile();
  const entry: Submission = {
    ...row,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  list.push(entry);
  await writeFile(DATA_FILE, JSON.stringify(list, null, 2), "utf8");
  return entry;
}

export function sheetsConfigured(): boolean {
  return Boolean(
    process.env.SHEETS_SPREADSHEET_ID?.trim() &&
      process.env.SHEETS_CLIENT_EMAIL?.trim() &&
      process.env.SHEETS_PRIVATE_KEY?.trim()
  );
}

/** Append a row via Google Sheets API v4 when env vars are set. */
export async function appendGoogleSheet(row: Submission): Promise<void> {
  const spreadsheetId = process.env.SHEETS_SPREADSHEET_ID!.trim();
  const clientEmail = process.env.SHEETS_CLIENT_EMAIL!.trim();
  let privateKey = process.env.SHEETS_PRIVATE_KEY!.trim();
  if (privateKey.includes("\\n")) {
    privateKey = privateKey.replace(/\\n/g, "\n");
  }
  const sheetName = process.env.SHEETS_SHEET_NAME?.trim() || "Sheet1";

  const { JWT } = await import("google-auth-library");
  const auth = new JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  const token = await auth.getAccessToken();
  if (!token) throw new Error("Failed to obtain Google access token");

  const values = [
    [row.createdAt, row.name, row.email, row.message, row.budget ?? "", row.timeline ?? ""],
  ];
  const range = encodeURIComponent(`${sheetName}!A:F`);
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append?valueInputOption=USER_ENTERED`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ values }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Sheets API error ${res.status}: ${text.slice(0, 200)}`);
  }
}

export type SlackPayload = {
  text: string;
  blocks?: unknown[];
};

export function buildSlackPayload(row: Submission): SlackPayload {
  return {
    text: `New form submission from ${row.name} (${row.email})`,
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*Portfolio demo — form submission*\n*Name:* ${row.name}\n*Email:* ${row.email}\n*Message:* ${row.message}`,
        },
      },
    ],
  };
}

export async function notifySlack(row: Submission): Promise<"sent" | "skipped" | "mock"> {
  const url = process.env.SLACK_WEBHOOK_URL?.trim();
  const payload = buildSlackPayload(row);
  if (!url) {
    console.info("[form-to-sheet mock slack payload]", JSON.stringify(payload));
    return "mock";
  }
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Slack webhook returned ${res.status}`);
  return "sent";
}
