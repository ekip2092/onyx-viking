import type { Metadata } from "next";
import Link from "next/link";
import { CITIES, cityPath, type City } from "@/lib/cities";
import { SITE } from "@/lib/site";
import { breadcrumbJsonLd } from "@/lib/seo";
import { Shell } from "@/components/layout/Shell";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { ArrowIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/anim/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/city/Breadcrumbs";
import { FinalCta } from "@/components/sections/Landing";

export const metadata: Metadata = {
  title: { absolute: "Viking Repair Across Los Angeles & Southern California | Onyx" },
  description:
    `Factory trained Viking repair across ${CITIES.length} cities in Los Angeles and Southern California. Flat $95 diagnostic, genuine parts. Call (747) 777-5883.`,
  alternates: { canonical: "/cities-we-serve" },
  openGraph: {
    type: "website",
    title: "Viking Repair Across Los Angeles & Southern California | Onyx",
    description:
      `Factory trained Viking repair across ${CITIES.length} cities in Los Angeles and Southern California.`,
    url: "https://www.onyxvikingservice.com/cities-we-serve",
  },
};

// Normalise the verbose region strings into clean groupings.
const groupOf = (region: string) => region.split(" / ")[0];
const ORDER = ["Westside", "Central LA", "South Bay", "San Fernando Valley", "San Gabriel Valley", "Verdugos", "Conejo Valley", "Santa Monica Mountains", "Orange County", "Santa Barbara"];

const anchor = (name: string, i: number) =>
  [`Viking repair in ${name}`, `${name} appliance repair`, `Viking service in ${name}`][i % 3];

export default function Page() {
  const groups = new Map<string, City[]>();
  for (const c of CITIES) {
    const g = groupOf(c.region);
    if (!groups.has(g)) groups.set(g, []);
    groups.get(g)!.push(c);
  }
  const regions = [...groups.keys()].sort((a, b) => {
    const ia = ORDER.indexOf(a), ib = ORDER.indexOf(b);
    return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
  });

  return (
    <Shell active="cities">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Cities We Serve", path: "/cities-we-serve" },
        ])}
      />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Cities We Serve" }]} />

      <section style={{ background: "var(--color-canvas)", borderBottom: "1px solid var(--color-hairline)" }}>
        <Reveal className="wrap" style={{ padding: "var(--space-xl) var(--space-lg) var(--space-xxl)" }}>
          <Eyebrow>Service area · {SITE.region}</Eyebrow>
          <h1 className="d-mega" style={{ marginTop: "var(--space-sm)", maxWidth: "18ch" }}>
            Viking appliance repair across Los Angeles &amp; Southern California.
          </h1>
          <p className="lede" style={{ marginTop: "var(--space-md)", maxWidth: "60ch" }}>
            Factory trained service for {CITIES.length} cities, from the gated estates of the Westside to the
            foothill and canyon homes of the Valley and the coast. Choose your city for local detail, or call and
            we will confirm the same day window for your address.
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

      {regions.map((region) => (
        <section
          key={region}
          style={{ background: "var(--color-canvas)", padding: "var(--space-xl) var(--space-lg)", borderTop: "1px solid var(--color-hairline)" }}
        >
          <div className="wrap">
            <Eyebrow>{region}</Eyebrow>
            <Reveal className="grid cols-3" stagger={0.03} style={{ marginTop: "var(--space-md)", gap: "var(--space-sm)" }}>
              {groups.get(region)!.map((c, i) => (
                <Link
                  key={c.slug}
                  href={cityPath(c.slug)}
                  style={{
                    border: "1px solid var(--color-hairline)",
                    background: "var(--color-surface-card)",
                    padding: "var(--space-md)",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "8px",
                  }}
                >
                  <span style={{ color: "var(--color-ink)", fontSize: "15px", fontWeight: 600 }}>{anchor(c.name, i)}</span>
                  <ArrowIcon size={15} style={{ color: "var(--color-primary)", flexShrink: 0 }} />
                </Link>
              ))}
            </Reveal>
          </div>
        </section>
      ))}

      <FinalCta />
    </Shell>
  );
}
