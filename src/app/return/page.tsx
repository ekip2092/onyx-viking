import Link from "next/link";
import type { CSSProperties } from "react";
import Stripe from "stripe";
import { SITE } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { CheckIcon } from "@/components/ui/Icons";
import { createBooking } from "@/lib/googleCalendar";
import { Conversion } from "@/components/analytics/Conversion";

const wrapStyle: CSSProperties = {
  minHeight: "100vh",
  background: "var(--color-canvas)",
  padding: "var(--space-super) var(--space-lg)",
};

export default async function Return({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const raw = searchParams.session_id;
  const sessionId = typeof raw === "string" ? raw : undefined;

  if (!sessionId) {
    return (
      <main style={wrapStyle}>
        <div className="wrap" style={{ maxWidth: 640 }}>
          <h1 className="d-lg">Missing session.</h1>
          <p className="body" style={{ marginTop: "var(--space-sm)" }}>
            <Link href="/book" style={{ color: "var(--color-ink)" }}>
              Return to booking
            </Link>
          </p>
        </div>
      </main>
    );
  }

  let status: string | null = null;
  let email: string | null | undefined = null;
  const key = process.env.STRIPE_SECRET_KEY;
  if (key) {
    try {
      const stripe = new Stripe(key);
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      status = session.status;
      email = session.customer_details?.email;

      // Payment confirmed -> create the calendar event (idempotent per session).
      const m = session.metadata ?? {};
      if (session.status === "complete" && m.date && m.window) {
        try {
          await createBooking({
            date: m.date,
            window: m.window,
            appliance: m.appliance,
            issue: m.issue,
            name: m.name,
            phone: m.phone,
            email: m.email || email || undefined,
            address: m.address,
            city: m.city,
            ref: m.ref,
            sessionId,
          });
        } catch {
          /* never block the thank-you screen on a calendar hiccup */
        }
      }
    } catch {
      status = "error";
    }
  }

  if (status === "open" || status === "error") {
    return (
      <main style={wrapStyle}>
        <div className="wrap" style={{ maxWidth: 640 }}>
          <h1 className="d-lg">Payment didn’t go through.</h1>
          <p className="body" style={{ marginTop: "var(--space-sm)" }}>
            No charge was made.{" "}
            <Link href="/checkout" style={{ color: "var(--color-ink)" }}>
              Try again
            </Link>
            .
          </p>
        </div>
      </main>
    );
  }

  return (
    <main style={wrapStyle}>
      <div className="wrap" style={{ maxWidth: 640, display: "flex", flexDirection: "column", gap: "var(--space-sm)" }}>
        {/* Google Ads booking conversion fires here (payment confirmed). */}
        <Conversion transactionId={sessionId} />
        <CheckIcon size={44} style={{ color: "var(--color-primary)" }} />
        <h1 className="d-lg" style={{ margin: 0 }}>
          Thank you. Your payment was received.
        </h1>
        <p className="lede" style={{ fontSize: 18 }}>
          {email ? `A receipt is on its way to ${email}. ` : ""}An Onyx coordinator will call you shortly to confirm
          your arrival window.
        </p>
        <div style={{ marginTop: "var(--space-xs)", display: "flex", gap: "var(--space-xs)", flexWrap: "wrap" }}>
          <Button variant="primary" href={"tel:" + SITE.phoneTel}>
            Call {SITE.phoneDisplay}
          </Button>
          <Button variant="outline" href="/">
            Back to home
          </Button>
        </div>
      </div>
    </main>
  );
}
