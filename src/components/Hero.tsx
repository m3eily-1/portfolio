"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { gsap, SplitText, prefersReducedMotion } from "@/lib/gsap";
import { person } from "@/data/site";
import { projects } from "@/data/work";
import type { RingCard, RingScene } from "@/lib/ringScene";
import { navigate } from "@/components/Transition";
import HeroBg from "@/components/HeroBg";

// Every mockup in the PDF, each linked to its case study.
const CARDS: RingCard[] = projects.flatMap((p) => p.images.map((src) => ({ src, slug: p.slug, label: `${p.name} — ${p.category}` })));
// Placeholder: plain grey cards until the final thumbnails are ready. Set to undefined to show the mockups again.
const RING_FILL: string | undefined = "#3a3733";

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const tag = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<RingCard | null>(null);
  const router = useRouter();

  // Ring scene
  useEffect(() => {
    let scene: RingScene | null = null;
    let alive = true;
    let lastScroll = window.scrollY;
    import("@/lib/ringScene").then(({ createRingScene }) => {
      if (!alive || !canvas.current) return;
      scene = createRingScene(canvas.current, CARDS, {
        onHover: setHover,
        onSelect: (c) => navigate(router, `/work/${c.slug}`),
        fill: RING_FILL,
      });
    });
    // Scrolling spins the ring a little faster.
    const onScroll = () => {
      const v = window.scrollY - lastScroll;
      lastScroll = window.scrollY;
      scene?.addVelocity(Math.max(-0.25, Math.min(0.25, v * 0.0018)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      alive = false;
      window.removeEventListener("scroll", onScroll);
      scene?.destroy();
    };
  }, [router]);

  // Card label follows the pointer.
  useEffect(() => {
    const el = tag.current;
    if (!el) return;
    const xTo = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3" });
    const move = (e: PointerEvent) => {
      xTo(e.clientX + 18);
      yTo(e.clientY + 18);
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);

  // Intro + scroll-out
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    let ctx: gsap.Context | undefined;
    let alive = true;
    document.fonts.ready.then(() => {
      if (!alive) return;
      ctx = gsap.context(() => {
        if (prefersReducedMotion()) return;
        const title = new SplitText(".hero-title", { type: "lines", mask: "lines", linesClass: "hero-line" });
        gsap
          .timeline({ defaults: { ease: "expo.out" }, delay: 0.15 })
          .from(".hero-portrait-in", { yPercent: 14, clipPath: "inset(0% 0% 100% 0%)", duration: 2 }, 0.25) // wipes in, no opacity
          .from(".hero-hi", { autoAlpha: 0, y: 14, duration: 1 }, 0.9)
          .from(title.lines, { yPercent: 140, stagger: 0.12, duration: 1.4 }, 0.95)
          .from(".hero-sub", { autoAlpha: 0, y: 14, duration: 1.1 }, 1.4);

        gsap
          .timeline({ scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true } })
          .to(".hero-portrait", { yPercent: -8, ease: "none" }, 0)
          .to(".hero-copy", { yPercent: -30, autoAlpha: 0, ease: "none" }, 0)
          .to(".hero-canvas", { yPercent: 18, ease: "none" }, 0);
      }, el);
    });
    return () => {
      alive = false;
      ctx?.revert();
    };
  }, []);

  return (
    <section ref={root} className="hero" id="top">
      <HeroBg />
      <canvas ref={canvas} className="hero-canvas" aria-label="Rotating ring of project mockups" />
      <div className="hero-fade" aria-hidden />

      {person.portrait && (
        <div className="hero-portrait" aria-hidden>
          <div className="hero-portrait-in">
            <img src={person.portrait} alt="" />
          </div>
        </div>
      )}

      <div className="hero-copy">
        <p className="hero-hi">Hi, I&rsquo;m {person.name}</p>
        <h1 className="hero-title">
          Product Design Lead
        </h1>
        <p className="hero-sub">Designing delightful products people love to use, down to the smallest detail.</p>
      </div>


      <div ref={tag} className={`ring-tag${hover ? " is-on" : ""}`} aria-hidden>
        <span>{hover?.label}</span>
        <em>View case</em>
      </div>
    </section>
  );
}
