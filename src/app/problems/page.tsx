import type { Metadata } from "next";
import { SITE, REFRIGERATION, COOKING, WARNING_SIGNS, type Brand } from "@/lib/site";
import { Shell } from "@/components/layout/Shell";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { CheckIcon } from "@/components/ui/Icons";
import { HeaderVideoBg } from "@/components/sections/HeaderVideoBg";
import { PhotoLede } from "@/components/sections/PhotoLede";
import { Reveal } from "@/components/anim/Reveal";

// Soft legibility shadow for header copy sitting over the background video.
const headerShadow = "0 1px 14px rgba(0,0,0,0.55), 0 1px 3px rgba(0,0,0,0.45)";

export const metadata: Metadata = {
  title: "Problems We Fix",
  description:
    "Viking faults we repair every week, from cooling and frost issues to igniters and control boards. 24 years on Viking appliances alone.",
  alternates: { canonical: "/problems" },
};

function ProblemsHeader() {
  return (
    <section style={{ position: "relative", overflow: "hidden", background: "var(--color-canvas)", borderBottom: "1px solid var(--color-hairline)" }}>
      <HeaderVideoBg src="/repair_bg_website.mp4" mobileSrc="/repair_bg_mobile.mp4" poster="/repair_bg_poster.jpg" />
      <Reveal className="wrap" style={{ position: "relative", padding: "var(--space-super) var(--space-lg) var(--space-xxl)" }}>
        <Eyebrow style={{ color: "rgba(255,255,255,0.92)", textShadow: headerShadow }}>Problems we fix</Eyebrow>
        <h1 className="d-mega hero-title" style={{ marginTop: "var(--space-sm)", maxWidth: "15ch", textShadow: headerShadow }}>
          There isn’t a fault we haven’t seen.
        </h1>
        <div style={{ marginTop: "var(--space-lg)", display: "flex", gap: "var(--space-xs)", flexWrap: "wrap" }}>
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

function WarningSigns() {
  return (
    <section style={{ background: "var(--color-canvas-light)", padding: "var(--space-xxl) var(--space-lg)" }}>
      <div className="wrap">
        <Reveal>
          <Eyebrow style={{ color: "var(--color-muted-on-light)" }}>When is it time for a repair?</Eyebrow>
          <h2 className="d-xl" style={{ color: "var(--color-body-on-light)", marginTop: "var(--space-xs)", maxWidth: "18ch" }}>
            Five signs worth a call.
          </h2>
        </Reveal>
        <Reveal
          className="grid"
          stagger={0.07}
          style={{ marginTop: "var(--space-lg)", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}
        >
          {WARNING_SIGNS.map((s, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                paddingTop: "var(--space-sm)",
                borderTop: "2px solid var(--color-primary)",
              }}
            >
              <span style={{ color: "var(--color-primary)", fontSize: "28px", fontWeight: 700, lineHeight: 1 }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 style={{ margin: 0, color: "var(--color-body-on-light)", fontSize: "16px", fontWeight: 600 }}>{s.t}</h3>
              <p className="body" style={{ color: "var(--color-muted-on-light)" }}>{s.d}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function ProblemGrid({ brand, accentEyebrow, image }: { brand: Brand; accentEyebrow: string; image?: string }) {
  return (
    <section
      style={{
        background: "var(--color-canvas)",
        padding: "var(--space-xxl) var(--space-lg)",
        borderTop: "1px solid var(--color-hairline)",
      }}
    >
      <div className="wrap">
        <Reveal style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", flexWrap: "wrap", gap: "var(--space-sm)" }}>
          <div>
            <Eyebrow>{accentEyebrow}</Eyebrow>
            <h2 className="d-xl" style={{ marginTop: "var(--space-xs)" }}>
              {brand.label} repairs
            </h2>
          </div>
          <span className="eyebrow">{brand.line}</span>
        </Reveal>
        {image && (
          <Reveal style={{ marginTop: "var(--space-lg)" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image}
              alt={`${brand.label} appliance in a luxury kitchen`}
              loading="lazy"
              style={{
                width: "100%",
                aspectRatio: "16 / 7",
                objectFit: "cover",
                objectPosition: "center",
                display: "block",
                border: "1px solid var(--color-hairline)",
              }}
            />
          </Reveal>
        )}
        <Reveal className="grid cols-3" stagger={0.05} style={{ marginTop: "var(--space-lg)" }}>
          {brand.problems.map((p, i) => (
            <div
              key={i}
              style={{
                border: "1px solid var(--color-hairline)",
                background: "var(--color-surface-card)",
                padding: "var(--space-md)",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <CheckIcon size={20} style={{ color: "var(--color-primary)" }} />
              <h3 style={{ margin: 0, color: "var(--color-ink)", fontSize: "17px", fontWeight: 600, lineHeight: 1.25 }}>
                {p.t}
              </h3>
              <p className="body">{p.d}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function FixItAll() {
  return (
    <section style={{ background: "var(--gradient-rosso)", padding: "var(--space-xxl) var(--space-lg)" }}>
      <div
        className="wrap"
        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--space-lg)", flexWrap: "wrap" }}
      >
        <div style={{ maxWidth: "46ch" }}>
          <Eyebrow style={{ color: "rgba(255,255,255,0.82)" }}>We fix it all</Eyebrow>
          <h2 className="d-xl" style={{ marginTop: "8px" }}>
            If it’s a Viking, we can put it right.
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
    </section>
  );
}

export default function ProblemsPage() {
  return (
    <Shell active="problems">
      <ProblemsHeader />
      <PhotoLede image="/appliances/repair_fridge_condenser.jpg" alt="A Viking sealed system being serviced" eyebrow="The work we do">
        24 years on Viking alone means most diagnoses take minutes, not visits. Here is the work we do
        every week, and the signs it’s time to call.
      </PhotoLede>
      <WarningSigns />
      <ProblemGrid brand={REFRIGERATION} accentEyebrow="Viking · Refrigeration" image="/appliances/viking_648prog.jpg" />
      <ProblemGrid brand={COOKING} accentEyebrow="Viking · Cooking" image="/appliances/viking_cooktop.jpg" />
      <FixItAll />
    </Shell>
  );
}
