"use client";

import { useRef, useState } from "react";
import { gsap, isFinePointer, prefersReducedMotion } from "@/lib/gsap";
import { useGsap } from "@/components/career/useGsap";

// Delight: a small playground of micro-interactions. Each tile is a principle you can try.

function LikeTile() {
  const btn = useRef<HTMLButtonElement>(null);
  const [count, setCount] = useState(128);
  const [on, setOn] = useState(false);
  const pop = () => {
    const b = btn.current;
    if (!b) return;
    const next = !on;
    setOn(next);
    setCount((c) => c + (next ? 1 : -1));
    if (prefersReducedMotion()) return;
    gsap.fromTo(b.querySelector("svg"), { scale: 0.6 }, { scale: 1, duration: 0.6, ease: "elastic.out(1.2, 0.4)" });
    if (!next) return;
    // square confetti, no radii
    for (let i = 0; i < 12; i++) {
      const p = document.createElement("i");
      p.className = "dl-bit";
      b.appendChild(p);
      const a = (i / 12) * Math.PI * 2;
      gsap.fromTo(p, { x: 0, y: 0, rotate: 0, autoAlpha: 1 }, { x: Math.cos(a) * gsap.utils.random(40, 70), y: Math.sin(a) * gsap.utils.random(40, 70), rotate: gsap.utils.random(-180, 180), autoAlpha: 0, duration: 0.8, ease: "power3.out", onComplete: () => p.remove() });
    }
  };
  return (
    <div className="dl-demo">
      <button ref={btn} className={`dl-like${on ? " is-on" : ""}`} onClick={pop} aria-pressed={on} aria-label="Like">
        <svg viewBox="0 0 24 24" width="30" height="30" aria-hidden>
          <path d="M12 21s-7.5-4.6-9.5-9.3C1 8.2 3.2 4.5 6.9 4.5c2.1 0 3.6 1.1 5.1 3 1.5-1.9 3-3 5.1-3 3.7 0 5.9 3.7 4.4 7.2C19.5 16.4 12 21 12 21Z" />
        </svg>
      </button>
      <span className="dl-count">{count}</span>
    </div>
  );
}

function ToggleTile() {
  const [on, setOn] = useState(false);
  const knob = useRef<HTMLSpanElement>(null);
  const flip = () => {
    const next = !on;
    setOn(next);
    if (knob.current && !prefersReducedMotion()) gsap.to(knob.current, { x: next ? 40 : 0, duration: 0.7, ease: "elastic.out(1, 0.5)" });
  };
  return (
    <div className="dl-demo">
      <button className={`dl-toggle${on ? " is-on" : ""}`} onClick={flip} role="switch" aria-checked={on} aria-label="Notify me">
        <span ref={knob} />
      </button>
      <span className="dl-state">{on ? "We’ll remind you ✓" : "Remind me before the show"}</span>
    </div>
  );
}

function TicketTile() {
  const card = useRef<HTMLDivElement>(null);
  const move = (e: React.PointerEvent) => {
    const c = card.current;
    if (!c || !isFinePointer() || prefersReducedMotion()) return;
    const r = c.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(c, { rotateY: x * 22, rotateX: -y * 22, duration: 0.5, ease: "power3.out" });
    c.style.setProperty("--gx", `${(x + 0.5) * 100}%`);
    c.style.setProperty("--gy", `${(y + 0.5) * 100}%`);
  };
  const leave = () => card.current && gsap.to(card.current, { rotateY: 0, rotateX: 0, duration: 0.9, ease: "elastic.out(1, 0.5)" });
  return (
    <div className="dl-demo dl-demo--3d" onPointerMove={move} onPointerLeave={leave}>
      <div ref={card} className="dl-ticket">
        <p>Tonight · 20:00</p>
        <strong>Gate B · Row 4 · Seat 12</strong>
        <span className="dl-stub">Admit one</span>
      </div>
    </div>
  );
}

function MagnetTile() {
  const b = useRef<HTMLButtonElement>(null);
  const [n, setN] = useState(0);
  const move = (e: React.PointerEvent) => {
    const el = b.current;
    if (!el || prefersReducedMotion()) return;
    const r = el.getBoundingClientRect();
    gsap.to(el, { x: (e.clientX - (r.left + r.width / 2)) * 0.4, y: (e.clientY - (r.top + r.height / 2)) * 0.4, duration: 0.5, ease: "power3.out" });
  };
  const leave = () => b.current && gsap.to(b.current, { x: 0, y: 0, duration: 0.9, ease: "elastic.out(1, 0.4)" });
  const labels = ["Book now", "Almost…", "Booked ✓"];
  return (
    <div className="dl-demo" onPointerMove={move} onPointerLeave={leave}>
      <button ref={b} className="dl-magnet" onClick={() => setN((v) => (v + 1) % labels.length)}>
        {labels[n]}
      </button>
    </div>
  );
}

const TILES = [
  { n: "01", title: "Feedback you can feel", text: "Every tap answers back, instantly and with character.", Demo: LikeTile },
  { n: "02", title: "Motion that explains", text: "Movement shows what changed and where it went.", Demo: ToggleTile },
  { n: "03", title: "Tactile surfaces", text: "Depth and light make digital things feel real.", Demo: TicketTile },
  { n: "04", title: "Playful, never in the way", text: "Small surprises that reward curiosity, then step aside.", Demo: MagnetTile },
];

export default function Delight() {
  const root = useRef<HTMLElement>(null);
  useGsap(root, () => {
    if (prefersReducedMotion()) return;
    gsap.from(".dl-head > *", { y: 30, autoAlpha: 0, stagger: 0.1, duration: 1.1, scrollTrigger: { trigger: ".dl", start: "top 70%" } });
    gsap.from(".dl-tile", { y: 50, autoAlpha: 0, stagger: 0.1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: ".dl-grid", start: "top 80%" } });
  });
  return (
    <section ref={root} className="dl" id="delight">
      <div className="dl-head">
        <p className="label">
          <span>+</span> Delight
        </p>
        <h2 className="dl-title">
          Delight is in <em>the details.</em>
        </h2>
        <p className="dl-lede">
          Great products don&rsquo;t just work, they feel good to use. Go on, play with these. The ring in the hero and the
          chapters above were made the same way.
        </p>
      </div>
      <ul className="dl-grid">
        {TILES.map(({ n, title, text, Demo }) => (
          <li key={n} className="dl-tile">
            <Demo />
            <div className="dl-copy">
              <b>{n}</b>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
