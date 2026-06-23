"use client";

import { useState, type CSSProperties } from "react";

/* Responsive <picture> (WebP first, JPG fallback). If the file is missing or
   fails to load, it renders a brand-gradient block so the page never looks
   broken before real photography is in place. `base` is the path without the
   extension, e.g. "/images/cities/bel-air-hero". */
export function PicImage({
  base,
  alt,
  priority = false,
  aspectRatio,
  style,
}: {
  base: string;
  alt: string;
  priority?: boolean;
  aspectRatio?: string;
  style?: CSSProperties;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        style={{
          width: "100%",
          height: "100%",
          aspectRatio,
          background:
            "linear-gradient(135deg, #181818 0%, #271012 55%, rgba(218,41,28,0.45) 100%)",
          ...style,
        }}
      />
    );
  }

  return (
    <picture style={{ display: "block", width: "100%", height: "100%" }}>
      <source srcSet={`${base}.webp`} type="image/webp" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${base}.jpg`}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        onError={() => setFailed(true)}
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", aspectRatio, ...style }}
      />
    </picture>
  );
}
