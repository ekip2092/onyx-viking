"use client";

import { useEffect, useState } from "react";
import { updateConsent } from "@/lib/gtag";

const KEY = "onyx-cookie-consent";

/* Small cookie notice wired to Consent Mode v2 on the CPRA opt-OUT model:
   consent defaults to granted (set in Analytics); "Do Not Sell or Share"
   flips everything to denied. The choice is remembered in localStorage and
   re-applied on return visits; legacy "accepted"/"declined" values from the
   old opt-in banner are honored ("declined" stays opted out). */
export function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY);
      if (!saved) setShow(true);
      else if (saved === "optout" || saved === "declined") updateConsent(false);
    } catch {
      setShow(true);
    }
  }, []);

  const choose = (optout: boolean) => {
    try {
      localStorage.setItem(KEY, optout ? "optout" : "ok");
    } catch {
      /* ignore */
    }
    updateConsent(!optout);
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="cookie-banner" role="dialog" aria-label="Cookie notice">
      <p style={{ margin: 0, color: "var(--color-body)", fontSize: "13px", lineHeight: 1.5 }}>
        We use cookies to run this site and measure our advertising.
      </p>
      <div className="cookie-actions">
        <button type="button" onClick={() => choose(true)} className="cookie-decline">
          Do Not Sell or Share My Personal Information
        </button>
        <button type="button" onClick={() => choose(false)} className="cookie-accept">
          OK
        </button>
      </div>
    </div>
  );
}
