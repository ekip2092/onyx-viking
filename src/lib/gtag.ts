"use client";

/* Client-side gtag event helpers. All guard on window.gtag, so they no-op
   safely before the tag loads or when a user has declined cookies. */
import { ADS_ID, ADS_LABELS } from "@/lib/seo";

function gtag(...args: unknown[]) {
  if (typeof window === "undefined") return;
  const fn = (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag;
  if (typeof fn === "function") fn(...args);
}

const realLabel = (label: string) => !label.startsWith("PLACEHOLDER") && !label.startsWith("TODO");

/** Fires on every tap of a tel: link or the sticky CALL NOW button. */
export function trackTelClick(phone?: string) {
  gtag("event", "tel_click", { event_category: "engagement", phone_number: phone });
  // GA4 lead signal for a phone-tap (fires the moment a real GA4 id is set).
  gtag("event", "generate_lead", { method: "phone", currency: "USD", value: 0 });
  if (realLabel(ADS_LABELS.call)) {
    gtag("event", "conversion", { send_to: `${ADS_ID}/${ADS_LABELS.call}` });
  }
}

/** Fires when the callback / contact form is submitted. */
export function trackFormSubmit() {
  gtag("event", "form_submit", { event_category: "lead" });
  gtag("event", "generate_lead", { method: "form", currency: "USD", value: 0 });
  if (realLabel(ADS_LABELS.form)) {
    gtag("event", "conversion", { send_to: `${ADS_ID}/${ADS_LABELS.form}` });
  }
}

/** Fires on the booking confirmation screen (GA4 ecommerce-style event). */
export function trackBookingComplete(value: number, transactionId?: string) {
  gtag("event", "booking_complete", {
    value,
    currency: "USD",
    ...(transactionId ? { transaction_id: transactionId } : {}),
  });
  gtag("event", "generate_lead", {
    method: "booking",
    value,
    currency: "USD",
    ...(transactionId ? { transaction_id: transactionId } : {}),
  });
}

/** Consent Mode v2 update — called from the cookie banner. */
export function updateConsent(granted: boolean) {
  const v = granted ? "granted" : "denied";
  gtag("consent", "update", {
    ad_storage: v,
    analytics_storage: v,
    ad_user_data: v,
    ad_personalization: v,
  });
}
