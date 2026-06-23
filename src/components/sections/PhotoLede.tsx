import type { ReactNode } from "react";
import { PhotoSlot } from "@/components/ui/PhotoSlot";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/anim/Reveal";

/* Photo + intro-text band that sits directly under a video header. The lede
   that used to overlay the video lives here instead — easier to read, with a
   feature photo beside it. Two columns on desktop, stacked on mobile. */
export function PhotoLede({
  image,
  alt = "",
  eyebrow,
  children,
}: {
  image?: string;
  alt?: string;
  eyebrow?: string;
  children: ReactNode;
}) {
  return (
    <section
      style={{
        background: "var(--color-canvas)",
        padding: "var(--space-xl) var(--space-lg) var(--space-xxl)",
        borderBottom: "1px solid var(--color-hairline)",
      }}
    >
      <div
        className="wrap manifesto-grid"
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-xl)", alignItems: "center" }}
      >
        <PhotoSlot
          src={image}
          alt={alt}
          label="Photo coming soon"
          aspectRatio="16 / 11"
          style={{ border: "1px solid var(--color-hairline)" }}
        />
        <Reveal style={{ display: "flex", flexDirection: "column", gap: "var(--space-sm)" }}>
          {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
          <p className="lede" style={{ maxWidth: "46ch" }}>
            {children}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
