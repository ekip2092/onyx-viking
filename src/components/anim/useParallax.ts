"use client";

import { type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsoLayoutEffect } from "./useIsoLayoutEffect";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Gentle vertical parallax tied to scroll. Used only on the hero
 * background media — the one place the design system permits parallax.
 * `amount` is the total px drift across the scrubbed range (kept small).
 */
export function useParallax(ref: RefObject<HTMLElement | null>, amount = 80) {
  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    // No parallax on phones — the video is shown fully (object-fit: contain)
    // there, so a vertical drift would expose empty space.
    if (window.innerWidth <= 768) return;

    const ctx = gsap.context(() => {
      // Start shifted up and drift to neutral as the section scrolls past.
      // Pairs with an over-tall media element (height > 100%) so the top
      // edge never reveals a gap. Restrained, scrubbed, no easing.
      gsap.fromTo(
        el,
        { y: -amount },
        {
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: el.parentElement ?? el,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [ref, amount]);
}
