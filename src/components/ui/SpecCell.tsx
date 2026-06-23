"use client";

import { useRef, type CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsoLayoutEffect } from "@/components/anim/useIsoLayoutEffect";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type SpecCellProps = {
  value: string;
  unit?: string;
  label?: string;
  accent?: boolean;
  align?: "left" | "center";
  style?: CSSProperties;
};

/**
 * Oversized spec numeral. On scroll-in the number counts up — a single,
 * understated flourish appropriate for a luxury stat band. The numeral is
 * the hero of the line; the unit and label stay quiet. Reduced-motion and
 * non-numeric values render the final value immediately.
 */
export function SpecCell({
  value,
  unit,
  label,
  accent = false,
  align = "left",
  style,
}: SpecCellProps) {
  const numRef = useRef<HTMLSpanElement | null>(null);

  useIsoLayoutEffect(() => {
    const el = numRef.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const match = value.match(/^(\d+(?:\.\d+)?)/);
    if (reduce || !match) return;

    const target = parseFloat(match[1]);
    const decimals = match[1].includes(".") ? match[1].split(".")[1].length : 0;
    const suffix = value.slice(match[1].length); // e.g. "+" in "15+"
    const counter = { v: 0 };
    el.textContent = (0).toFixed(decimals) + suffix;

    const ctx = gsap.context(() => {
      gsap.to(counter, {
        v: target,
        duration: 1.1,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
        onUpdate: () => {
          el.textContent = counter.v.toFixed(decimals) + suffix;
        },
      });
    }, el);

    return () => ctx.revert();
  }, [value]);

  return (
    <div style={{ textAlign: align, ...style }}>
      <div
        style={{
          fontFamily: "var(--font-family)",
          fontSize: "var(--type-number-display-size)",
          fontWeight: 700,
          letterSpacing: "var(--type-number-display-tracking)",
          lineHeight: "var(--type-number-display-leading)",
          color: accent ? "var(--color-primary)" : "var(--color-ink)",
          display: "flex",
          alignItems: "baseline",
          gap: "4px",
          justifyContent: align === "center" ? "center" : "flex-start",
        }}
      >
        <span ref={numRef}>{value}</span>
        {unit && (
          <span style={{ fontSize: "0.3em", fontWeight: 500, letterSpacing: 0, color: "var(--color-body)" }}>
            {unit}
          </span>
        )}
      </div>
      {label && (
        <div
          style={{
            marginTop: "var(--space-xs)",
            fontSize: "var(--type-caption-uppercase-size)",
            fontWeight: 600,
            letterSpacing: "var(--type-caption-uppercase-tracking)",
            textTransform: "uppercase",
            color: "var(--color-body)",
          }}
        >
          {label}
        </div>
      )}
    </div>
  );
}
