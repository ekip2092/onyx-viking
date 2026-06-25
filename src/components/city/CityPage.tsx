import Link from "next/link";
import type { City } from "@/lib/cities";
import type { CityCopy } from "@/lib/cityCopy";
import { nearbyCities, cityPath } from "@/lib/cities";
import { SITE, REFRIGERATION, COOKING, type Brand } from "@/lib/site";
import { cityBusinessJsonLd, cityServiceJsonLd, breadcrumbJsonLd, faqPageJsonLd } from "@/lib/seo";
import { Shell } from "@/components/layout/Shell";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { CheckIcon, ArrowIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/anim/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { PicImage } from "@/components/city/PicImage";
import { Breadcrumbs } from "@/components/city/Breadcrumbs";
import { CityFaq } from "@/components/city/CityFaq";
import { FinalCta } from "@/components/sections/Landing";

const heroShadow = "0 1px 14px rgba(0,0,0,0.55), 0 1px 3px rgba(0,0,0,0.45)";

const WHY = [
  { t: "Factory trained specialists", d: "Vetted, uniformed technicians who work on Viking and nothing else." },
  { t: "Genuine factory parts", d: "Only Viking OEM components, sourced direct. No aftermarket substitutes." },
  { t: "White glove home protection", d: "Floors, stone, and cabinetry are draped and protected before a single panel comes off." },
  { t: `Flat $${SITE.diagnosticFee} diagnostic`, d: "A fixed diagnostic fee, credited in full toward your repair. No hourly meter, no surprises." },
  { t: "Concierge scheduling", d: "One point of contact, arrival windows kept, and updates by text or call, whichever you prefer." },
  { t: "Licensed and insured", d: `Bonded and fully insured on every visit. ${SITE.bearReg}.` },
];

/* One brand's service band (Viking), with a supporting photo. */
function ServicesBand({ brand, city, image, eyebrow, flip }: { brand: Brand; city: string; image: string; eyebrow: string; flip?: boolean }) {
  return (
    <section style={{ background: "var(--color-canvas)", padding: "var(--space-xxl) var(--space-lg)", borderTop: "1px solid var(--color-hairline)" }}>
      <div
        className="wrap manifesto-grid"
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-xl)", alignItems: "center" }}
      >
        <div style={{ order: flip ? 2 : 1 }}>
          <PicImage
            base={image}
            alt={`${brand.label} appliance repair in ${city}, CA by an Onyx technician`}
            aspectRatio="16 / 11"
            style={{ border: "1px solid var(--color-hairline)" }}
          />
        </div>
        <Reveal style={{ order: flip ? 1 : 2 }}>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="d-lg" style={{ marginTop: "var(--space-xs)" }}>
            {brand.label} repair in {city}.
          </h2>
          <p className="body" style={{ marginTop: "var(--space-sm)", fontSize: "16px", maxWidth: "46ch" }}>
            {brand.line}. Factory trained service with genuine parts, restored to the manufacturer&apos;s specification.
          </p>
          <ul className="list-reset" style={{ marginTop: "var(--space-md)", display: "flex", flexDirection: "column", gap: "var(--space-xs)" }}>
            {brand.problems.slice(0, 6).map((p, i) => (
              <li key={i} style={{ display: "flex", gap: "var(--space-xs)", alignItems: "flex-start" }}>
                <CheckIcon size={18} style={{ color: "var(--color-primary)", flexShrink: 0, marginTop: "3px" }} />
                <span style={{ color: "var(--color-body-strong)", fontSize: "15px" }}>{p.t}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

const siblingAnchor = (name: string, i: number) =>
  [`Viking repair in ${name}`, `${name} appliance repair`, `Repair in ${name}`][i % 3];

export function CityPage({ city, copy }: { city: City; copy: CityCopy }) {
  const path = cityPath(city.slug);
  const siblings = nearbyCities(city.slug, 6);

  return (
    <Shell active="cities" business={false}>
      <JsonLd
        data={[
          cityBusinessJsonLd(city),
          cityServiceJsonLd(city),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Cities We Serve", path: "/cities-we-serve" },
            { name: city.name, path },
          ]),
          faqPageJsonLd(copy.faqs),
        ]}
      />

      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Cities We Serve", href: "/cities-we-serve" },
          { name: `${city.name}, CA` },
        ]}
      />

      {/* Hero */}
      <section style={{ position: "relative", overflow: "hidden", background: "var(--color-canvas)", borderBottom: "1px solid var(--color-hairline)" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <PicImage base={`/images/cities/${city.slug}-hero`} alt={`Viking refrigerator repair in ${city.name}, CA by an Onyx technician`} priority />
        </div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background: "linear-gradient(180deg, rgba(20,20,20,0.78) 0%, rgba(20,20,20,0.6) 44%, rgba(20,20,20,0.92) 100%)",
          }}
        />
        <Reveal className="wrap" style={{ position: "relative", padding: "var(--space-super) var(--space-lg) var(--space-xxl)" }}>
          <Eyebrow style={{ color: "rgba(255,255,255,0.92)", textShadow: heroShadow }}>Viking appliance repair · {city.region}</Eyebrow>
          <h1 className="d-mega hero-title" style={{ marginTop: "var(--space-sm)", maxWidth: "18ch", textShadow: heroShadow }}>
            Viking appliance repair · {city.name}, CA
          </h1>
          <p className="lede video-lede" style={{ marginTop: "var(--space-md)", maxWidth: "56ch", color: "rgba(255,255,255,0.9)", textShadow: heroShadow }}>
            {copy.subhead}
          </p>
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

      {/* Intro / unique local angle */}
      <section style={{ background: "var(--color-canvas)", padding: "var(--space-xxl) var(--space-lg)" }}>
        <div className="wrap" style={{ maxWidth: "76ch" }}>
          <Eyebrow>Repair across {city.name}</Eyebrow>
          <Reveal style={{ marginTop: "var(--space-md)", display: "flex", flexDirection: "column", gap: "var(--space-md)" }}>
            {copy.intro.map((p, i) => (
              <p key={i} className={i === 0 ? "lede" : "body"} style={{ maxWidth: "72ch", ...(i === 0 ? {} : { fontSize: "16px" }) }}>
                {p}
              </p>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Services offered: the full Viking line, balanced */}
      <ServicesBand brand={REFRIGERATION} city={city.name} image="/images/support/viking-kitchen-1" eyebrow="Viking · Refrigeration" />
      <ServicesBand brand={COOKING} city={city.name} image="/images/support/viking-kitchen-2" eyebrow="Viking · Cooking" flip />

      {/* Why Onyx / trust */}
      <section style={{ background: "var(--gradient-graphite)", padding: "var(--space-xxl) var(--space-lg)", borderTop: "1px solid var(--color-hairline)" }}>
        <div className="wrap">
          <Reveal style={{ display: "flex", alignItems: "center", gap: "var(--space-lg)", flexWrap: "wrap", justifyContent: "space-between" }}>
            <div>
              <Eyebrow>Why Onyx</Eyebrow>
              <h2 className="d-xl" style={{ marginTop: "var(--space-xs)", maxWidth: "20ch" }}>
                The care your kitchen deserves.
              </h2>
            </div>
            <div style={{ width: "min(360px, 100%)" }}>
              <PicImage base="/images/support/onyx-technician" alt={`An Onyx technician servicing a Viking appliance in ${city.name}, CA`} aspectRatio="16 / 10" style={{ border: "1px solid var(--color-hairline)" }} />
            </div>
          </Reveal>
          <Reveal className="grid cols-3" stagger={0.05} style={{ marginTop: "var(--space-lg)", gap: "var(--space-md)" }}>
            {WHY.map((w, i) => (
              <div key={i} style={{ borderTop: "2px solid var(--color-primary)", paddingTop: "var(--space-sm)" }}>
                <h3 style={{ margin: 0, color: "var(--color-ink)", fontSize: "16px", fontWeight: 600 }}>{w.t}</h3>
                <p className="body" style={{ marginTop: "6px" }}>{w.d}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Neighborhoods served (unique per city) */}
      <section style={{ background: "var(--color-canvas)", padding: "var(--space-xxl) var(--space-lg)", borderTop: "1px solid var(--color-hairline)" }}>
        <div className="wrap" style={{ maxWidth: "80ch" }}>
          <Eyebrow>Neighbourhoods we cover</Eyebrow>
          <h2 className="d-lg" style={{ marginTop: "var(--space-xs)", maxWidth: "24ch" }}>
            At your door across {city.name}.
          </h2>
          <p className="body" style={{ marginTop: "var(--space-sm)", maxWidth: "64ch" }}>
            From {city.landmarks.slice(0, 2).join(" to ")}, an Onyx technician serves the homes of{" "}
            {city.name} and the surrounding {city.region}.
          </p>
          <div style={{ marginTop: "var(--space-md)", display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {city.neighborhoods.map((n, i) => (
              <span key={i} style={{ border: "1px solid var(--color-hairline)", color: "var(--color-body-strong)", fontSize: "13px", padding: "8px 14px", letterSpacing: "0.3px" }}>
                {n}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Local FAQ */}
      <CityFaq city={city.name} faqs={copy.faqs} />

      {/* Guarantee / value band (no fabricated reviews) */}
      <section style={{ background: "var(--gradient-rosso)", padding: "var(--space-xxl) var(--space-lg)" }}>
        <div className="wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--space-lg)", flexWrap: "wrap" }}>
          <div style={{ maxWidth: "48ch" }}>
            <Eyebrow style={{ color: "rgba(255,255,255,0.82)" }}>The Onyx guarantee</Eyebrow>
            <h2 className="d-xl" style={{ marginTop: "8px" }}>
              Three years, manufacturer backed, on parts and labour.
            </h2>
            <p className="lede" style={{ color: "rgba(255,255,255,0.92)", marginTop: "var(--space-sm)" }}>
              A flat ${SITE.diagnosticFee} diagnostic, credited in full toward your repair, and 24 years on luxury appliances behind every visit.
            </p>
          </div>
          <Button variant="outline" href={"tel:" + SITE.phoneTel} style={{ borderColor: "#fff", color: "#fff" }}>
            Call {SITE.phoneDisplay}
          </Button>
        </div>
      </section>

      {/* Nearby sibling cities (varied anchors) */}
      <section style={{ background: "var(--color-canvas)", padding: "var(--space-xxl) var(--space-lg)", borderTop: "1px solid var(--color-hairline)" }}>
        <div className="wrap">
          <Eyebrow>Nearby</Eyebrow>
          <h2 className="d-lg" style={{ marginTop: "var(--space-xs)" }}>
            We also serve, close to {city.name}.
          </h2>
          <div className="grid cols-3" style={{ marginTop: "var(--space-lg)", gap: "var(--space-md)" }}>
            {siblings.map((s, i) => (
              <Link
                key={s.slug}
                href={cityPath(s.slug)}
                style={{ border: "1px solid var(--color-hairline)", background: "var(--color-surface-card)", padding: "var(--space-md)", textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px" }}
              >
                <span style={{ color: "var(--color-ink)", fontSize: "15px", fontWeight: 600 }}>{siblingAnchor(s.name, i)}</span>
                <ArrowIcon size={15} style={{ color: "var(--color-primary)", flexShrink: 0 }} />
              </Link>
            ))}
          </div>
          <p className="body" style={{ marginTop: "var(--space-lg)" }}>
            <Link href="/cities-we-serve" style={{ color: "var(--color-ink)" }}>
              See every city we serve
            </Link>{" "}
            across {SITE.region}.
          </p>
        </div>
      </section>

      <FinalCta />
    </Shell>
  );
}
