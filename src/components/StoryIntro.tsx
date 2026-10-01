"use client";

import { useEffect, useRef } from "react";
import { gsap, SplitText, prefersReducedMotion } from "@/lib/gsap";

/** A full-screen title slide that opens the story, before the three chapters. */
export default function StoryIntro() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    let ctx: gsap.Context | undefined;
    let alive = true;
    document.fonts.ready.then(() => {
      if (!alive) return;
      ctx = gsap.context(() => {
        if (prefersReducedMotion()) return;
        const t = new SplitText(".st-title", { type: "words", mask: "words", wordsClass: "sw" });
        gsap
          .timeline({ scrollTrigger: { trigger: el, start: "top 65%" } })
          .from(t.words, { yPercent: 140, stagger: 0.1, duration: 1.4 })
          .from(".st-hint", { autoAlpha: 0, duration: 1 }, 0.9);
        // Drift up and fade as the first chapter arrives.
        gsap.to(".st-in", { yPercent: -18, autoAlpha: 0, ease: "none", scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true } });
      }, el);
    });
    return () => {
      alive = false;
      ctx?.revert();
    };
  }, []);

  return (
    <section ref={root} className="st" id="story">
      <div className="st-in">
        <h2 className="st-title">
          <span className="st-my">Welcome to my story,</span>
          <br />
          from <span className="px">pixels</span> to products.
        </h2>
        <p className="st-hint">Three chapters, one medium at a time ↓</p>
      </div>
    </section>
  );
}
