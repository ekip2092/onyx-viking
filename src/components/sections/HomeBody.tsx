import Link from "next/link";
import { SITE, FAQS, REFRIGERATION, COOKING, REVIEWS, CITY_GROUPS } from "@/lib/site";
import { faqPageJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { AssuranceBand } from "@/components/sections/AssuranceBand";
import { TrustBadges, HowWeWork, Specialists, FinalCta } from "@/components/sections/Landing";
import { OneQuotePromise } from "@/components/sections/OneQuotePromise";
import { Faq } from "@/components/sections/Faq";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Stars } from "@/components/ui/Stars";
import { SpecCell } from "@/components/ui/SpecCell";
import { CheckIcon, ArrowIcon } from "@/components/ui/Icons";
import { PhotoSlot } from "@/components/ui/PhotoSlot";
import { Reveal } from "@/components/anim/Reveal";

const TRUST_STATS = [
  { value: "24", unit: "YRS", label: "On luxury appliances only" },
  { value: "100", unit: "%", label: "Genuine factory parts only" },
  { value: "3", unit: "YR", label: "Manufacturer backed warranty" },
  { value: "24", unit: "/7", label: "Support and same day booking" },
  { value: "$95", unit: "", label: "Diagnostic, credited in full to your repair" },
  { value: "5.0", unit: "★", label: "Average client rating" },
];

function TrustBand() {
  return (
    <section
      style={{
        background: "var(--gradient-graphite)",
        borderTop: "1px solid var(--color-hairline)",
        borderBottom: "1px solid var(--color-hairline)",
        padding: "var(--space-xl) var(--space-lg)",
      }}
    >
      <div className="wrap">
        <Eyebrow>By the numbers</Eyebrow>
        <div className="stats-6" style={{ marginTop: "var(--space-md)" }}>
          {TRUST_STATS.map((s, i) => (
            <SpecCell key={i} value={s.value} unit={s.unit} label={s.label} accent={s.value === "5.0"} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ScopeBand() {
  return (
    <section style={{ background: "var(--color-canvas)", padding: "var(--space-xxl) var(--space-lg)" }}>
      <div className="wrap">
        <Reveal>
          <Eyebrow>What we service</Eyebrow>
          <h2 className="d-xl" style={{ marginTop: "var(--space-xs)", maxWidth: "20ch" }}>
            One brand. Total mastery.
          </h2>
          <p className="lede" style={{ marginTop: "var(--space-sm)", maxWidth: "44ch" }}>
            Viking, restored to flawless condition.
          </p>
        </Reveal>
        <Reveal className="grid cols-2" stagger={0.1} style={{ marginTop: "var(--space-lg)", gap: "var(--space-md)" }}>
          {[REFRIGERATION, COOKING].map((brand, i) => (
            <article
              key={i}
              style={{
                border: "1px solid var(--color-hairline)",
                background: "var(--color-surface-card)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <picture style={{ display: "block" }}>
                <source
                  srcSet={i === 0 ? "/appliances/viking_french_door.webp" : "/appliances/viking_range.webp"}
                  type="image/webp"
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={i === 0 ? "/appliances/viking_french_door.jpg" : "/appliances/viking_range.jpg"}
                  alt={`${brand.label} appliance in a luxury kitchen`}
                  loading="lazy"
                  style={{ width: "100%", aspectRatio: "16 / 10", objectFit: "cover", display: "block" }}
                />
              </picture>
              <div style={{ padding: "var(--space-lg)", display: "flex", flexDirection: "column", gap: "var(--space-sm)", flex: 1 }}>
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "var(--space-sm)" }}>
                  <h3 className="d-lg" style={{ margin: 0 }}>
                    {brand.label}
                  </h3>
                  <span className="eyebrow">{brand.line}</span>
                </div>
                <ul className="list-reset" style={{ display: "flex", flexDirection: "column", gap: "var(--space-xs)", marginTop: "var(--space-xs)" }}>
                  {brand.problems.slice(0, 5).map((p, j) => (
                    <li key={j} style={{ display: "flex", gap: "var(--space-xs)", alignItems: "flex-start" }}>
                      <CheckIcon size={18} style={{ color: "var(--color-primary)", flexShrink: 0, marginTop: "2px" }} />
                      <span style={{ color: "var(--color-body-strong)", fontSize: "15px" }}>{p.t}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={SITE.pages[0].href}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    color: "var(--color-ink)",
                    textDecoration: "none",
                    fontSize: "13px",
                    fontWeight: 700,
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    marginTop: "auto",
                  }}
                >
                  Everything we fix <ArrowIcon size={16} />
                </Link>
              </div>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function ReviewsBand() {
  return (
    <section
      style={{
        background: "var(--gradient-graphite)",
        padding: "var(--space-xxl) var(--space-lg)",
        borderTop: "1px solid var(--color-hairline)",
      }}
    >
      <div className="wrap">
        <Reveal style={{ display: "flex", alignItems: "center", gap: "var(--space-sm)", flexWrap: "wrap" }}>
          <Stars size={18} />
          <Eyebrow>Trusted across the Westside &amp; the Valley</Eyebrow>
        </Reveal>
        <Reveal className="grid cols-3" stagger={0.1} style={{ marginTop: "var(--space-lg)" }}>
          {REVIEWS.map((r, i) => (
            <figure
              key={i}
              style={{
                margin: 0,
                border: "1px solid var(--color-hairline)",
                background: "var(--color-surface-card)",
                padding: "var(--space-lg)",
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-sm)",
              }}
            >
              <blockquote style={{ margin: 0, color: "var(--color-body-strong)", fontSize: "16px", lineHeight: 1.5, fontWeight: 500 }}>
                “{r.q}”
              </blockquote>
              <figcaption style={{ marginTop: "auto", color: "var(--color-body)", fontSize: "13px", letterSpacing: "0.4px" }}>
                <span style={{ color: "var(--color-ink)", fontWeight: 600 }}>{r.n}</span> · {r.c}
              </figcaption>
            </figure>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function CitiesTeaser() {
  const flat = CITY_GROUPS.flatMap((g) => g.cities);
  return (
    <section style={{ background: "var(--color-canvas)", padding: "var(--space-xxl) var(--space-lg)" }}>
      <div
        className="wrap"
        style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "var(--space-md)" }}
      >
        <div style={{ maxWidth: "46ch" }}>
          <Eyebrow>Where we work</Eyebrow>
          <h2 className="d-lg" style={{ marginTop: "var(--space-xs)" }}>
            At your door across {SITE.region}.
          </h2>
        </div>
        <Button variant="outline" href={SITE.pages[1].href}>
          See every city
        </Button>
      </div>
      <Reveal className="wrap" stagger={0.03} style={{ marginTop: "var(--space-lg)", display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {flat.slice(0, 16).map((c, i) => (
          <span
            key={i}
            style={{
              border: "1px solid var(--color-hairline)",
              color: "var(--color-body-strong)",
              fontSize: "13px",
              padding: "8px 14px",
              letterSpacing: "0.3px",
            }}
          >
            {c}
          </span>
        ))}
      </Reveal>
    </section>
  );
}

/* The full home-page body (everything below the hero). Reused by the home page
   and by the keyword landing pages so they share the same look. */
export function HomeBody() {
  return (
    <>
      <OneQuotePromise />
      <section
        style={{
          background: "var(--color-canvas)",
          padding: "var(--space-xl) var(--space-lg) var(--space-xxl)",
          borderBottom: "1px solid var(--color-hairline)",
        }}
      >
        <div
          className="wrap manifesto-grid"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-xl)", alignItems: "center" }}
        >
          <PhotoSlot
            src="/onyx-kitchen.jpg"
            webpSrc="/onyx-kitchen.webp"
            alt="A luxury kitchen with a Viking refrigerator built into the cabinetry and a Viking range"
            aspectRatio="16 / 11"
            style={{ border: "1px solid var(--color-hairline)" }}
          />
          <Reveal style={{ display: "flex", flexDirection: "column", gap: "var(--space-sm)" }}>
            <Eyebrow>The Onyx difference</Eyebrow>
            <p className="lede" style={{ maxWidth: "44ch" }}>
              We treat an $18,000 refrigerator the way a Bentley specialist treats a Bentley. Factory trained, genuine parts,
              and the discretion the finest homes in {SITE.region} expect.
            </p>
          </Reveal>
        </div>
      </section>
      <TrustBadges />
      <TrustBand />
      <ScopeBand />
      <HowWeWork />
      <Specialists />
      <AssuranceBand eyebrow="The Onyx standard" title="Service worthy of the kitchen it stands in." tone="light" />
      <ReviewsBand />
      <Faq />
      <JsonLd data={faqPageJsonLd(FAQS)} />
      <CitiesTeaser />
      <FinalCta />
    </>
  );
}
