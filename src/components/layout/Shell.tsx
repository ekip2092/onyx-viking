import type { ReactNode } from "react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { StickyCallBar } from "./StickyCallBar";
import { SiteJsonLd } from "@/components/seo/SiteJsonLd";

/* Frames every page: sticky nav, main content, footer, mobile call bar.
   Emits the site-wide LocalBusiness + Service JSON-LD by default; city pages
   pass business={false} and emit their own city-scoped business node instead. */
export function Shell({
  active,
  business = true,
  children,
}: {
  active?: string;
  business?: boolean;
  children: ReactNode;
}) {
  return (
    <>
      {business ? <SiteJsonLd /> : null}
      <Nav active={active} />
      <main>{children}</main>
      <Footer />
      <StickyCallBar />
    </>
  );
}
