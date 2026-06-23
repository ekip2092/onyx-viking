"use client";

import { useCallback } from "react";
import Link from "next/link";
import { loadStripe } from "@stripe/stripe-js";
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";

// Publishable key is safe to expose; it is read from a NEXT_PUBLIC env var.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "");

export default function CheckoutPage() {
  const fetchClientSecret = useCallback(() => {
    // Booking details were saved by the form before redirecting here; send them
    // so the session carries them as metadata (used to create the calendar event).
    let booking: Record<string, unknown> = {};
    try {
      const saved = JSON.parse(localStorage.getItem("onyx-booking") || "null");
      if (saved?.f) booking = { ...saved.f, ref: saved.ref };
    } catch {
      /* ignore */
    }
    return fetch("/api/checkout_sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(booking),
    })
      .then((res) => res.json())
      .then((data) => data.clientSecret);
  }, []);

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "var(--color-canvas)",
        padding: "var(--space-xl) var(--space-lg) var(--space-xxl)",
      }}
    >
      <div className="wrap" style={{ maxWidth: 760 }}>
        <Link
          href="/"
          style={{ display: "inline-flex", alignItems: "center", gap: "var(--space-xxs)", textDecoration: "none", color: "var(--color-ink)" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/onyx-mark.svg" alt="" style={{ height: 30, width: 30 }} />
          <span style={{ fontSize: 17, fontWeight: 600, letterSpacing: "0.5px", textTransform: "uppercase" }}>Onyx</span>
        </Link>

        <h1 className="d-lg" style={{ marginTop: "var(--space-lg)" }}>
          Secure checkout
        </h1>
        <p className="lede" style={{ marginTop: "var(--space-xs)", fontSize: 18, maxWidth: "48ch" }}>
          A flat $95 diagnostic call fee, credited in full toward your repair.
        </p>

        <div id="checkout" style={{ marginTop: "var(--space-lg)" }}>
          <EmbeddedCheckoutProvider stripe={stripePromise} options={{ fetchClientSecret }}>
            <EmbeddedCheckout />
          </EmbeddedCheckoutProvider>
        </div>
      </div>
    </main>
  );
}
