/* ============================================================
   SEO + analytics single source of truth.
   ⚠️ Values prefixed PLACEHOLDER_ are owner-supplied. They are
   intentionally NOT emitted into live JSON-LD until replaced
   with real data (see isReal), so the structured data always
   passes Google's Rich Results test with zero invalid fields.
   Do NOT invent a license #, rating, geo, or tracking ID here.
   ============================================================ */
import { SITE, CITY_GROUPS } from "@/lib/site";

// Canonical production origin (apex 308-redirects to www).
export const SITE_URL = "https://www.onyxvikingservice.com";

// ---------- Analytics IDs ----------
export const GA4_ID = "G-XXXXXXXXXX"; // TODO(owner): real GA4 Measurement ID (Admin → Data Streams)
export const ADS_ID = "AW-18249301786"; // real Google Ads conversion ID (same Ads account)
export const ADS_LABELS = {
  book: "p3PUCL-V2sEcEJr--P1D", // real — booking conversion label
  call: "PLACEHOLDER_ADS_CALL_LABEL", // TODO(owner): create a "Call" conversion action, paste label
  form: "PLACEHOLDER_ADS_FORM_LABEL", // TODO(owner): create a "Form" conversion action, paste label
} as const;

// ---------- Business facts for structured data ----------
export const BUSINESS = {
  addressLocality: "Beverly Hills", // public service-area anchor (matches footer)
  addressRegion: "CA",
  streetAddress: "PLACEHOLDER_STREET", // TODO(owner): real street address or remove if service-area only
  postalCode: "PLACEHOLDER_ZIP", // TODO(owner)
  latitude: "PLACEHOLDER_LAT", // TODO(owner)
  longitude: "PLACEHOLDER_LNG", // TODO(owner)
  priceRange: "PLACEHOLDER_PRICE_RANGE", // TODO(owner): e.g. "$$$"
  cslbLicense: "PLACEHOLDER_CSLB_LICENSE", // TODO(owner): CSLB license number
  ratingValue: "PLACEHOLDER_RATING", // TODO(owner): real Google rating, e.g. "4.9"
  reviewCount: "PLACEHOLDER_REVIEW_COUNT", // TODO(owner): real Google review count
  googleProfileUrl: "PLACEHOLDER_GBP_URL", // TODO(owner): Google Business Profile review URL
  sameAs: [] as string[], // TODO(owner): GBP, Yelp, social URLs
};

/** True only for owner-filled real values (not PLACEHOLDER_/TODO sentinels). */
export const isReal = (v?: string): v is string =>
  !!v && !v.startsWith("PLACEHOLDER") && !v.startsWith("TODO");

const ALL_CITIES = CITY_GROUPS.flatMap((g) => g.cities);
const cityNodes = ALL_CITIES.map((c) => ({ "@type": "City", name: c }));

/** LocalBusiness graph — only emits owner-data fields once they are real. */
export function localBusinessJsonLd(): Record<string, unknown> {
  const graph: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": ["HomeAndConstructionBusiness", "LocalBusiness"],
    "@id": `${SITE_URL}/#business`,
    name: SITE.name,
    url: SITE_URL,
    telephone: SITE.phoneTel,
    image: `${SITE_URL}/og.jpg`,
    logo: `${SITE_URL}/onyx-mark.svg`,
    description:
      "Factory trained Viking appliance repair across Los Angeles & Southern California.",
    areaServed: cityNodes,
    knowsAbout: [
      "Viking refrigerator repair",
      "Viking wine cellar repair",
      "Viking range repair",
      "Viking oven repair",
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "07:00",
        closes: "19:00",
      },
    ],
  };

  const address: Record<string, string> = {
    "@type": "PostalAddress",
    addressLocality: BUSINESS.addressLocality,
    addressRegion: BUSINESS.addressRegion,
    addressCountry: "US",
  };
  if (isReal(BUSINESS.streetAddress)) address.streetAddress = BUSINESS.streetAddress;
  if (isReal(BUSINESS.postalCode)) address.postalCode = BUSINESS.postalCode;
  graph.address = address;

  if (isReal(BUSINESS.latitude) && isReal(BUSINESS.longitude)) {
    graph.geo = {
      "@type": "GeoCoordinates",
      latitude: BUSINESS.latitude,
      longitude: BUSINESS.longitude,
    };
  }
  if (isReal(BUSINESS.priceRange)) graph.priceRange = BUSINESS.priceRange;
  if (isReal(BUSINESS.cslbLicense)) {
    graph.hasCredential = {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "license",
      name: "CSLB Contractor License",
      identifier: BUSINESS.cslbLicense,
    };
  }
  if (BUSINESS.sameAs.length) graph.sameAs = BUSINESS.sameAs;
  // aggregateRating intentionally omitted until real rating + count are supplied.
  if (isReal(BUSINESS.ratingValue) && isReal(BUSINESS.reviewCount)) {
    graph.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: BUSINESS.ratingValue,
      reviewCount: BUSINESS.reviewCount,
    };
  }
  return graph;
}

/** The repair service offered, linked to the business. */
export function serviceJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Viking appliance repair",
    serviceType: "Luxury appliance repair",
    provider: { "@id": `${SITE_URL}/#business` },
    areaServed: cityNodes,
    offers: {
      "@type": "Offer",
      name: "Diagnostic visit",
      price: String(SITE.diagnosticFee),
      priceCurrency: "USD",
      description: "Flat diagnostic fee, credited in full toward your repair.",
    },
  };
}

/** Localized Service for a neighborhood landing page (areaServed = that city). */
export function neighborhoodServiceJsonLd(city: string, path: string): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Viking appliance repair in ${city}`,
    serviceType: "Luxury appliance repair",
    provider: { "@id": `${SITE_URL}/#business` },
    areaServed: { "@type": "City", name: city },
    url: `${SITE_URL}${path}`,
    offers: {
      "@type": "Offer",
      price: String(SITE.diagnosticFee),
      priceCurrency: "USD",
      description: "Flat diagnostic fee, credited in full toward your repair.",
    },
  };
}

/** FAQPage built from a page's actual Q&As. */
export function faqPageJsonLd(faqs: { q: string; a: string }[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** The single LocalBusiness node for a city page: areaServed + geo = that city.
 *  City pages emit this instead of the site-wide business node, so there is
 *  exactly one (non-conflicting) LocalBusiness per page. */
export function cityBusinessJsonLd(city: {
  name: string;
  slug: string;
  geo: { lat: number; lng: number };
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": ["HomeAndConstructionBusiness", "LocalBusiness"],
    "@id": `${SITE_URL}/#business`,
    name: SITE.name,
    url: `${SITE_URL}/viking-repair-${city.slug}`,
    telephone: SITE.phoneTel,
    image: `${SITE_URL}/og.jpg`,
    logo: `${SITE_URL}/onyx-mark.svg`,
    description: `Factory trained Viking appliance repair in ${city.name}, California.`,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: city.name,
      addressRegion: "CA",
      addressCountry: "US",
    },
    areaServed: { "@type": "City", name: city.name },
    geo: { "@type": "GeoCoordinates", latitude: city.geo.lat, longitude: city.geo.lng },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "07:00",
        closes: "19:00",
      },
    ],
  };
}

/** Service node for a city page, linked to the business. */
export function cityServiceJsonLd(city: { name: string; slug: string }): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Viking appliance repair in ${city.name}`,
    serviceType: "Luxury appliance repair",
    provider: { "@id": `${SITE_URL}/#business` },
    areaServed: { "@type": "City", name: city.name },
    url: `${SITE_URL}/viking-repair-${city.slug}`,
    offers: {
      "@type": "Offer",
      price: String(SITE.diagnosticFee),
      priceCurrency: "USD",
      description: "Flat diagnostic fee, credited in full toward your repair.",
    },
  };
}

export function websiteJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE_URL,
  };
}

/** Breadcrumb trail for a given page. */
export function breadcrumbJsonLd(items: { name: string; path: string }[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.path}`,
    })),
  };
}
