import type { LandingPage } from "@/lib/landingPages";
import { Shell } from "@/components/layout/Shell";
import { HomeHero } from "@/components/sections/HomeHero";
import { HomeBody } from "@/components/sections/HomeBody";

/* A keyword landing page that mirrors the home page: same hero background video,
   same sections, same imagery, same nav and footer. Only the hero headline and
   subhead are keyword matched to the ad. Rendered noindex (see landingMetadata). */
export function HomeStyleLanding({ data }: { data: LandingPage }) {
  return (
    <Shell>
      <HomeHero h1={data.h1} subhead={data.subhead} />
      <HomeBody />
    </Shell>
  );
}
