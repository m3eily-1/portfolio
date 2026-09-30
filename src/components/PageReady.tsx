"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import { getLenis } from "@/lib/scroll";

/**
 * Mounted last: once fonts are in and every section has made its triggers, sort
 * them into page order and recompute. Also honours /#section deep links.
 */
export default function PageReady() {
  useEffect(() => {
    let alive = true;
    document.fonts.ready.then(() => {
      requestAnimationFrame(() => {
        if (!alive) return;
        ScrollTrigger.sort();
        ScrollTrigger.refresh();
        const id = location.hash.slice(1);
        if (id) setTimeout(() => getLenis()?.scrollTo(`#${id}`, { immediate: true }), 60);
      });
    });
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    return () => {
      alive = false;
      window.removeEventListener("load", onLoad);
    };
  }, []);
  return null;
}
