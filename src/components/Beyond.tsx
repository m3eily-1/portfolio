"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

const ITEMS = [
  {
    img: "/img/techne.webp",
    kicker: "Speaker · Cairo",
    title: "Techne Summit",
    text: "Represented Tremoloo at Techne Summit Cairo, sharing insights on design and innovation with the tech community.",
  },
  {
    img: "/img/uxcamp-1.webp",
    kicker: "Mentor · 2 batches",
    title: "Tremoloo UX Camp",
    text: "Guided participants through UX practice: best practices, group critiques, one-on-one coaching and feedback on their work.",
  },
];

export default function Beyond() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".by-item").forEach((it) => {
        gsap.fromTo(it.querySelector(".by-img"), { clipPath: "inset(18% 12% 18% 12%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "none", scrollTrigger: { trigger: it, start: "top 90%", end: "top 30%", scrub: true } });
        gsap.fromTo(it.querySelector(".by-img img"), { scale: 1.3, yPercent: -6 }, { scale: 1, yPercent: 6, ease: "none", scrollTrigger: { trigger: it, start: "top bottom", end: "bottom top", scrub: true } });
        gsap.from(it.querySelectorAll(".by-copy > *"), { y: 30, autoAlpha: 0, stagger: 0.08, duration: 1, scrollTrigger: { trigger: it, start: "top 70%" } });
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="by">
      <div className="by-head">
        <p className="label">
          <span>(05)</span> Off-screen
        </p>
        <h2 className="by-title">
          Giving back to <em>the room.</em>
        </h2>
      </div>
      {ITEMS.map((it, i) => (
        <article key={it.title} className={`by-item${i % 2 ? " is-flip" : ""}`}>
          <div className="by-img">
            <img src={it.img} alt={it.title} loading="lazy" />
          </div>
          <div className="by-copy">
            <p className="by-kicker">{it.kicker}</p>
            <h3>{it.title}</h3>
            <p>{it.text}</p>
          </div>
        </article>
      ))}
    </section>
  );
}
