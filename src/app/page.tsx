import { Shell } from "@/components/layout/Shell";
import { HomeHero } from "@/components/sections/HomeHero";
import { HomeBody } from "@/components/sections/HomeBody";

export default function HomePage() {
  return (
    <Shell active="home">
      <HomeHero />
      <HomeBody />
    </Shell>
  );
}
