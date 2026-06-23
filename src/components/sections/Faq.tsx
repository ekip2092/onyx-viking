"use client";

import { useState } from "react";
import { FAQS } from "@/lib/site";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/anim/Reveal";

/* "Questions, answered" — an elegant accordion. First item open by default. */
export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      style={{
        background: "var(--color-canvas)",
        padding: "var(--space-xxl) var(--space-lg)",
        borderTop: "1px solid var(--color-hairline)",
      }}
    >
      <div className="wrap" style={{ maxWidth: 820 }}>
        <Reveal>
          <Eyebrow>Questions, answered</Eyebrow>
          <h2 className="d-xl" style={{ marginTop: "var(--space-xs)" }}>
            The details that matter.
          </h2>
        </Reveal>

        <Reveal style={{ marginTop: "var(--space-lg)", borderTop: "1px solid var(--color-hairline)" }}>
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i} style={{ borderBottom: "1px solid var(--color-hairline)" }}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "var(--space-md)",
                    padding: "var(--space-md) 0",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                    color: "var(--color-ink)",
                    fontFamily: "var(--font-family)",
                    fontSize: "18px",
                    fontWeight: 600,
                  }}
                >
                  <span>{f.q}</span>
                  <span
                    aria-hidden="true"
                    style={{
                      color: "var(--color-primary)",
                      fontSize: "26px",
                      lineHeight: 1,
                      flexShrink: 0,
                      transition: "transform 220ms ease",
                      transform: isOpen ? "rotate(45deg)" : "none",
                    }}
                  >
                    +
                  </span>
                </button>
                <div
                  style={{
                    overflow: "hidden",
                    maxHeight: isOpen ? "400px" : "0",
                    transition: "max-height 300ms ease",
                  }}
                >
                  <p className="body" style={{ paddingBottom: "var(--space-md)", maxWidth: "64ch", fontSize: "15px" }}>
                    {f.a}
                  </p>
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
