"use client";

import { useEffect } from "react";
import { trackTelClick } from "@/lib/gtag";

/* One delegated listener covers every tel: link on the site — header,
   sticky CALL NOW, hero, footer, contact — so no per-link wiring is needed. */
export function TelTracking() {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const link = target?.closest?.('a[href^="tel:"]') as HTMLAnchorElement | null;
      if (link) trackTelClick(link.getAttribute("href")?.replace("tel:", "") || undefined);
    };
    document.addEventListener("click", handler, true);
    return () => document.removeEventListener("click", handler, true);
  }, []);
  return null;
}
