"use client";

import { useEffect, useRef, useState } from "react";
import { SITE } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Stars } from "@/components/ui/Stars";
import { ClockIcon, ShieldIcon, CheckIcon } from "@/components/ui/Icons";
import { useParallax } from "@/components/anim/useParallax";

const trustItems = [
  { label: "Same day service", Icon: ClockIcon },
  { label: "Manufacturer backed warranty", Icon: ShieldIcon },
  { label: "Factory trained", Icon: CheckIcon },
];

// Soft legibility shadow so hero copy reads over any frame of the bright video.
const heroShadow = "0 1px 14px rgba(0,0,0,0.55), 0 1px 3px rgba(0,0,0,0.45)";

export function HomeHero({
  h1 = "The white glove repair your Viking deserves.",
  subhead,
  eyebrow,
}: { h1?: string; subhead?: string; eyebrow?: string } = {}) {
  const eyebrowText = eyebrow ?? `Viking specialists · ${SITE.region}`;
  const videoRef = useRef<HTMLVideoElement>(null);
  // Phones get a portrait hero cut; desktop/tablet keep the landscape video.
  const [isPhone, setIsPhone] = useState(false);
  // Reduced-motion users get the poster still, never a video request.
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setIsPhone(mq.matches);
    update();
    mq.addEventListener("change", update);

    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateRm = () => setReduced(rm.matches);
    updateRm();
    rm.addEventListener("change", updateRm);

    return () => {
      mq.removeEventListener("change", update);
      rm.removeEventListener("change", updateRm);
    };
  }, []);
  // Gentle parallax on the desktop landscape video only.
  useParallax(videoRef, 90);

  return (
    <section
      style={{
        position: "relative",
        minHeight: "88vh",
        display: "flex",
        alignItems: "flex-end",
        overflow: "hidden",
        background: "var(--color-canvas)",
      }}
    >
      {/* Background video: phones load a portrait cut framed on the woman in
          the red dress; desktop/tablet keep the original landscape kitchen
          video with a gentle parallax drift. Only one file loads per device. */}
      {reduced ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={isPhone ? "/hero_bg_mobile_v3_poster.jpg" : "/kitchen_bg_poster.jpg"}
          alt=""
          aria-hidden="true"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
      ) : isPhone ? (
        <video
          key="hero-m"
          className="hero-bg-mobile"
          autoPlay
          muted
          loop
          playsInline
          poster="/hero_bg_mobile_v3_poster.jpg"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        >
          <source src="/hero_bg_mobile_v3.mp4" type="video/mp4" />
        </video>
      ) : (
        <video
          key="hero-d"
          ref={videoRef}
          className="hero-bg"
          autoPlay
          muted
          loop
          playsInline
          poster="/kitchen_bg_poster.jpg"
          style={{ position: "absolute", left: 0, top: 0, width: "100%", height: "118%", objectFit: "cover" }}
        >
          <source src="/kitchen_bg_website.mp4" type="video/mp4" />
        </video>
      )}

      {/* Legibility gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "linear-gradient(180deg, rgba(24,24,24,0.62) 0%, rgba(24,24,24,0.15) 32%, rgba(24,24,24,0.55) 64%, rgba(24,24,24,0.96) 100%)",
        }}
      />
      <div
        className="wrap"
        style={{
          position: "relative",
          width: "100%",
          padding: "var(--space-xxl) var(--space-lg) var(--space-xl)",
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-sm)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-sm)", flexWrap: "wrap" }}>
          <Stars />
          <Eyebrow style={{ color: "rgba(255,255,255,0.92)", textShadow: heroShadow }}>
            {eyebrowText}
          </Eyebrow>
        </div>
        <h1 className="d-mega hero-title" style={{ maxWidth: "18ch", textShadow: heroShadow }}>
          {h1}
        </h1>
        {subhead ? (
          <p className="lede video-lede" style={{ maxWidth: "54ch", color: "rgba(255,255,255,0.9)", textShadow: heroShadow }}>
            {subhead}
          </p>
        ) : null}
        <div style={{ display: "flex", gap: "var(--space-xs)", flexWrap: "wrap", marginTop: "var(--space-xs)" }}>
          <Button variant="primary" href={"tel:" + SITE.phoneTel}>
            Call {SITE.phoneDisplay}
          </Button>
          <Button variant="outline" href={SITE.book}>
            Book a diagnostic
          </Button>
        </div>
        <div style={{ display: "flex", gap: "var(--space-lg)", flexWrap: "wrap", marginTop: "var(--space-md)" }}>
          {trustItems.map(({ label, Icon }, i) => (
            <span
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--space-xxs)",
                color: "var(--color-ink)",
                fontSize: "13px",
                fontWeight: 600,
                letterSpacing: "0.4px",
                textTransform: "uppercase",
                textShadow: heroShadow,
              }}
            >
              <Icon size={16} style={{ color: "var(--color-primary)" }} /> {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
