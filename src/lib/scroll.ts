"use client";

import type Lenis from "lenis";

let lenis: Lenis | null = null;

export const setLenis = (l: Lenis | null) => {
  lenis = l;
  // Dev-only QA hook (see src/lib/gsap.ts).
  if (process.env.NODE_ENV !== "production") Object.assign(window, { __lenis: l });
};

export const getLenis = () => lenis;

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { duration: 1.6, offset: 0 });
  else el.scrollIntoView({ behavior: "smooth" });
}

export function lockScroll(locked: boolean) {
  if (lenis) (locked ? lenis.stop() : lenis.start());
  document.documentElement.classList.toggle("is-locked", locked);
}

/** Prefix a site path with the deploy base path, for plain <a href> values (Next's router adds it itself). */
export const withBase = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
