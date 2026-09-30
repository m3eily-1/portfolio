"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

// Chapter 03 — 2018 → now. Scattered parts snap into a design system, then into a product.

const SWATCHES = [
  { name: "Sunflower", hex: "#FFD372" },
  { name: "Ink", hex: "#12100E" },
  { name: "Bone", hex: "#EDE6DA" },
  { name: "Stone", hex: "#8A8175" },
  { name: "Signal", hex: "#E4572E" },
];


export default function ChapterProducts() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    let ctx: gsap.Context | undefined;
    let alive = true;
    document.fonts.ready.then(() => {
      if (!alive) return;
      ctx = gsap.context(() => {
        const rnd = gsap.utils.random;
        const scatter = (sel: string) => ({
          x: () => rnd(-260, 260),
          y: () => rnd(-200, 200),
          rotate: () => rnd(-28, 28),
          scale: 0.7,
          autoAlpha: 0,
          stagger: 0.04,
          duration: 0.7,
          ease: "power3.out",
        });
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "+=300%",
            pin: ".ch-stage",
            scrub: prefersReducedMotion() ? true : 0.8,
          },
        });
        tl.from(".fg", { y: 60, scale: 0.94, duration: 0.5, ease: "power2.out" }, 0)
          .from(".fg-frame", { autoAlpha: 0, y: 24, stagger: 0.12, duration: 0.4 }, 0.1)
          .from(".fg-sw", scatter(".fg-sw"), 0.35)
          .from(".fg-type > *", scatter(".fg-type"), 0.55)
          .from(".fg-comp > *", scatter(".fg-comp"), 0.8)
          .to(".cur--a", { x: "18vw", y: "12vh", duration: 1.2, ease: "sine.inOut" }, 0.3)
          .to(".cur--b", { x: "-14vw", y: "-8vh", duration: 1.2, ease: "sine.inOut" }, 0.5)
          // the screen gets built from the parts
          .from(".fg-screen > *", { y: 40, autoAlpha: 0, stagger: 0.12, duration: 0.45, ease: "power3.out" }, 1.7)
          .to(".cur--a", { x: "32vw", y: "26vh", duration: 0.9, ease: "sine.inOut" }, 1.6)
          .to(".cur--b", { x: "-2vw", y: "18vh", duration: 0.9, ease: "sine.inOut" }, 1.8)
          .from(".fg-impact > div", { yPercent: 100, autoAlpha: 0, stagger: 0.12, duration: 0.5, ease: "power3.out" }, 2.45)
          .fromTo(".fg-impact b", { innerText: 0 }, { innerText: (i: number, t: HTMLElement) => Number(t.dataset.to), snap: { innerText: 1 }, duration: 0.8 }, 2.5)
          .to(".fg-ship", { autoAlpha: 1, y: 0, duration: 0.4 }, 3.35)
          .to({}, { duration: 0.5 });
      }, el);
    });
    return () => {
      alive = false;
      ctx?.revert();
    };
  }, []);

  return (
    <section ref={root} className="ch ch--products">
      <div className="ch-stage">
        <aside className="ch-copy">
          <p className="label">
            <span>Chapter 03</span> 2018 — Now
          </p>
          <h2 className="ch-title">
            <em>Products</em>
          </h2>
          <p className="ch-desc">
            Design systems, fintech and payment apps, a government rental platform, and telecom, health, mobility,
            home-service and news products, taken from research to handoff.
          </p>
        </aside>

        <div className="fg" aria-hidden>
          <div className="fg-bar">
            <span className="fg-logo">
              <i />
              <i />
              <i />
            </span>
            <span className="fg-file">
              Design System <em>/ v1.0</em>
            </span>
            <span className="fg-people">
              <i className="a">A</i>
              <i className="b">D</i>
              <b>Share</b>
            </span>
          </div>
          <div className="fg-canvas">
            <div className="fg-frame fg-f-colors">
              <p className="fg-name">Colors</p>
              <div className="fg-sws">
                {SWATCHES.map((s) => (
                  <div key={s.hex} className="fg-sw">
                    <i style={{ background: s.hex }} />
                    <span>{s.name}</span>
                    <small>{s.hex}</small>
                  </div>
                ))}
              </div>
            </div>
            <div className="fg-frame fg-f-type">
              <p className="fg-name">Type</p>
              <div className="fg-type">
                <strong>Aa</strong>
                <span className="t1">Display / 64</span>
                <span className="t2">Heading / 32</span>
                <span className="t3">Body / 16 — The quick brown fox</span>
                <span className="t4">LABEL / 12 MONO</span>
              </div>
            </div>
            <div className="fg-frame fg-f-comp">
              <p className="fg-name">Components</p>
              <div className="fg-comp">
                <span className="c-btn">Book now</span>
                <span className="c-btn c-btn--2">Details</span>
                <span className="c-input">⌕ Search events</span>
                <span className="c-toggle">
                  <i />
                </span>
                <span className="c-check">✓</span>
                <span className="c-chip">Riyadh</span>
                <span className="c-chip c-chip--2">This weekend</span>
                <span className="c-tag">Live</span>
                <span className="c-tabs">
                  <b>Events</b>
                  <i>Venues</i>
                  <i>Artists</i>
                </span>
                <span className="c-step">
                  <i>−</i>2<i>+</i>
                </span>
                <span className="c-prog">
                  <i />
                </span>
                <span className="c-seats">
                  {Array.from({ length: 18 }, (_, i) => (
                    <i key={i} className={[3, 4, 9, 13].includes(i) ? "on" : i % 7 === 5 ? "off" : ""} />
                  ))}
                </span>
                <span className="c-ticket">
                  <b>Ticket</b>
                  <em>Gate B · Row 4 · Seat 12</em>
                </span>
              </div>
            </div>
            <div className="fg-frame fg-f-screen">
              <p className="fg-name">Screen / Home</p>
              <div className="fg-screen">
                <div className="s-top">
                  <span>Hi, Ahmed</span>
                  <i />
                </div>
                <span className="c-input">⌕ Search events</span>
                <div className="s-chips">
                  <span className="c-chip">Riyadh</span>
                  <span className="c-chip c-chip--2">This weekend</span>
                </div>
                <div className="s-card">
                  <div className="s-img" />
                  <p>Tonight · 20:00</p>
                  <strong>An evening worth remembering</strong>
                </div>
                <span className="c-btn">Book now</span>
              </div>
            </div>
            <div className="fg-impact">
              <div>
                <strong>
                  −<b data-to="30">30</b>%
                </strong>
                <span>design inconsistencies</span>
              </div>
              <div>
                <strong>
                  −<b data-to="20">20</b>%
                </strong>
                <span>development time</span>
              </div>
              <div>
                <strong>
                  +<b data-to="15">15</b>%
                </strong>
                <span>positive user feedback</span>
              </div>
            </div>
            <p className="fg-ship">Shipped ✓ — pixels became products.</p>
            <span className="cur cur--a">
              <svg viewBox="0 0 16 16" width="16" height="16">
                <path d="M1 1l5 14 2-6 6-2Z" />
              </svg>
              <em>Ahmed</em>
            </span>
            <span className="cur cur--b">
              <svg viewBox="0 0 16 16" width="16" height="16">
                <path d="M1 1l5 14 2-6 6-2Z" />
              </svg>
              <em>Dev team</em>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
