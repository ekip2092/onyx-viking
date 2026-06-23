import { SITE } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ShieldIcon, ClockIcon, CheckIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/anim/Reveal";

/* Trust badge strip, sits just under the hero. */
const BADGES = [
  { Icon: ShieldIcon, label: "Licensed & Insured", sub: "Fully covered, every visit" },
  { Icon: ClockIcon, label: "Same Day Service", sub: "7 days, 7am to 7pm" },
  { Icon: CheckIcon, label: "Factory Trained", sub: "Certified on Viking" },
  { Icon: ShieldIcon, label: "3 Year Warranty", sub: "Parts and labour" },
];

export function TrustBadges() {
  return (
    <section style={{ background: "var(--color-canvas)", borderBottom: "1px solid var(--color-hairline)", padding: "var(--space-lg)" }}>
      <div className="wrap grid cols-4" style={{ gap: "var(--space-md)" }}>
        {BADGES.map((b, i) => {
          const I = b.Icon;
          return (
            <div key={i} style={{ display: "flex", gap: "var(--space-sm)", alignItems: "flex-start" }}>
              <I size={22} style={{ color: "var(--color-primary)", flexShrink: 0, marginTop: "2px" }} />
              <div>
                <div style={{ color: "var(--color-ink)", fontSize: "15px", fontWeight: 600 }}>{b.label}</div>
                <div style={{ color: "var(--color-body)", fontSize: "13px", marginTop: "2px" }}>{b.sub}</div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* How we work — the four-step process, on the landing page. */
const STEPS = [
  { n: "01", t: "Diagnose at the source", d: "A flat fee diagnostic visit. We find the true fault, not the symptom, and explain it plainly." },
  { n: "02", t: "Genuine parts only", d: "Viking OEM components, sourced direct. No aftermarket substitutes, ever." },
  { n: "03", t: "Restore to factory spec", d: "Calibrated, sealed and tested. Floors and cabinetry protected throughout the work." },
  { n: "04", t: "Guarantee it", d: "Three years, manufacturer backed, on parts and labour. One name to call if anything is ever not right." },
];

export function HowWeWork() {
  return (
    <section style={{ background: "var(--color-canvas)", padding: "var(--space-xxl) var(--space-lg)", borderTop: "1px solid var(--color-hairline)" }}>
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
              <span style={{ color: "var(--color-primary)", fontSize: "40px", fontWeight: 700, letterSpacing: "-1px", lineHeight: 1 }}>{s.n}</span>
              <h3 style={{ margin: "6px 0 0", color: "var(--color-ink)", fontSize: "18px", fontWeight: 600 }}>{s.t}</h3>
              <p className="body">{s.d}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* Specialists, not generalists — positioning band on graphite. */
const SPECIALIST_TAGS = ["Certified", "Background checked", "Factory trained", "NDA on request"];

export function Specialists() {
  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        background: "var(--gradient-graphite)",
        padding: "var(--space-xxl) var(--space-lg)",
        borderTop: "1px solid var(--color-hairline)",
        borderBottom: "1px solid var(--color-hairline)",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/specialists_bg.jpg"
        alt=""
        aria-hidden="true"
        loading="lazy"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center right" }}
      />
      {/* Legibility wash: heavy on the left where the copy sits, opening up on the right. */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "linear-gradient(90deg, rgba(22,22,22,0.86) 0%, rgba(22,22,22,0.5) 42%, rgba(22,22,22,0.08) 100%)",
        }}
      />
      <Reveal className="wrap" style={{ position: "relative", maxWidth: "64ch" }}>
        <Eyebrow>Specialists, not generalists</Eyebrow>
        <h2 className="d-xl" style={{ marginTop: "var(--space-xs)" }}>
          Your Viking experts.
        </h2>
        <p className="lede" style={{ marginTop: "var(--space-md)" }}>
          Certified, background checked technicians who work on the marque and nothing else. No call centres, no
          rotating subcontractors, no guesswork. The depth that only comes from doing one thing, exceptionally.
        </p>
        <div style={{ marginTop: "var(--space-lg)", display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {SPECIALIST_TAGS.map((t, i) => (
            <span
              key={i}
              style={{
                border: "1px solid var(--color-hairline)",
                color: "var(--color-body-strong)",
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.4px",
                textTransform: "uppercase",
                padding: "8px 14px",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* Final call to action, just before the footer. */
export function FinalCta() {
  return (
    <section style={{ background: "var(--color-canvas)", padding: "var(--space-super) var(--space-lg)", borderTop: "1px solid var(--color-hairline)" }}>
      <Reveal className="wrap" style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
        <Eyebrow style={{ color: "var(--color-body)" }}>Same day service · {SITE.region}</Eyebrow>
        <h2 className="d-mega" style={{ marginTop: "var(--space-sm)" }}>
          Your peace of mind is one call away.
        </h2>
        <p className="lede" style={{ marginTop: "var(--space-md)", marginLeft: "auto", marginRight: "auto", maxWidth: "46ch" }}>
          One number, and it is handled, from diagnosis to a kitchen that simply works again.
        </p>
        <div style={{ marginTop: "var(--space-lg)", display: "flex", gap: "var(--space-xs)", flexWrap: "wrap", justifyContent: "center" }}>
          <Button variant="primary" href={"tel:" + SITE.phoneTel}>
            Call {SITE.phoneDisplay}
          </Button>
          <Button variant="outline" href={SITE.book}>
            Book a diagnostic
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
