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
          <Eyebrow>The Onyx One Quote Promise</Eyebrow>
          <h2 className="d-xl" style={{ marginTop: "var(--space-xs)" }}>
            One Quote. One Price. Guaranteed.
          </h2>
          <p className="lede" style={{ marginTop: "var(--space-sm)" }}>
            No supplemental estimates. No revised numbers. Ever.
          </p>
        </Reveal>
        <Reveal style={{ marginTop: "var(--space-lg)", display: "flex", flexDirection: "column", gap: "var(--space-sm)" }}>
          <p className="body" style={{ fontSize: "16px", maxWidth: "64ch", color: "var(--color-body-strong)" }}>
            When our technician diagnoses your Viking, we quote one price to fix that problem completely. That
            number is final, not a starting point we revise once the work begins.
          </p>
          <p className="body" style={{ fontSize: "16px", maxWidth: "64ch" }}>
            We don’t bill by the part or by the hour. Your price covers getting the problem you called about
            fixed, with the work guaranteed and a three year warranty behind it. Sometimes a repair runs deeper
            than anyone could see from the outside. Maybe it needs extra parts, or even a second visit to finish
            the job properly. The price still doesn’t move. The difference is ours to absorb, not yours.
          </p>
          <p className="body" style={{ fontSize: "16px", maxWidth: "64ch", color: "var(--color-body-strong)" }}>
            Some jobs cost us more than we quoted. We finish them anyway. That’s what a quote means here.
          </p>
          <p className="body" style={{ fontSize: "14px", maxWidth: "64ch" }}>
            Your quote covers the problem we diagnosed, fixed completely. If we ever notice something separate,
            a different issue that has nothing to do with why you called, we’ll walk you through it and quote it
            as its own job. Nothing is added to your bill unless you ask us to fix it.
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
            Every repair is backed by a three year parts and labor warranty, in writing.
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
