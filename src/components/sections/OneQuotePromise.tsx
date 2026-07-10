import { SITE } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/anim/Reveal";

/* "The Onyx One-Quote Promise" — the price guarantee. Sits immediately after
   the hero, before any services or about content, on the home page and every
   keyword landing page (both render HomeBody). */
export function OneQuotePromise() {
  return (
    <section
      style={{
        background: "var(--gradient-graphite)",
        borderBottom: "1px solid var(--color-hairline)",
        padding: "var(--space-xxl) var(--space-lg)",
      }}
    >
      <div className="wrap" style={{ maxWidth: 820 }}>
        <Reveal>
          <Eyebrow>The Onyx One-Quote Promise</Eyebrow>
          <h2 className="d-xl" style={{ marginTop: "var(--space-xs)" }}>
            One Quote. One Price. Guaranteed.
          </h2>
          <p className="lede" style={{ marginTop: "var(--space-sm)" }}>
            No supplemental estimates. No revised numbers. Ever.
          </p>
        </Reveal>
        <Reveal style={{ marginTop: "var(--space-lg)", display: "flex", flexDirection: "column", gap: "var(--space-sm)" }}>
          <p className="body" style={{ fontSize: "16px", maxWidth: "64ch", color: "var(--color-body-strong)" }}>
            When our technician diagnoses your Viking, we quote one price to fix that problem — completely. That
            number is final. Not a starting point. Not an estimate.
          </p>
          <p className="body" style={{ fontSize: "16px", maxWidth: "64ch" }}>
            You’re not paying for parts and labor. You’re paying for one thing: the problem you called about —
            solved, guaranteed, and warrantied for three years. If the repair runs deeper than anyone could see
            from the outside — more parts, more labor, a return visit to finish the job — the price doesn’t move.
            The difference is ours to absorb, not yours.
          </p>
          <p className="body" style={{ fontSize: "16px", maxWidth: "64ch", color: "var(--color-body-strong)" }}>
            Some jobs cost us more than we quoted. We finish them anyway. That’s what a quote means here.
          </p>
          <p className="body" style={{ fontSize: "14px", maxWidth: "64ch" }}>
            Your quote covers the problem we diagnosed, fixed completely. If we ever notice something separate —
            a different issue, unrelated to why you called — we’ll show you, explain it, and quote it on its own.
            Nothing is added to your bill unless you ask us to fix it.
          </p>
          <p
            style={{
              margin: 0,
              marginTop: "var(--space-xs)",
              paddingTop: "var(--space-sm)",
              borderTop: "1px solid var(--color-hairline)",
              color: "var(--color-ink)",
              fontSize: "16px",
              lineHeight: 1.65,
              fontWeight: 600,
              maxWidth: "64ch",
            }}
          >
            Every repair is backed by a 3-year parts-and-labor warranty — in writing.
          </p>
        </Reveal>
        <Reveal style={{ marginTop: "var(--space-lg)", display: "flex", gap: "var(--space-xs)", flexWrap: "wrap" }}>
          <Button variant="primary" href={"tel:" + SITE.phoneTel}>
            Call {SITE.phoneDisplay}
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
