import { NextResponse } from "next/server";
import Stripe from "stripe";

// Keys come only from env vars (see onyx-site/.env.local, which is gitignored).
// Stripe is constructed per-request so a missing key never breaks the build.
export async function POST(req: Request) {
  try {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      return NextResponse.json(
        { error: "Stripe is not configured. Add STRIPE_SECRET_KEY to .env.local." },
        { status: 500 },
      );
    }
    const stripe = new Stripe(key);

    // Booking details (from the form, saved before checkout) ride along as
    // metadata so the /return handler can create the calendar event.
    let booking: Record<string, unknown> = {};
    try {
      booking = await req.json();
    } catch {
      /* no body is fine */
    }
    const s = (v: unknown, max = 200) => String(v ?? "").slice(0, max);
    const metadata: Record<string, string> = {
      appliance: s(booking.appliance),
      issue: s(booking.issue, 480),
      name: s(booking.name),
      phone: s(booking.phone),
      email: s(booking.email),
      address: s(booking.address),
      city: s(booking.city),
      date: s(booking.date, 20),
      window: s(booking.window, 40),
      ref: s(booking.ref, 40),
    };

    const origin = req.headers.get("origin") ?? "";
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded_page",
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: "Service / Diagnostic Call Fee" },
            unit_amount: 9500,
          },
          quantity: 1,
        },
      ],
      metadata,
      return_url: `${origin}/return?session_id={CHECKOUT_SESSION_ID}`,
    });
    return NextResponse.json({ clientSecret: session.client_secret });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
