"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsoLayoutEffect } from "./useIsoLayoutEffect";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type RevealProps = {
  children: ReactNode;
  /** When set, animate the element's direct children in sequence. */
  stagger?: number;
  /** Rise distance in px. Kept small + restrained by design. */
  y?: number;
  delay?: number;
  className?: string;
  style?: CSSProperties;
};

/**
 * Restrained scroll-in entrance: a slow fade with a small upward rise.
 * - Opacity-safe: if JS never runs, content stays fully visible (the hidden
 *   start state is only set once GSAP is confirmed available, client-side).
 * - Honors prefers-reduced-motion: no motion, content shown immediately.
 */
export function Reveal({ children, stagger, y = 14, delay = 0, className, style }: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      const targets =
        stagger != null ? (gsap.utils.toArray(el.children) as Element[]) : [el];

      gsap.set(targets, { opacity: 0, y });
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        delay,
        ease: "power2.out",
        stagger: stagger ?? 0,
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      });
    }, el);

    return () => ctx.revert();
  }, [stagger, y, delay]);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
