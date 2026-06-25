import Link from "next/link";
import { SITE } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import type { CSSProperties } from "react";

const linkStyle: CSSProperties = {
  display: "block",
  color: "var(--color-body)",
  textDecoration: "none",
  fontSize: "var(--type-body-sm-size)",
  padding: "6px 0",
};

const colHeading: CSSProperties = {
  margin: "0 0 var(--space-xs)",
  color: "var(--color-ink)",
  fontSize: "var(--type-caption-uppercase-size)",
  fontWeight: 600,
  letterSpacing: "var(--type-caption-uppercase-tracking)",
  textTransform: "uppercase",
};

export function Footer() {
  return (
    <footer style={{ background: "var(--color-canvas)", borderTop: "1px solid var(--color-hairline)" }}>
      {/* Red call band */}
      <div style={{ background: "var(--gradient-rosso)" }}>
        <div
          className="wrap"
          style={{
            padding: "var(--space-xl) var(--space-lg)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "var(--space-lg)",
            flexWrap: "wrap",
          }}
        >
          <div>
            <Eyebrow style={{ color: "rgba(255,255,255,0.82)" }}>Same day service</Eyebrow>
            <h2 className="d-lg" style={{ marginTop: "8px", maxWidth: "20ch" }}>
              An appliance worth thousands deserves one call.
            </h2>
          </div>
          <div style={{ display: "flex", gap: "var(--space-xs)", flexWrap: "wrap" }}>
            <Button variant="outline" href={"tel:" + SITE.phoneTel} style={{ borderColor: "#fff", color: "#fff" }}>
              Call {SITE.phoneDisplay}
            </Button>
            <Button variant="outline" href={SITE.book} style={{ borderColor: "rgba(255,255,255,0.6)", color: "#fff" }}>
              Book online
            </Button>
          </div>
        </div>
      </div>

      {/* Link columns */}
      <div
        className="wrap footer-cols"
        style={{
          padding: "var(--space-xl) var(--space-lg)",
          display: "grid",
          gridTemplateColumns: "1.5fr 1fr 1fr",
          gap: "var(--space-lg)",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-xs)" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/onyx-mark.svg" alt="" style={{ height: "34px", width: "34px" }} />
            <span
              style={{
                color: "var(--color-ink)",
                fontSize: "16px",
                fontWeight: 600,
                letterSpacing: "0.5px",
                textTransform: "uppercase",
              }}
            >
              {SITE.name}
            </span>
          </div>
          <p className="body" style={{ marginTop: "var(--space-sm)", maxWidth: "34ch", fontSize: "13px" }}>
            Factory trained service for Viking, delivered with the discretion the homes we enter expect.
          </p>
          <p style={{ marginTop: "var(--space-sm)", color: "var(--color-muted)", fontSize: "12px" }}>
            {SITE.name} is independent and not affiliated with, sponsored by, or endorsed by Viking Range, LLC
          </p>
        </div>
        <div>
          <h4 style={colHeading}>Service</h4>
          {SITE.pages.map((p) => (
            <Link key={p.id} href={p.href} style={linkStyle}>
              {p.label}
            </Link>
          ))}
          <Link href={SITE.book} style={linkStyle}>
            Book an appointment
          </Link>
        </div>
        <div>
          <h4 style={colHeading}>Contact</h4>
          <a href={"tel:" + SITE.phoneTel} style={linkStyle}>
            {SITE.phoneDisplay}
          </a>
          <a href={"mailto:" + SITE.email} style={linkStyle}>
            {SITE.email}
          </a>
          <p style={{ ...linkStyle, color: "var(--color-muted)" }}>{SITE.hours}</p>
          <p style={{ ...linkStyle, color: "var(--color-muted)" }}>{SITE.address}</p>
        </div>
      </div>

      {/* Legal row */}
      <div
        className="wrap"
        style={{
          borderTop: "1px solid var(--color-hairline)",
          padding: "var(--space-sm) var(--space-lg)",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "var(--space-xs)",
        }}
      >
        <span style={{ color: "var(--color-muted)", fontSize: "var(--type-caption-size)" }}>
          © 2026 {SITE.name} · Serving {SITE.region}
        </span>
        <span style={{ color: "var(--color-muted)", fontSize: "var(--type-caption-size)" }}>
          Terms · Privacy · Licensed &amp; Insured · {SITE.bearReg}
        </span>
      </div>
    </footer>
  );
}
