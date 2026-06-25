import type { Metadata } from "next";
import citiesData from "@/data/cities.json";
import { SITE_URL } from "@/lib/seo";
import { getCityCopy } from "@/lib/cityCopy";

export type City = {
  slug: string;
  name: string;
  region: string;
  neighborhoods: string[];
  landmarks: string[];
  zips: string[];
  localAngle: string;
  faqHook: string;
  geo: { lat: number; lng: number };
};

export const CITIES = citiesData as City[];
export const CITY_BY_SLUG: Record<string, City> = Object.fromEntries(CITIES.map((c) => [c.slug, c]));
export const getCity = (slug: string): City | undefined => CITY_BY_SLUG[slug];

/** URL for a city page. */
export const cityPath = (slug: string) => `/viking-repair-${slug}`;

/** 4-6 contextual sibling cities, same region first, for internal linking. */
export function nearbyCities(slug: string, count = 5): City[] {
  const city = getCity(slug);
  if (!city) return [];
  const sameRegion = CITIES.filter((c) => c.region === city.region && c.slug !== slug);
  const others = CITIES.filter((c) => c.region !== city.region && c.slug !== slug);
  return [...sameRegion, ...others].slice(0, count);
}

/** Per-page metadata: title (<=60), unique meta description (from cityCopy),
 *  self canonical (www), OG/Twitter with the city hero as the share image. */
export function cityMetadata(city: City): Metadata {
  const copy = getCityCopy(city.slug);
  const title = `Viking Repair in ${city.name}, CA | Onyx`;
  const description =
    copy?.metaDescription ??
    `Factory trained Viking repair in ${city.name}. Flat $95 diagnostic, genuine parts. Call (877) 778-0227.`;
  const url = `${SITE_URL}${cityPath(city.slug)}`;
  const image = `${SITE_URL}/images/cities/${city.slug}-hero.jpg`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: cityPath(city.slug) },
    openGraph: {
      type: "website",
      title,
      description,
      url,
      images: [{ url: image, alt: `Viking repair in ${city.name}, CA` }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}
