"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { PhoneIcon } from "@/components/ui/Icons";

/* Hamburger menu shown <= 1040px, where the inline nav links are hidden.
   Slides a panel below the 72px header with the page links, booking, and
   the phone number. Closes on link tap or overlay tap. */
export function MobileMenu({ active }: { active?: string }) {
  const [open, setOpen] = useState(false);

  // Lock background scroll while the panel is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  const linkStyle = (isActive: boolean) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 0",
    borderBottom: "1px solid var(--color-hairline)",
    textDecoration: "none",
    textTransform: "uppercase" as const,
    fontSize: "15px",
    fontWeight: 600,
    letterSpacing: "0.65px",
    color: isActive ? "var(--color-ink)" : "var(--color-body)",
  });

  return (
    <>
      <button
        type="button"
        className="menu-toggle"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
          {open ? (
            <>
              <line x1="5" y1="5" x2="19" y2="19" />
              <line x1="19" y1="5" x2="5" y2="19" />
            </>
          ) : (
            <>
              <line x1="3" y1="7" x2="21" y2="7" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="17" x2="21" y2="17" />
            </>
          )}
        </svg>
      </button>

      {open && (
        <>
          <div className="menu-overlay" onClick={close} aria-hidden="true" />
          <nav className="menu-panel" aria-label="Mobile">
            {SITE.pages.map((p) => (
              <Link key={p.id} href={p.href} onClick={close} style={linkStyle(active === p.id)}>
                {p.label}
              </Link>
            ))}
            <Link href={SITE.book} onClick={close} style={linkStyle(active === "book")}>
              Book an appointment
            </Link>
            <a
              href={"tel:" + SITE.phoneTel}
              onClick={close}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--space-xxs)",
                marginTop: "var(--space-md)",
                color: "var(--color-ink)",
                textDecoration: "none",
                fontSize: "20px",
                fontWeight: 600,
              }}
            >
              <PhoneIcon size={20} style={{ color: "var(--color-primary)" }} /> {SITE.phoneDisplay}
            </a>
          </nav>
        </>
      )}
    </>
  );
}
