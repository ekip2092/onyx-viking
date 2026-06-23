import { ASSURANCES } from "@/lib/site";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/anim/Reveal";

/* The 6 "Onyx standard" assurances. Shared by Home and About. Supports a
   light (white editorial) tone to brighten the page, with the scarce red
   top-border kept as the accent. */
export function AssuranceBand({
  eyebrow,
  title,
  tone = "dark",
}: {
  eyebrow: string;
  title: string;
  tone?: "dark" | "light";
}) {
  const light = tone === "light";
  const ink = light ? "var(--color-body-on-light)" : "var(--color-ink)";
  const body = light ? "var(--color-muted-on-light)" : "var(--color-body)";

  return (
    <section
      style={{
        background: light ? "var(--color-canvas-light)" : "var(--color-canvas)",
        borderTop: `1px solid ${light ? "var(--color-hairline-on-light)" : "var(--color-hairline)"}`,
        padding: "var(--space-xxl) var(--space-lg)",
      }}
    >
      <div className="wrap">
        <Reveal style={{ maxWidth: "60ch" }}>
          <Eyebrow style={{ color: light ? "var(--color-muted-on-light)" : "var(--color-body)" }}>{eyebrow}</Eyebrow>
          <h2 className="d-xl" style={{ color: ink, marginTop: "var(--space-xs)" }}>
            {title}
          </h2>
        </Reveal>
        <Reveal className="grid cols-3" stagger={0.08} style={{ marginTop: "var(--space-lg)" }}>
          {ASSURANCES.map((a, i) => (
            <div key={i} style={{ borderTop: "2px solid var(--color-primary)", paddingTop: "var(--space-sm)" }}>
              <h3 style={{ margin: 0, color: ink, fontSize: "17px", fontWeight: 600, lineHeight: 1.3 }}>
                {a.t}
              </h3>
              <p className="body" style={{ marginTop: "var(--space-xs)", color: body }}>
                {a.d}
              </p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
