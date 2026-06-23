import { Eyebrow } from "@/components/ui/Eyebrow";

/* City FAQ rendered with native <details> (no client JS). The matching
   FAQPage JSON-LD is emitted separately from the same data. */
export function CityFaq({ city, faqs }: { city: string; faqs: { q: string; a: string }[] }) {
  return (
    <section style={{ background: "var(--color-canvas)", padding: "var(--space-xxl) var(--space-lg)", borderTop: "1px solid var(--color-hairline)" }}>
      <div className="wrap" style={{ maxWidth: "74ch" }}>
        <Eyebrow>Local questions</Eyebrow>
        <h2 className="d-xl" style={{ marginTop: "var(--space-xs)", maxWidth: "22ch" }}>
          {city} questions, answered.
        </h2>
        <div style={{ marginTop: "var(--space-lg)", borderTop: "1px solid var(--color-hairline)" }}>
          {faqs.map((f, i) => (
            <details key={i} style={{ borderBottom: "1px solid var(--color-hairline)" }}>
              <summary
                style={{
                  cursor: "pointer",
                  padding: "var(--space-md) 0",
                  color: "var(--color-ink)",
                  fontSize: "17px",
                  fontWeight: 600,
                  listStyle: "none",
                }}
              >
                {f.q}
              </summary>
              <p className="body" style={{ padding: "0 0 var(--space-md)", maxWidth: "68ch" }}>
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
