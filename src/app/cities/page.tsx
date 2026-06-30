import type { Metadata } from "next";
import Link from "next/link";
import { SITE, FEATURED_CITIES } from "@/lib/site";
import { CITIES, cityPath, getCity, type City } from "@/lib/cities";
import { Shell } from "@/components/layout/Shell";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ArrowIcon } from "@/components/ui/Icons";
import { PhotoSlot } from "@/components/ui/PhotoSlot";
import { PicImage } from "@/components/city/PicImage";
import { cityImage } from "@/lib/cityImages";
import { HeaderVideoBg } from "@/components/sections/HeaderVideoBg";
import { PhotoLede } from "@/components/sections/PhotoLede";
import { Reveal } from "@/components/anim/Reveal";

// Soft legibility shadow for header copy sitting over the background video.
const headerShadow = "0 1px 14px rgba(0,0,0,0.55), 0 1px 3px rgba(0,0,0,0.45)";

const toSlug = (name: string) =>
  name
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const heroBase = (slug: string) => `/images/cities/${slug}-hero`;
const groupOf = (region: string) => region.split(" / ")[0];
const ORDER = ["Westside", "Central LA", "South Bay", "San Fernando Valley", "San Gabriel Valley", "Verdugos", "Conejo Valley", "Santa Monica Mountains", "Orange County", "Santa Barbara"];

/* City photo: a real Wikimedia city view where we have one, otherwise the city
   page hero (with a brand-gradient fallback). Every card gets a photo. */
function CardImage({ name, slug }: { name: string; slug: string }) {
  const wiki = cityImage(name)?.img;
  if (wiki) {
    return <PhotoSlot src={wiki} alt={`Viking repair in ${name}, CA`} aspectRatio="16 / 10" />;
  }
  return <PicImage base={heroBase(slug)} alt={`Viking repair in ${name}, CA`} aspectRatio="16 / 10" />;
}

export const metadata: Metadata = {
  title: "Cities Served",
  description:
    "Same day and next day Viking repair across the Westside, the Valley, Pasadena, and the coast, from Beverly Hills to Malibu.",
  alternates: { canonical: "/cities" },
};

function CitiesHeader() {
  return (
    <section style={{ position: "relative", overflow: "hidden", background: "var(--color-canvas)", borderBottom: "1px solid var(--color-hairline)" }}>
      <HeaderVideoBg src="/tech-door_16x9_web.webm" poster="/tech-door_poster.jpg" objectPosition="center 18%" />
      <Reveal className="wrap" style={{ position: "relative", padding: "var(--space-super) var(--space-lg) var(--space-xxl)" }}>
        <Eyebrow style={{ color: "rgba(255,255,255,0.92)", textShadow: headerShadow }}>Service area · {SITE.region}</Eyebrow>
        <h1 className="d-mega hero-title" style={{ marginTop: "var(--space-sm)", maxWidth: "16ch", textShadow: headerShadow }}>
          At your door across Los Angeles.
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

function FeaturedCities() {
  // Only feature cities that have a dedicated page.
  const featured = FEATURED_CITIES.map((c) => ({ ...c, slug: toSlug(c.name) })).filter((c) => getCity(c.slug));
  return (
    <section style={{ background: "var(--color-canvas)", padding: "var(--space-xxl) var(--space-lg)" }}>
      <div className="wrap">
        <Reveal>
          <Eyebrow>Where we work most</Eyebrow>
          <h2 className="d-lg" style={{ marginTop: "var(--space-xs)" }}>
            Marquee neighbourhoods.
          </h2>
        </Reveal>
        <Reveal className="grid cols-3" stagger={0.08} style={{ marginTop: "var(--space-lg)" }}>
          {featured.map((c) => (
            <Link
              key={c.slug}
              href={cityPath(c.slug)}
              style={{
                border: "1px solid var(--color-hairline)",
                background: "var(--color-surface-card)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                textDecoration: "none",
              }}
            >
              <CardImage name={c.name} slug={c.slug} />
              <div style={{ padding: "var(--space-md)", display: "flex", flexDirection: "column", gap: "6px" }}>
                <h3 style={{ margin: 0, color: "var(--color-ink)", fontSize: "20px", fontWeight: 600 }}>{c.name}</h3>
                <p style={{ margin: 0, color: "var(--color-body)", fontSize: "13px" }}>{c.note}</p>
                <span
                  style={{
                    marginTop: "8px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    color: "var(--color-ink)",
                    fontSize: "12px",
                    fontWeight: 700,
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                  }}
                >
                  Repair in {c.name} <ArrowIcon size={15} />
                </span>
              </div>
            </Link>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function CityCard({ city }: { city: City }) {
  return (
    <Link
      href={cityPath(city.slug)}
      style={{
        border: "1px solid var(--color-hairline)",
        background: "var(--color-surface-card)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        textDecoration: "none",
      }}
    >
      <CardImage name={city.name} slug={city.slug} />
      <div style={{ padding: "12px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px" }}>
        <span style={{ color: "var(--color-ink)", fontSize: "15px", fontWeight: 600 }}>{city.name}</span>
        <ArrowIcon size={15} style={{ color: "var(--color-primary)", flexShrink: 0 }} />
      </div>
    </Link>
  );
}

function CityDirectory() {
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
    <section style={{ background: "var(--gradient-graphite)", padding: "var(--space-xxl) var(--space-lg)", borderTop: "1px solid var(--color-hairline)" }}>
      <div className="wrap">
        <Reveal>
          <Eyebrow>Full coverage</Eyebrow>
          <h2 className="d-lg" style={{ marginTop: "var(--space-xs)" }}>
            Every city we serve.
          </h2>
          <p className="body" style={{ marginTop: "var(--space-sm)", maxWidth: "56ch" }}>
            {CITIES.length} cities, each with its own local page. Choose yours for the detail.
          </p>
        </Reveal>

        {regions.map((region, i) => (
          <div key={region} style={{ marginTop: i === 0 ? "var(--space-lg)" : "var(--space-xl)" }}>
            <h3
              style={{
                margin: 0,
                paddingBottom: "var(--space-xs)",
                borderBottom: "1px solid var(--color-hairline)",
                color: "var(--color-ink)",
                fontSize: "var(--type-caption-uppercase-size)",
                fontWeight: 600,
                letterSpacing: "var(--type-caption-uppercase-tracking)",
                textTransform: "uppercase",
              }}
            >
              {region}
            </h3>
            <Reveal className="grid cols-4" stagger={0.04} style={{ marginTop: "var(--space-md)" }}>
              {groups.get(region)!.map((c) => (
                <CityCard key={c.slug} city={c} />
              ))}
            </Reveal>
          </div>
        ))}

        <p className="body" style={{ marginTop: "var(--space-xl)", maxWidth: "60ch" }}>
          Don’t see your city? We very likely cover it. Call{" "}
          <a href={"tel:" + SITE.phoneTel} style={{ color: "var(--color-ink)" }}>
            {SITE.phoneDisplay}
          </a>{" "}
          and we’ll confirm the same day window for your address.
        </p>
      </div>
    </section>
  );
}

export default function CitiesPage() {
  return (
    <Shell active="cities">
      <CitiesHeader />
      <PhotoLede image="/appliances/viking_fridge.jpg" alt="A built-in Viking refrigerator in a luxury kitchen" eyebrow="Across the region">
        From the estates of Bel Air to the coast at Malibu, a factory trained Onyx technician is rarely more than a
        short drive away. Same day and next day visits across the Westside, the Valley, and beyond.
      </PhotoLede>
      <FeaturedCities />
      <CityDirectory />
    </Shell>
  );
}
