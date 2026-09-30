"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
  gsap.defaults({ ease: "expo.out", duration: 1.1 });
  // Optional elements (e.g. the hero portrait) may be absent; skip them quietly.
  gsap.config({ nullTargetWarn: false });
  // Dev-only QA hook: the Browser pane runs hidden (no rAF), so tests call
  // window.__gsap.ticker.useRAF(false) to drive tweens from timers instead.
  if (process.env.NODE_ENV !== "production") Object.assign(window, { __gsap: gsap, __ST: ScrollTrigger });
}

export { gsap, ScrollTrigger, SplitText };

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const isFinePointer = () =>
  typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
