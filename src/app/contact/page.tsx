import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { Shell } from "@/components/layout/Shell";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PhoneIcon } from "@/components/ui/Icons";
import { ContactBody } from "@/components/sections/ContactBody";
import { HeaderVideoBg } from "@/components/sections/HeaderVideoBg";
import { Reveal } from "@/components/anim/Reveal";

// Soft legibility shadow for header copy sitting over the background video.
const headerShadow = "0 1px 14px rgba(0,0,0,0.55), 0 1px 3px rgba(0,0,0,0.45)";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Call (877) 778-0227 for same day Viking service in Los Angeles & Southern California, or request a callback online.",
  alternates: { canonical: "/contact" },
};

function ContactHeader() {
  return (
    <section style={{ position: "relative", overflow: "hidden", background: "var(--color-canvas)", borderBottom: "1px solid var(--color-hairline)" }}>
      <HeaderVideoBg src="/phonecall_bg_website.mp4" mobileSrc="/phonecall_bg_mobile.mp4" poster="/phonecall_bg_poster.jpg" objectPosition="center 22%" />
      <Reveal className="wrap" style={{ position: "relative", padding: "var(--space-super) var(--space-lg) var(--space-xl)" }}>
        <Eyebrow style={{ color: "rgba(255,255,255,0.92)", textShadow: headerShadow }}>Contact · Same day service</Eyebrow>
        <h1 className="d-mega hero-title" style={{ marginTop: "var(--space-sm)", maxWidth: "14ch", textShadow: headerShadow }}>
          Call us for same day service.
        </h1>
        <a
          href={"tel:" + SITE.phoneTel}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "var(--space-xs)",
            marginTop: "var(--space-md)",
            color: "var(--color-ink)",
            textDecoration: "none",
            textShadow: headerShadow,
          }}
        >
          <PhoneIcon size={26} style={{ color: "var(--color-primary)" }} />
          <span style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 600, letterSpacing: "-0.5px" }}>
            {SITE.phoneDisplay}
          </span>
        </a>
      </Reveal>
    </section>
  );
}

function ContactImage() {
  return (
    <section style={{ background: "var(--color-canvas)", padding: "0 var(--space-lg) var(--space-xxl)" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="wrap"
        src="/appliances/viking_wine.jpg"
        alt="A Viking wine storage unit in a luxury kitchen"
        loading="lazy"
        style={{
          display: "block",
          width: "100%",
          aspectRatio: "16 / 6",
          objectFit: "cover",
          border: "1px solid var(--color-hairline)",
        }}
      />
    </section>
  );
}

export default function ContactPage() {
  return (
    <Shell active="contact">
      <ContactHeader />
      <ContactImage />
      <ContactBody />
    </Shell>
  );
}
