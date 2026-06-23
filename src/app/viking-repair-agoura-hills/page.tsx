import type { Metadata } from "next";
import { getCity, cityMetadata } from "@/lib/cities";
import { getCityCopy } from "@/lib/cityCopy";
import { CityPage } from "@/components/city/CityPage";

const city = getCity("agoura-hills")!;
export const metadata: Metadata = cityMetadata(city);

export default function Page() {
  return <CityPage city={city} copy={getCityCopy("agoura-hills")!} />;
}
