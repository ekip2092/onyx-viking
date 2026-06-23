import type { Metadata } from "next";
import { LANDING_PAGES, landingMetadata } from "@/lib/landingPages";
import { HomeStyleLanding } from "@/components/landing/HomeStyleLanding";

const data = LANDING_PAGES["viking-oven-repair-la"];
export const metadata: Metadata = landingMetadata(data);

export default function Page() {
  return <HomeStyleLanding data={data} />;
}
