"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { getLenis } from "@/lib/scroll";

let cover: (() => Promise<void>) | null = null;

/** Fade to ink, change route, fade back in. Falls back to a plain push. */
export async function navigate(router: AppRouterInstance, href: string) {
  if (cover) await cover();
  router.push(href, { scroll: false });
}

export default function Transition() {
  const el = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const first = useRef(true);

  useEffect(() => {
    if (el.current) gsap.set(el.current, { autoAlpha: 0 });
    cover = () =>
      new Promise((resolve) => {
        if (!el.current || prefersReducedMotion()) return resolve();
        getLenis()?.stop();
        gsap.fromTo(el.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.45, ease: "power2.inOut", onComplete: () => resolve() });
      });
    return () => {
      cover = null;
    };
  }, []);

  // After the new route renders: jump to top, rebuild triggers, fade back in.
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const lenis = getLenis();
    window.scrollTo(0, 0);
    lenis?.scrollTo(0, { immediate: true, force: true });
    lenis?.start();
    requestAnimationFrame(() => ScrollTrigger.refresh());
    if (el.current) gsap.to(el.current, { autoAlpha: 0, duration: 0.55, ease: "power2.inOut", delay: 0.15 });
  }, [pathname]);

  return <div ref={el} className="tr-fade" aria-hidden />;
}
