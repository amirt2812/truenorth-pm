"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { captureAttribution, trackPageView } from "@/lib/attribution";

/** Saves campaign attribution on landing and reports client-side page views to the Meta Pixel. */
export function Attribution() {
  const pathname = usePathname();
  const first = useRef(true);

  useEffect(() => {
    captureAttribution();
  }, []);

  useEffect(() => {
    // The pixel snippet already counts the initial load.
    if (first.current) {
      first.current = false;
      return;
    }
    trackPageView();
  }, [pathname]);

  return null;
}
