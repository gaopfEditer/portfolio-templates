#!/usr/bin/env node
/**
 * Capture one screenshot per app after `npm run build` and `next start`.
 * Usage (from repo root):
 *   node scripts/capture-screenshots.mjs
 * Requires: npx playwright install chromium (first run)
 */
import { spawn } from "child_process";
import { mkdir } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const apps = [
  { name: "landing-waitlist", port: 3001, url: "/", out: "hero.png" },
  { name: "form-to-sheet", port: 3002, url: "/", out: "test-form.png" },
  { name: "booking-calendar", port: 3003, url: "/", out: "calendar.png" },
  { name: "launch-audit-report", port: 3004, url: "/report", out: "audit-report.png" },
];

async function waitForPort(port, ms = 60000) {
  const start = Date.now();
  while (Date.now() - start < ms) {
    try {
      const res = await fetch(`http://127.0.0.1:${port}`);
      if (res.ok || res.status < 500) return;
    } catch {
      /* retry */
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`Port ${port} did not become ready`);
}

const children = [];

function startApp(app) {
  const child = spawn("npm", ["run", "start", "-w", app.name], {
    cwd: root,
    stdio: "ignore",
    env: { ...process.env, PORT: String(app.port) },
  });
  children.push(child);
  return child;
}

async function main() {
  const { chromium } = await import("playwright");
  await mkdir(path.join(root, "apps"), { recursive: true });

  for (const app of apps) {
    startApp(app);
    await waitForPort(app.port);
  }

  const browser = await chromium.launch();
  for (const app of apps) {
    const dir = path.join(root, "apps", app.name, "docs", "screenshots");
    await mkdir(dir, { recursive: true });
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
    await page.goto(`http://127.0.0.1:${app.port}${app.url}`, { waitUntil: "networkidle" });
    await page.screenshot({ path: path.join(dir, app.out), fullPage: true });
    await page.close();
    console.log(`Saved ${app.name}/${app.out}`);
  }
  await browser.close();
  for (const c of children) c.kill("SIGTERM");
}

main().catch((err) => {
  console.error(err);
  for (const c of children) c.kill("SIGTERM");
  process.exit(1);
});
