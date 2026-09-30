"use client";

import { useEffect, type RefObject } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/** Run a GSAP setup once fonts are ready (so triggers are created in page order), scoped to `ref`. */
export function useGsap(ref: RefObject<HTMLElement | null>, setup: (el: HTMLElement) => void) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let ctx: gsap.Context | undefined;
    let alive = true;
    document.fonts.ready.then(() => {
      if (!alive) return;
      ctx = gsap.context(() => setup(el), el);
      // This section mounts after the rest of the page, so put its pin back in page order.
      requestAnimationFrame(() => {
        ScrollTrigger.sort();
        ScrollTrigger.refresh();
      });
    });
    return () => {
      alive = false;
      ctx?.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
