"use client";

import { useEffect } from "react";
import { SITE } from "@/lib/site";
import { ADS_ID, ADS_LABELS } from "@/lib/seo";
import { trackBookingComplete } from "@/lib/gtag";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/* Fires once on mount of a booking confirmation screen, after a confirmed
   payment (never on form load or a failed submit). transactionId dedupes
   refreshes (Stripe session id on /return, booking ref on the in-page state).
   - Google Ads conversion: the diagnostic fee (matches the Sub-Zero site,
     which reports the same booking action with its diagnostic value)
   - GA4 booking_complete: the diagnostic value, for analytics */
export function Conversion({ transactionId }: { transactionId?: string }) {
  useEffect(() => {
    if (typeof window.gtag === "function") {
      window.gtag("event", "conversion", {
        send_to: `${ADS_ID}/${ADS_LABELS.book}`,
        value: SITE.diagnosticFee,
        currency: "USD",
        ...(transactionId ? { transaction_id: transactionId } : {}),
      });
    }
    trackBookingComplete(SITE.diagnosticFee, transactionId);
  }, [transactionId]);

  return null;
}
