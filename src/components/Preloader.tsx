"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { lockScroll } from "@/lib/scroll";
import { preloadDone } from "@/lib/preload";
import { NAME_GLYPHS, NAME_META } from "@/data/nameGlyphs";

/*
  Preloader after studionamma.com: the name starts as vector outlines seen up close in a design tool
  (anchor points, guides), the camera pulls back, a wave of gold then bone fills the letters,
  and they drop through the baseline with a vertical motion blur to reveal the page.
*/

const { w: W, h: H, baseline: BASE, cap: CAP, xh: XH } = NAME_META;
const PAD = 260; // breathing room around the word in the full view (font units)
const ANCHORS = NAME_GLYPHS.flatMap((g) => g.a.map(([x, y]) => `M${x} ${y}h0.01`)).join("");

// A wave-topped shape whose crest sits at `level` (font units, smaller = higher).
const wave = (level: number, phase: number, amp: number) => {
  let d = `M${-PAD * 4} ${H + 400}`;
  for (let x = -PAD * 4; x <= W + PAD * 4; x += 160) {
    d += `L${x} ${level + Math.sin(x * 0.0011 + phase) * amp + Math.sin(x * 0.0029 - phase * 1.3) * amp * 0.45}`;
  }
  return `${d}L${W + PAD * 4} ${H + 400}Z`;
};

export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const el = root.current;
    const s = svg.current;
    if (!el || !s) return;
    if (prefersReducedMotion()) {
      setGone(true);
      preloadDone();
      return;
    }
    lockScroll(true);

    // Full view: the word spans ~84% of the screen width, centred.
    const aspect = window.innerHeight / window.innerWidth;
    const fw = W + PAD * 2;
    const fh = fw * aspect;
    const full = { x: -PAD, y: H / 2 - fh / 2, w: fw, h: fh };
    // Close-ups: ~9x zoom, drifting from the "A" across to the "M" of Mealy.
    const zw = fw / 9;
    const zh = zw * aspect;
    const close1 = { x: 380, y: (CAP + BASE) / 2 - zh * 0.42, w: zw, h: zh }; // the apex and bowl of the "A"
    const close2 = { x: NAME_GLYPHS[5].x - zw * 0.1, y: CAP - zh * 0.15, w: zw * 1.25, h: zh * 1.25 };
    const cam = { ...close1 };
    const setView = () => s.setAttribute("viewBox", `${cam.x} ${cam.y} ${cam.w} ${cam.h}`);
    setView();

    const fill = { gold: H + 300, bone: H + 300, phase: 0 };
    const gold = s.querySelector<SVGPathElement>("#pl-wave-gold path")!;
    const bone = s.querySelector<SVGPathElement>("#pl-wave-bone path")!;
    const drawWaves = () => {
      gold.setAttribute("d", wave(fill.gold, fill.phase, 140));
      bone.setAttribute("d", wave(fill.bone, fill.phase + 1.1, 120));
    };
    drawWaves();

    const outlines = s.querySelectorAll<SVGPathElement>(".pl-outline path");
    const guides = s.querySelectorAll<SVGLineElement>(".pl-guides line");
    const letters = s.querySelectorAll<SVGGElement>(".pl-solid g");
    const blurs = s.querySelectorAll<SVGFEGaussianBlurElement>("feGaussianBlur");

    const tl = gsap.timeline({
      delay: 0.15,
      onComplete: () => {
        lockScroll(false);
        setGone(true);
      },
    });
    if (process.env.NODE_ENV !== "production") Object.assign(window, { __plTL: tl }); // dev-only QA hook
    tl.fromTo(outlines, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.9, stagger: 0.03, ease: "power2.inOut" }, 0)
      .fromTo(".pl-anchors", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 }, 0.1)
      // camera: drift across the outlines, then pull all the way back
      .to(cam, { ...close2, duration: 1.3, ease: "sine.inOut", onUpdate: setView }, 0)
      .to(cam, { ...full, duration: 0.95, ease: "expo.inOut", onUpdate: setView }, 1.25)
      .fromTo(guides, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.8, stagger: 0.05, ease: "power3.out" }, 1.55)
      // liquid fill: gold leads, bone follows
      .to(fill, { phase: 6, duration: 1.4, ease: "none", onUpdate: drawWaves }, 2.0)
      .to(fill, { gold: -260, duration: 0.85, ease: "power2.inOut" }, 2.0)
      .to(fill, { bone: -260, duration: 0.85, ease: "power2.inOut" }, 2.18)
      .set([".pl-outline", ".pl-anchors", ".pl-guides", ".pl-fill"], { autoAlpha: 0 }, 3.05)
      .set(".pl-solid", { autoAlpha: 1 }, 3.05)
      // exit: letters drop through the baseline, left to right, with a vertical motion blur
      .to(letters, { y: H * 1.1, duration: 0.55, stagger: 0.045, ease: "power3.in" }, 3.3)
      .to(blurs, { attr: { stdDeviation: "0 70" }, duration: 0.45, stagger: 0.045, ease: "power2.in" }, 3.3)
      // hand over to the hero just before the last letter leaves
      .add(() => preloadDone(), "-=0.3")
      .to(el, { autoAlpha: 0, duration: 0.2 });

    return () => {
      tl.kill();
      lockScroll(false);
    };
  }, []);

  if (gone) return null;
  return (
    <div ref={root} className="pl" aria-hidden>
      <svg ref={svg} className="pl-svg" viewBox={`${-PAD} 0 ${W + PAD * 2} ${H}`} preserveAspectRatio="xMidYMid meet">
        <defs>
          <clipPath id="pl-wave-gold" clipPathUnits="userSpaceOnUse">
            <path />
          </clipPath>
          <clipPath id="pl-wave-bone" clipPathUnits="userSpaceOnUse">
            <path />
          </clipPath>
          {/* letters drop out of the line box; the clip ends just under the descender */}
          <clipPath id="pl-line" clipPathUnits="userSpaceOnUse">
            <rect x={-PAD * 4} y={-H} width={W + PAD * 8} height={H * 2} />
          </clipPath>
          <g id="pl-glyphs">
            {NAME_GLYPHS.map((g, i) => (
              <path key={i} d={g.d} />
            ))}
          </g>
          {NAME_GLYPHS.map((_, i) => (
            <filter key={i} id={`pl-blur-${i}`} x="-20%" y="-60%" width="140%" height="220%">
              <feGaussianBlur stdDeviation="0 0" />
            </filter>
          ))}
        </defs>

        <g className="pl-guides">
          {[CAP, XH, BASE].map((y) => (
            <line key={y} x1={-PAD * 6} x2={W + PAD * 6} y1={y} y2={y} pathLength={1} />
          ))}
          {NAME_GLYPHS.filter((_, i) => i === 0 || i === 5).map((g) => (
            <line key={g.x} x1={g.x} x2={g.x} y1={-H} y2={H * 2} pathLength={1} />
          ))}
        </g>

        <g className="pl-fill">
          <use href="#pl-glyphs" className="pl-fill-gold" clipPath="url(#pl-wave-gold)" />
          <use href="#pl-glyphs" className="pl-fill-bone" clipPath="url(#pl-wave-bone)" />
        </g>

        <g className="pl-outline">
          {NAME_GLYPHS.map((g, i) => (
            <path key={i} d={g.d} pathLength={1} />
          ))}
        </g>
        <path className="pl-anchors" d={ANCHORS} />

        <g className="pl-solid" clipPath="url(#pl-line)">
          {NAME_GLYPHS.map((g, i) => (
            <g key={i} filter={`url(#pl-blur-${i})`}>
              <path d={g.d} />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
