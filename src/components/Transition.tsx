"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { getLenis } from "@/lib/scroll";
import { getProject } from "@/data/work";

let cover: ((href: string) => Promise<void>) | null = null;

/** Curtain in, route change, curtain out. Falls back to a plain push. */
export async function navigate(router: AppRouterInstance, href: string) {
  if (cover) await cover(href);
  router.push(href, { scroll: false });
}

export default function Transition() {
  const el = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const pathname = usePathname();
  const first = useRef(true);

  useEffect(() => {
    // GSAP owns the transform (a CSS translate would be read back as px and stack with yPercent).
    if (el.current) gsap.set(el.current, { y: 0, yPercent: 100 });
    cover = (href) =>
      new Promise((resolve) => {
        if (!el.current || prefersReducedMotion()) return resolve();
        if (label.current) {
          const slug = href.startsWith("/work/") ? href.slice(6) : "";
          label.current.textContent = href === "/work" ? "All works" : href === "/story" ? "My story" : getProject(slug)?.name ?? "Ahmed Mealy";
        }
        getLenis()?.stop();
        gsap.fromTo(el.current, { yPercent: 100 }, { yPercent: 0, duration: 0.8, ease: "expo.inOut", onComplete: () => resolve() });
      });
    return () => {
      cover = null;
    };
  }, []);

  // After the new route renders: jump to top, rebuild triggers, lift the curtain.
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
    if (el.current) gsap.to(el.current, { yPercent: -100, duration: 0.9, ease: "expo.inOut", delay: 0.15 });
  }, [pathname]);

  return (
    <div ref={el} className="curtain" aria-hidden>
      <span ref={label} />
    </div>
  );
}
