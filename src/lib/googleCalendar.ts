import { TIME_WINDOWS } from "./site";

/* Calendar booking + availability via a Google Apps Script web app bound to
   the owner's calendar. This avoids service-account keys (blocked by many
   "Secure by Default" org policies). Configure in .env.local:
     GOOGLE_APPS_SCRIPT_URL    (the web app /exec URL)
     GOOGLE_APPS_SCRIPT_SECRET (shared secret, must match the script)
   The Apps Script owns the windows/capacity logic; see docs/google-calendar-setup.md. */

const CAPACITY = 2; // mirrors the script; used only for the unconfigured fallback

export type WindowAvail = { label: string; available: boolean; remaining: number };

export type Booking = {
  date: string;
  window: string;
  appliance?: string;
  issue?: string;
  name?: string;
  phone?: string;
  email?: string;
  address?: string;
  city?: string;
  ref?: string;
  sessionId?: string;
};

function endpoint(): { url: string; secret: string } | null {
  const url = process.env.GOOGLE_APPS_SCRIPT_URL;
  const secret = process.env.GOOGLE_APPS_SCRIPT_SECRET;
  if (!url || !secret || url.includes("YOUR_")) return null;
  return { url, secret };
}

export function isCalendarConfigured(): boolean {
  return endpoint() !== null;
}

async function call(action: string, payload: Record<string, unknown>): Promise<any> {
  const ep = endpoint();
  if (!ep) return null;
  const res = await fetch(ep.url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ secret: ep.secret, action, ...payload }),
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`Apps Script ${res.status}`);
  return res.json();
}

/** Per-window availability for a date. If unconfigured, all windows are open. */
export async function getAvailability(date: string): Promise<WindowAvail[]> {
  const open = () => TIME_WINDOWS.map((label) => ({ label, available: true, remaining: CAPACITY }));
  if (!endpoint()) return open();
  try {
    const data = await call("availability", { date });
    if (data && Array.isArray(data.windows)) return data.windows as WindowAvail[];
  } catch {
    /* fall through to open */
  }
  return open();
}

/** Create the calendar event for a paid booking. Idempotent per Stripe session. */
export async function createBooking(b: Booking): Promise<{ ok: boolean; reason?: string; eventId?: string }> {
  if (!endpoint()) return { ok: false, reason: "calendar_not_configured" };
  try {
    const data = await call("book", b as unknown as Record<string, unknown>);
    return data ?? { ok: false, reason: "no_response" };
  } catch (e) {
    return { ok: false, reason: (e as Error).message };
  }
}
