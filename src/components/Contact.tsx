"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, SplitText, prefersReducedMotion, isFinePointer } from "@/lib/gsap";
import { getLenis } from "@/lib/scroll";
import { person } from "@/data/site";
import Arrow from "@/components/Arrow";

export default function Contact() {
  const root = useRef<HTMLElement>(null);
  const btn = useRef<HTMLAnchorElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    let ctx: gsap.Context | undefined;
    let alive = true;
    document.fonts.ready.then(() => {
      if (!alive) return;
      ctx = gsap.context(() => {
        if (prefersReducedMotion()) return;
        const t = new SplitText(".ct-title", { type: "lines,chars", mask: "lines", linesClass: "sl" });
        gsap.from(t.chars, { yPercent: 150, rotate: 8, stagger: 0.02, duration: 1.4, scrollTrigger: { trigger: ".ct-title", start: "top 80%" } });
      }, el);
    });
    // Magnetic CTA
    const b = btn.current;
    if (b && isFinePointer()) {
      const xTo = gsap.quickTo(b, "x", { duration: 0.6, ease: "elastic.out(1, 0.4)" });
      const yTo = gsap.quickTo(b, "y", { duration: 0.6, ease: "elastic.out(1, 0.4)" });
      const move = (e: PointerEvent) => {
        const r = b.getBoundingClientRect();
        xTo((e.clientX - (r.left + r.width / 2)) * 0.35);
        yTo((e.clientY - (r.top + r.height / 2)) * 0.35);
      };
      const leave = () => {
        xTo(0);
        yTo(0);
      };
      b.addEventListener("pointermove", move);
      b.addEventListener("pointerleave", leave);
    }
    return () => {
      alive = false;
      ctx?.revert();
    };
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(person.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  return (
    <section ref={root} className="ct" id="contact">
      <p className="label">
        <span>(06)</span> Next chapter
      </p>
      <h2 className="ct-title">
        Let&rsquo;s craft
        <br />
        experiences <em>together.</em>
      </h2>
      <div className="ct-actions">
        <a ref={btn} className="ct-big" href={`mailto:${person.email}`} data-cursor="Write">
          <span>Start a conversation</span>
          <Arrow dir="up-right" />
        </a>
        <button className="ct-copy" onClick={copy}>
          <span>{person.email}</span>
          <em>{copied ? "Copied ✓" : "Copy"}</em>
        </button>
        <a className="ct-copy" href={`tel:${person.phone.replace(/\s/g, "")}`}>
          <span>{person.phone}</span>
          <em>Call</em>
        </a>
      </div>
      <footer className="ft">
        <span>© 2026 {person.name}</span>
        <nav>
          {person.links.map((l) => (
            <a key={l.label} href={l.href} target="_blank" rel="noreferrer">
              {l.label}
            </a>
          ))}
        </nav>
        <button onClick={() => getLenis()?.scrollTo(0, { duration: 2.2 })}>Back to top ↑</button>
      </footer>
    </section>
  );
}
