import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

export type Booking = {
  id: string;
  slotStart: string;
  slotEnd: string;
  name: string;
  email: string;
  paymentStatus: "demo_skipped" | "stripe_test";
  createdAt: string;
};

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "bookings.json");

export const SLOT_MINUTES = 30;
export const WORKDAY_START = 9;
export const WORKDAY_END = 17;

export function getWeekStart(from: Date = new Date()): Date {
  const d = new Date(from);
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function generateSlots(weekStart: Date): { start: Date; end: Date; key: string }[] {
  const slots: { start: Date; end: Date; key: string }[] = [];
  for (let day = 0; day < 5; day++) {
    const base = new Date(weekStart);
    base.setDate(base.getDate() + day);
    for (let hour = WORKDAY_START; hour < WORKDAY_END; hour++) {
      for (const minute of [0, 30]) {
        const start = new Date(base);
        start.setHours(hour, minute, 0, 0);
        const end = new Date(start);
        end.setMinutes(end.getMinutes() + SLOT_MINUTES);
        slots.push({ start, end, key: start.toISOString() });
      }
    }
  }
  return slots;
}

async function loadBookings(): Promise<Booking[]> {
  await mkdir(DATA_DIR, { recursive: true });
  try {
    const raw = await readFile(DATA_FILE, "utf8");
    return JSON.parse(raw) as Booking[];
  } catch {
    return [];
  }
}

async function saveBookings(list: Booking[]): Promise<void> {
  await writeFile(DATA_FILE, JSON.stringify(list, null, 2), "utf8");
}

export async function listBookings(): Promise<Booking[]> {
  return loadBookings();
}

export async function createBooking(input: {
  slotStart: string;
  name: string;
  email: string;
}): Promise<{ booking: Booking } | { error: string }> {
  const start = new Date(input.slotStart);
  if (Number.isNaN(start.getTime())) return { error: "Invalid slot" };

  const list = await loadBookings();
  if (list.some((b) => b.slotStart === input.slotStart)) {
    return { error: "That slot is no longer available" };
  }

  const end = new Date(start);
  end.setMinutes(end.getMinutes() + SLOT_MINUTES);

  const useStripeStub = process.env.ENABLE_STRIPE_TEST_STUB === "true";
  const booking: Booking = {
    id: crypto.randomUUID(),
    slotStart: start.toISOString(),
    slotEnd: end.toISOString(),
    name: input.name.trim(),
    email: input.email.trim(),
    paymentStatus: useStripeStub ? "stripe_test" : "demo_skipped",
    createdAt: new Date().toISOString(),
  };

  list.push(booking);
  await saveBookings(list);
  return { booking };
}

export async function getBooking(id: string): Promise<Booking | null> {
  const list = await loadBookings();
  return list.find((b) => b.id === id) ?? null;
}
