import type { CSSProperties } from "react";

/**
 * Placeholder for user-supplied photography (the prototype's drag-and-drop
 * "image slots"). Renders an on-brand graphite panel with a quiet label.
 * To use a real photo, pass `src`, or swap this for next/image in the page.
 */
export function PhotoSlot({
  label,
  src,
  webpSrc,
  alt = "",
  aspectRatio,
  style,
}: {
  label?: string;
  src?: string;
  /** Optional WebP version, served first with the `src` (JPG/PNG) as fallback. */
  webpSrc?: string;
  alt?: string;
  aspectRatio?: string;
  style?: CSSProperties;
}) {
  if (src) {
    const img = (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        style={{ width: "100%", height: "100%", objectFit: "cover", aspectRatio, ...style }}
      />
    );
    if (webpSrc) {
      return (
        <picture style={{ display: "block" }}>
          <source srcSet={webpSrc} type="image/webp" />
          {img}
        </picture>
      );
    }
    return img;
  }
  return (
    <div
      aria-hidden="true"
      style={{
        width: "100%",
        aspectRatio,
        background:
          "var(--gradient-graphite), radial-gradient(120% 120% at 30% 10%, rgba(218,41,28,0.10), transparent 60%)",
        display: "flex",
        alignItems: "flex-end",
        padding: "var(--space-md)",
        ...style,
      }}
    >
      <span
        style={{
          fontSize: "var(--type-caption-uppercase-size)",
          fontWeight: 600,
          letterSpacing: "var(--type-caption-uppercase-tracking)",
          textTransform: "uppercase",
          color: "var(--color-body)",
        }}
      >
        {label}
      </span>
    </div>
  );
}
