"use client";

import { useEffect, useState } from "react";
import { updateConsent } from "@/lib/gtag";

const KEY = "onyx-cookie-consent";

/* Small cookie notice wired to Consent Mode v2. Consent defaults to denied
   (set in Analytics) until the visitor chooses here; the choice is remembered
   in localStorage and re-applied on return visits. */
export function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY);
      if (!saved) setShow(true);
      else if (saved === "accepted") updateConsent(true);
    } catch {
      setShow(true);
    }
  }, []);

  const choose = (accepted: boolean) => {
    try {
      localStorage.setItem(KEY, accepted ? "accepted" : "declined");
    } catch {
      /* ignore */
    }
    updateConsent(accepted);
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="cookie-banner" role="dialog" aria-label="Cookie notice">
      <p style={{ margin: 0, color: "var(--color-body)", fontSize: "13px", lineHeight: 1.5 }}>
        We use cookies to run this site and measure our advertising. You can accept or decline.
      </p>
      <div className="cookie-actions">
        <button type="button" onClick={() => choose(false)} className="cookie-decline">
          Decline
        </button>
        <button type="button" onClick={() => choose(true)} className="cookie-accept">
          Accept
        </button>
      </div>
    </div>
  );
}
