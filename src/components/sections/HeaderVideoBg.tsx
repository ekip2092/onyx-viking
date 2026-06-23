"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Full-bleed background video for page headers, with a legibility gradient on
 * top. Sits behind header content (give the content position:relative). The
 * parent <section> must be position:relative + overflow:hidden.
 *
 * If `mobileSrc` is given, phones (<= 600px) load that file instead (e.g. a
 * portrait cut sized for mobile), while desktop/tablet keep `src` unchanged.
 * Only the chosen file is ever loaded. Honors prefers-reduced-motion by pausing.
 */
export function HeaderVideoBg({
  src,
  mobileSrc,
  poster,
  overlay = "linear-gradient(180deg, rgba(20,20,20,0.74) 0%, rgba(20,20,20,0.58) 42%, rgba(20,20,20,0.92) 100%)",
  objectPosition = "center",
}: {
  src: string;
  mobileSrc?: string;
  poster?: string;
  overlay?: string;
  /** Vertical crop framing for the desktop landscape video (e.g. "center 20%"
   *  keeps a subject's head in frame). Mobile portrait cuts stay centered. */
  objectPosition?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  // null until measured on the client, so we never load the wrong file.
  const [isPhone, setIsPhone] = useState<boolean | null>(null);
  // Reduced-motion users get no video request at all (poster/gradient only).
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

  useEffect(() => {
    const v = ref.current;
    if (v) v.muted = true;
  }, [isPhone]);

  const usePhoneVideo = isPhone === true && !!mobileSrc;
  const chosenSrc = usePhoneVideo ? (mobileSrc as string) : src;

  return (
    <>
      {isPhone !== null && !reduced && (
        <video
          key={chosenSrc}
          ref={ref}
          // Phone cut uses plain cover (portrait, fills naturally); the desktop
          // class carries the landscape framing tweaks.
          className={usePhoneVideo ? "header-video-mobile" : "header-video-bg"}
          autoPlay
          muted
          loop
          playsInline
          poster={poster}
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: usePhoneVideo ? "center" : objectPosition,
          }}
        >
          <source src={chosenSrc} type={chosenSrc.endsWith(".webm") ? "video/webm" : "video/mp4"} />
        </video>
      )}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: overlay }} />
    </>
  );
}
