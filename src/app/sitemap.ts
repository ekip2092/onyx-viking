import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { CITIES, cityPath } from "@/lib/cities";

const LASTMOD = "2026-06-21";
const CORE = ["", "/about", "/cities", "/cities-we-serve", "/problems", "/contact", "/book"];

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [...CORE, ...CITIES.map((c) => cityPath(c.slug))];
  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: LASTMOD,
    changeFrequency: "monthly",
    priority: route === "" ? 1 : route.startsWith("/viking-repair-") ? 0.7 : 0.8,
  }));
}
