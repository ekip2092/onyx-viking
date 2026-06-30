import type { Metadata } from "next";
import { Shell } from "@/components/layout/Shell";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { CITY_IMAGES } from "@/lib/cityImages";

export const metadata: Metadata = {
  title: "Photo Credits",
  description:
    "Attribution for the city photographs used on this site, sourced from Wikimedia Commons under their respective licenses.",
  alternates: { canonical: "/photo-credits" },
  robots: { index: false, follow: true },
};

export default function PhotoCreditsPage() {
  const entries = Object.entries(CITY_IMAGES).sort((a, b) => a[0].localeCompare(b[0]));
  return (
    <Shell>
      <section style={{ background: "var(--color-canvas)", padding: "var(--space-super) var(--space-lg) var(--space-xxl)" }}>
        <div className="wrap" style={{ maxWidth: 820 }}>
          <Eyebrow>Attribution</Eyebrow>
          <h1 className="d-xl" style={{ marginTop: "var(--space-xs)", maxWidth: "20ch" }}>
            Photo credits
          </h1>
          <p className="lede" style={{ marginTop: "var(--space-sm)", maxWidth: "60ch" }}>
            City photographs on this site are sourced from Wikimedia Commons and used under the
            licenses noted below. All other imagery is our own.
          </p>

          <ul className="list-reset" style={{ marginTop: "var(--space-lg)", display: "flex", flexDirection: "column", gap: "var(--space-xs)" }}>
            {entries.map(([name, info]) => (
              <li
                key={name}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "var(--space-sm)",
                  flexWrap: "wrap",
                  borderBottom: "1px solid var(--color-hairline)",
                  padding: "10px 0",
                }}
              >
                <span style={{ color: "var(--color-ink)", fontWeight: 600, minWidth: "12ch" }}>{name}</span>
                <span className="body" style={{ flex: 1, minWidth: "24ch" }}>
                  {info.artist || "Unknown author"}
                  {info.license ? ` · ${info.license}` : ""}
                </span>
                <a
                  href={info.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "var(--color-primary)", textDecoration: "none", fontSize: "13px", whiteSpace: "nowrap" }}
                >
                  Source ↗
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Shell>
  );
}
