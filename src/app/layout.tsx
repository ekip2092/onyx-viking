import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/site";
import { SITE_URL, websiteJsonLd } from "@/lib/seo";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { Analytics } from "@/components/analytics/Analytics";
import { TelTracking } from "@/components/analytics/TelTracking";
import { JsonLd } from "@/components/seo/JsonLd";

/* Inter — the documented open-source substitute for the licensed
   FerrariSans brand face. Exposed as the --font-inter CSS variable,
   which globals.css maps onto --font-family. */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const TITLE = `${SITE.name} · White Glove Viking Repair`;
// Kept under 155 characters for clean SERP rendering.
const DESCRIPTION =
  "Factory trained Viking repair across Los Angeles & Southern California. Same day service, genuine parts, 3 year warranty. Call (877) 778-0227.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: `%s · ${SITE.name}`,
  },
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    images: [{ url: `${SITE_URL}/og.jpg`, width: 1200, height: 630, alt: SITE.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [`${SITE_URL}/og.jpg`],
  },
};

export const viewport: Viewport = {
  themeColor: "#181818",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Analytics />
        {children}
        {/* WebSite node is global; the business/service nodes are emitted per
            page (SiteJsonLd on non-city pages, city nodes on city pages) so a
            city page never carries a conflicting second LocalBusiness. */}
        <JsonLd data={websiteJsonLd()} />
        <CookieBanner />
        <TelTracking />
      </body>
    </html>
  );
}
