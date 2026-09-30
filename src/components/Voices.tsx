"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { voices } from "@/data/site";

export default function Voices() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    let ctx: gsap.Context | undefined;
    let alive = true;
    document.fonts.ready.then(() => {
      if (!alive) return;
      ctx = gsap.context(() => {
        const track = el.querySelector<HTMLElement>(".vo-track")!;
        const dist = () => track.scrollWidth - window.innerWidth;
        const tween = gsap.to(track, {
          x: () => -dist(),
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: () => `+=${dist()}`,
            pin: ".vo-stage",
            scrub: prefersReducedMotion() ? true : 0.8,
            invalidateOnRefresh: true,
            onUpdate: (st) => el.style.setProperty("--vo-p", st.progress.toFixed(3)),
          },
        });
        if (prefersReducedMotion()) return;
        // Cards tilt in as they enter from the right.
        gsap.utils.toArray<HTMLElement>(".vo-card").forEach((c) =>
          gsap.from(c.querySelector(".vo-q"), {
            yPercent: 30,
            autoAlpha: 0,
            ease: "power2.out",
            scrollTrigger: { trigger: c, containerAnimation: tween, start: "left 95%", end: "left 55%", scrub: true },
          }),
        );
      }, el);
    });
    return () => {
      alive = false;
      ctx?.revert();
    };
  }, []);

  return (
    <section ref={root} className="vo" id="voices">
      <div className="vo-stage">
        <div className="vo-head">
          <p className="label">
            <span>(04)</span> Kind words
          </p>
          <h2 className="vo-title">
            What people <em>say</em>
          </h2>
          <div className="vo-bar">
            <i />
          </div>
        </div>
        <div className="vo-track">
          {voices.map((v, i) => (
            <figure key={v.name} className="vo-card">
              <span className="vo-n">{String(i + 1).padStart(2, "0")}</span>
              <blockquote className="vo-q">&ldquo;{v.quote}&rdquo;</blockquote>
              <figcaption>
                <strong>{v.name}</strong>
                <span>{v.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
