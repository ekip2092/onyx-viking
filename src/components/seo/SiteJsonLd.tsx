import { JsonLd } from "@/components/seo/JsonLd";
import { localBusinessJsonLd, serviceJsonLd } from "@/lib/seo";

/* Site-wide business + service nodes, for non-city pages (home, about, the ad
   pages, the hub). City pages emit their own city-scoped LocalBusiness instead. */
export function SiteJsonLd() {
  return <JsonLd data={[localBusinessJsonLd(), serviceJsonLd()]} />;
}
