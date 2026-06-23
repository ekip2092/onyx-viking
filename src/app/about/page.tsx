import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { Shell } from "@/components/layout/Shell";
import { AssuranceBand } from "@/components/sections/AssuranceBand";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SpecCell } from "@/components/ui/SpecCell";
import { PhotoSlot } from "@/components/ui/PhotoSlot";
import { HeaderVideoBg } from "@/components/sections/HeaderVideoBg";
import { PhotoLede } from "@/components/sections/PhotoLede";
import { Reveal } from "@/components/anim/Reveal";

// Soft legibility shadow for header copy sitting over the background video.
const headerShadow = "0 1px 14px rgba(0,0,0,0.55), 0 1px 3px rgba(0,0,0,0.45)";

export const metadata: Metadata = {
  title: "About",
  description:
    "Factory trained, family owned Viking specialists for Los Angeles & Southern California. The only work we do, and we do it better than anyone.",
  alternates: { canonical: "/about" },
};

const CREDENTIALS = [
  { value: "24", unit: "YRS", label: "On luxury appliances only" },
  { value: "100", unit: "%", label: "Genuine factory parts" },
  { value: "3", unit: "YR", label: "Manufacturer backed warranty" },
  { value: "5.0", unit: "★", label: "Average client rating" },
];

const STEPS = [
  { n: "01", t: "Diagnose at the source", d: "A flat fee diagnostic visit. We find the true fault, not the symptom, and explain it plainly." },
  { n: "02", t: "Genuine parts only", d: "Viking OEM components, sourced direct. No aftermarket substitutes, ever." },
  { n: "03", t: "Restore to factory spec", d: "Calibrated, sealed and tested. Floors and cabinetry protected throughout the work." },
  { n: "04", t: "Guarantee it", d: "Three years, manufacturer backed, on parts and labour. One name to call if anything is ever not right." },
];

function AboutHeader() {
  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        background: "var(--color-canvas)",
        borderBottom: "1px solid var(--color-hairline)",
      }}
    >
      <HeaderVideoBg src="/repair_bg_website.mp4" mobileSrc="/repair_bg_mobile.mp4" />
      <Reveal className="wrap" style={{ position: "relative", padding: "var(--space-super) var(--space-lg) var(--space-xxl)" }}>
        <Eyebrow style={{ color: "rgba(255,255,255,0.92)", textShadow: headerShadow }}>About Onyx</Eyebrow>
        <h1 className="d-mega hero-title" style={{ marginTop: "var(--space-sm)", maxWidth: "18ch", textShadow: headerShadow }}>
          We service appliances the way a marque services a motorcar.
        </h1>
      </Reveal>
    </section>
  );
}

function Manifesto() {
  return (
    <section style={{ background: "var(--color-canvas)", padding: "var(--space-xxl) var(--space-lg)" }}>
      <div
        className="wrap manifesto-grid"
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-xl)", alignItems: "center" }}
      >
        <PhotoSlot
          src="/about-portrait.jpg"
          webpSrc="/about-portrait.webp"
          alt="An Onyx technician servicing a luxury Viking appliance"
          label="Drop a photo of your technician or workshop"
          aspectRatio="4 / 5"
          style={{ border: "1px solid var(--color-hairline)" }}
        />
        <Reveal style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)" }}>
          <h2 className="d-xl" style={{ maxWidth: "18ch" }}>
            A noble obsession with doing it properly.
          </h2>
          <p className="body" style={{ fontSize: "16px" }}>
            The owners of a Bentley do not take it to whoever is cheapest and nearest. They take it to people who
            understand the machine, its tolerances, its materials, its temperament. We hold a Viking refrigerator
            and a Viking range to exactly that standard.
          </p>
          <p className="body" style={{ fontSize: "16px" }}>
            That means factory training, genuine parts, and the patience to diagnose a fault at its source rather
            than swap components until something works. It means protecting the floors and cabinetry we work beside,
            and leaving a kitchen exactly as we found it, only working as it should.
          </p>
          <p className="body" style={{ fontSize: "16px" }}>
            Family owned, fully insured, and 24 years deep in nothing but luxury appliances. This is the only
            work we do, and we intend to do it better than anyone.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Credentials() {
  return (
    <section
      style={{
        background: "var(--gradient-graphite)",
        borderTop: "1px solid var(--color-hairline)",
        borderBottom: "1px solid var(--color-hairline)",
        padding: "var(--space-xl) var(--space-lg)",
      }}
    >
      <div className="wrap grid cols-4">
        {CREDENTIALS.map((s, i) => (
          <SpecCell key={i} value={s.value} unit={s.unit} label={s.label} accent={i === 3} />
        ))}
      </div>
    </section>
  );
}

function Process() {
  return (
    <section
      style={{
        background: "var(--color-canvas)",
        padding: "var(--space-xxl) var(--space-lg)",
        borderTop: "1px solid var(--color-hairline)",
      }}
    >
      <div className="wrap">
        <Reveal>
          <Eyebrow>How we work</Eyebrow>
          <h2 className="d-xl" style={{ marginTop: "var(--space-xs)", maxWidth: "16ch" }}>
            Four steps, no shortcuts.
          </h2>
        </Reveal>
        <Reveal className="grid cols-4" stagger={0.08} style={{ marginTop: "var(--space-lg)" }}>
          {STEPS.map((s, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", gap: "var(--space-xs)" }}>
              <span style={{ color: "var(--color-primary)", fontSize: "40px", fontWeight: 700, letterSpacing: "-1px", lineHeight: 1 }}>
                {s.n}
              </span>
              <h3 style={{ margin: "6px 0 0", color: "var(--color-ink)", fontSize: "18px", fontWeight: 600 }}>{s.t}</h3>
              <p className="body">{s.d}</p>
            </div>
          ))}
        </Reveal>
        <div style={{ marginTop: "var(--space-xl)", display: "flex", gap: "var(--space-xs)", flexWrap: "wrap" }}>
          <Button variant="primary" href={"tel:" + SITE.phoneTel}>
            Call {SITE.phoneDisplay}
          </Button>
          <Button variant="outline" href={SITE.book}>
            Book a diagnostic
          </Button>
        </div>
      </div>
    </section>
  );
}

function ServiceImage() {
  return (
    <section style={{ background: "var(--color-canvas)", padding: "0 var(--space-lg) var(--space-xxl)" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="wrap"
        src="/appliances/repair_fridge_hands.jpg"
        alt="An Onyx technician repairing a built-in appliance at the board level"
        loading="lazy"
        style={{
          display: "block",
          width: "100%",
          aspectRatio: "16 / 7",
          objectFit: "cover",
          border: "1px solid var(--color-hairline)",
        }}
      />
    </section>
  );
}

export default function AboutPage() {
  return (
    <Shell active="about">
      <AboutHeader />
      <PhotoLede image="/appliances/repair_tools_layout.jpg" alt="An Onyx technician's tools laid out" eyebrow="Our purpose">
        A Viking is not an appliance you replace. It is one you keep, and keep well. Onyx exists to give the finest
        kitchens in {SITE.region} a single, trusted name for their care.
      </PhotoLede>
      <Manifesto />
      <ServiceImage />
      <Credentials />
      <AssuranceBand eyebrow="The Onyx standard" title="What every visit includes." tone="light" />
      <Process />
    </Shell>
  );
}
