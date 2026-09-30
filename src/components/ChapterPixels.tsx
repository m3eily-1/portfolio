"use client";

import { useEffect, useRef } from "react";
import { gsap, SplitText, prefersReducedMotion } from "@/lib/gsap";

// Chapter 01 — 2010–2013. The story is "made" inside a Photoshop-style workspace as you scroll.

const TOOLS: { key: string; d: string }[] = [
  { key: "move", d: "M8 1v14M1 8h14M8 1 6 3m2-2 2 2M8 15l-2-2m2 2 2-2M1 8l2-2M1 8l2 2m12-2-2-2m2 2-2 2" },
  { key: "marquee", d: "M2 2h3m3 0h2m3 0h1v3m0 3v2m0 3v1h-3m-3 0H6m-3 0H2v-3m0-3V6" },
  { key: "lasso", d: "M3 9c-2-4 3-7 7-6s5 5 1 7-7 0-8-1Zm0 0-1 5" },
  { key: "crop", d: "M4 1v11h11M1 4h11v11" },
  { key: "brush", d: "M14 2 7 9m0 0c-2-1-4 0-4 2s-1 3-2 3c3 1 6 0 6-3Z" },
  { key: "eraser", d: "M6 14h8M2 10l6-7 6 6-5 5H6Z" },
  { key: "type", d: "M3 3h10M8 3v10M6 13h4" },
  { key: "zoom", d: "M7 12A5 5 0 1 0 7 2a5 5 0 0 0 0 10Zm3.5-1.5L15 15" },
];

// Artboards: social media work from behance.net/m3eily (all 12 covers are in public/img/behance/social).
const POSTERS = [
  { src: "/img/behance/social/fitlab.webp", name: "Fitlab Gym", href: "https://www.behance.net/gallery/77109635/Fitlab-Gym-Social-Media" },
  { src: "/img/behance/social/ghoraba.webp", name: "Ghoraba Automotive", href: "https://www.behance.net/gallery/75548765/Ghoraba-automotive-Social-media" },
  { src: "/img/behance/social/stark.webp", name: "Stark Gaming Cafe", href: "https://www.behance.net/gallery/77368869/Stark-Gaming-Cafe-Social-Media" },
  { src: "/img/behance/social/drink.webp", name: "Drink", href: "https://www.behance.net/gallery/99221089/Drink-Social-media-(vol-1)" },
  { src: "/img/behance/social/yard-02.webp", name: "YARD", href: "https://www.behance.net/gallery/69053753/Social-Media-YARD-02" },
  { src: "/img/behance/social/social-vol1.webp", name: "Social Media Vol. 1", href: "https://www.behance.net/gallery/73947263/Social-Media-Vol-1-(-100-)" },
];

const BEATS = [
  { year: "2010", text: "It started as a hobby, with basic tools and a lot of curiosity." },
  { year: "Then", text: "My big brother showed me Photoshop and Illustrator. The hobby became a craft." },
  { year: "2013", text: "Three years into professional work, I was leading a team making commercial visuals." },
];

export default function ChapterPixels() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    let ctx: gsap.Context | undefined;
    let alive = true;
    document.fonts.ready.then(() => {
      if (!alive) return;
      ctx = gsap.context(() => {
        const chars = new SplitText(".ps-type", { type: "chars" }).chars;
        const path = el.querySelector<SVGPathElement>(".ps-stroke path")!;
        const len = path.getTotalLength();
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });

        const beat = (i: number) => {
          el.querySelectorAll(".ch-beat").forEach((b, j) => b.classList.toggle("is-on", j === i));
        };
        const tool = (k: string, name: string) => () => {
          el.querySelectorAll(".ps-tools li").forEach((li) => li.classList.toggle("is-on", (li as HTMLElement).dataset.k === k));
          const n = el.querySelector(".ps-opt-tool");
          if (n) n.textContent = name;
        };
        const show = { autoAlpha: 1, height: "auto", ease: "power2.out", duration: 0.2 };

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "+=320%",
            pin: ".ch-stage",
            scrub: prefersReducedMotion() ? true : 0.8,
          },
        });

        gsap.set(".ps-layers li:not(.is-base), .ps-history li:not(.is-base)", { autoAlpha: 0, height: 0 });
        gsap.set(chars, { autoAlpha: 0 });

        tl.call(() => beat(0), [], 0)
          .call(tool("type", "Type Tool  ·  Pixelify Sans  ·  96 pt"), [], 0.02)
          .from(".ps", { scale: 0.92, y: 40, duration: 0.6, ease: "power2.out" }, 0)
          // 1. type the headline
          .to(".ps-history .h-type, .ps-layers .l-type", show, 0.3)
          .to(chars, { autoAlpha: 1, stagger: 0.05, duration: 0.01 }, 0.35)
          .to(".ps-caret", { autoAlpha: 0, duration: 0.05 }, ">")
          // 2. brush stroke under it
          .call(tool("brush", "Brush Tool  ·  Size 38 px  ·  Hardness 80%"), [], 1.55)
          .to(".ps-history .h-brush, .ps-layers .l-brush", show, 1.6)
          .to(path, { strokeDashoffset: 0, duration: 0.8 }, 1.6)
          // 3. the brother's gift: Ps + Ai placed as smart objects, with a marquee selection
          .call(() => beat(1), [], 2.5)
          .call(tool("move", "Move Tool  ·  Auto-Select Layer"), [], 2.5)
          .to(".ps-history .h-place, .ps-layers .l-ps, .ps-layers .l-ai", show, 2.55)
          .from(".ps-icons img", { y: -120, rotate: -18, autoAlpha: 0, stagger: 0.18, duration: 0.5, ease: "back.out(1.6)" }, 2.6)
          .from(".ps-sel", { autoAlpha: 0, scale: 1.2, duration: 0.3 }, 3.1)
          .from(".ps-gift", { autoAlpha: 0, y: 20, duration: 0.4 }, 3.1)
          // 4. 2013: artboards of commercial work
          .call(() => beat(2), [], 3.9)
          .call(tool("crop", "Artboard Tool  ·  6 artboards"), [], 3.9)
          .to(".ps-art--type", { autoAlpha: 0, scale: 0.9, duration: 0.4 }, 3.9)
          .to(".ps-history .h-boards, .ps-layers .l-boards", show, 4)
          .from(".ps-poster", { autoAlpha: 0, y: 60, rotate: (i) => (i % 2 ? 6 : -6), scale: 0.8, stagger: 0.1, duration: 0.5, ease: "back.out(1.4)" }, 4)
          .to(".ps-zoom", { innerText: 33, snap: { innerText: 1 }, duration: 0.8 }, 4)
          .to(".ps-team", { autoAlpha: 1, y: 0, duration: 0.4 }, 4.8)
          .to({}, { duration: 0.6 });
      }, el);
    });
    return () => {
      alive = false;
      ctx?.revert();
    };
  }, []);

  return (
    <section ref={root} className="ch ch--pixels">
      <div className="ch-stage">
        <aside className="ch-copy">
          <p className="label">
            <span>Chapter 01</span> 2010 — 2013
          </p>
          <h2 className="ch-title">
            <span className="px">Pixels</span>
          </h2>
          <ol className="ch-beats">
            {BEATS.map((b) => (
              <li key={b.year} className="ch-beat">
                <b>{b.year}</b>
                <span>{b.text}</span>
              </li>
            ))}
          </ol>
        </aside>

        <div className="ps">
          <div className="ps-bar" aria-hidden>
            <i />
            <i />
            <i />
            <span>Adobe Photoshop CS5</span>
          </div>
          <div className="ps-menu" aria-hidden>
            <b>Ps</b>
            {["File", "Edit", "Image", "Layer", "Select", "Filter", "Analysis", "3D", "View", "Window", "Help"].map((m) => (
              <span key={m}>{m}</span>
            ))}
          </div>
          <div className="ps-opts" aria-hidden>
            <span className="ps-opt-tool">Type Tool</span>
            <span>Opacity: 100%</span>
            <span>Flow: 100%</span>
          </div>
          <div className="ps-body">
            <ul className="ps-tools" aria-hidden>
              {TOOLS.map((t) => (
                <li key={t.key} data-k={t.key}>
                  <svg viewBox="0 0 16 16" width="16" height="16">
                    <path d={t.d} fill="none" stroke="currentColor" strokeWidth="1.2" />
                  </svg>
                </li>
              ))}
              <li className="ps-swatch">
                <i />
                <i />
              </li>
            </ul>

            <div className="ps-doc">
              <div className="ps-tab" aria-hidden>
                my-story.psd @ <span className="ps-zoom">100</span>% (RGB/8) <em>×</em>
              </div>
              <div className="ps-canvas">
                <div className="ps-art ps-art--type" aria-hidden>
                  <h3 className="ps-type">
                    It started
                    <br />
                    as a hobby.
                  </h3>
                  <span className="ps-caret" />
                  <svg className="ps-stroke" viewBox="0 0 600 80" preserveAspectRatio="none">
                    <path d="M8 52 C 110 22, 230 70, 350 40 S 540 26, 592 44" />
                  </svg>
                  <div className="ps-icons">
                    <img src="/img/tool-ps.webp" alt="" />
                    <img src="/img/tool-ai.webp" alt="" />
                    <span className="ps-sel" />
                  </div>
                  <p className="ps-gift">A gift from my big brother.</p>
                </div>
                <div className="ps-art ps-art--boards">
                  {POSTERS.map((p) => (
                    <a
                      key={p.src}
                      className="ps-poster"
                      href={p.href}
                      target="_blank"
                      rel="noreferrer"
                      data-cursor="Behance"
                      aria-label={`${p.name} on Behance (opens in a new tab)`}
                    >
                      <small>{p.name}</small>
                      <div>
                        <img src={p.src} alt="" loading="eager" />
                      </div>
                    </a>
                  ))}
                  <p className="ps-team">Team lead · commercial visuals · 2013</p>
                </div>
              </div>
              <div className="ps-status" aria-hidden>
                <span>Doc: 24.5M/2010</span>
                <span>Pixels, not yet products.</span>
              </div>
            </div>

            <div className="ps-panels" aria-hidden>
              <div className="ps-panel">
                <h4>Layers</h4>
                <ul className="ps-layers">
                  <li className="l-boards">
                    <i className="eye" />
                    <em className="fold">▸</em> Team · 2013
                  </li>
                  <li className="l-ai">
                    <i className="eye" />
                    <em className="so" /> Illustrator.ai
                  </li>
                  <li className="l-ps">
                    <i className="eye" />
                    <em className="so" /> Photoshop.psd
                  </li>
                  <li className="l-brush">
                    <i className="eye" />
                    <em className="th th--y" /> Brush stroke
                  </li>
                  <li className="l-type">
                    <i className="eye" />
                    <em className="t">T</em> It started as a hobby.
                  </li>
                  <li className="is-base">
                    <i className="eye" />
                    <em className="th" /> Background <span className="lock">🔒</span>
                  </li>
                </ul>
              </div>
              <div className="ps-panel">
                <h4>History</h4>
                <ul className="ps-history">
                  <li className="is-base">Open</li>
                  <li className="h-type">Type Tool</li>
                  <li className="h-brush">Brush Tool</li>
                  <li className="h-place">Place Embedded</li>
                  <li className="h-boards">New Artboards</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
