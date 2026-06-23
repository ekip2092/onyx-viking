import { useEffect, useLayoutEffect } from "react";

/**
 * useLayoutEffect on the client, useEffect on the server — avoids React's
 * SSR warning while still running GSAP setup before the browser paints
 * (preventing a flash of un-animated content).
 */
export const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
