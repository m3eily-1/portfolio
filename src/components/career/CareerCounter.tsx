"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { releases } from "@/data/site";
import CareerHead from "./CareerHead";
import { useGsap } from "./useGsap";

const DIGITS = Array.from({ length: 10 }, (_, i) => i);

// D · a giant year rolls like an odometer on the left while the roles pass on the right.
export default function CareerCounter() {
  const root = useRef<HTMLElement>(null);
  useGsap(root, (el) => {
    const strips = gsap.utils.toArray<HTMLElement>(".yc-strip");
    const roles = gsap.utils.toArray<HTMLElement>(".yc-role");
    const list = el.querySelector<HTMLElement>(".yc-roles")!;
    let current = -1;
    const show = (i: number) => {
      if (i === current) return;
      current = i;
      const year = releases[i].years.slice(0, 4);
      year.split("").forEach((d, k) => gsap.to(strips[k], { yPercent: -Number(d) * 10, duration: 1, ease: "expo.inOut", delay: k * 0.05, overwrite: true }));
      roles.forEach((r, j) => r.classList.toggle("is-on", j === i));
    };
    show(0);
    ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: () => `+=${window.innerHeight * 2.4}`,
      pin: ".yc-stage",
      scrub: prefersReducedMotion() ? true : 0.6,
      invalidateOnRefresh: true,
      // Travel exactly first card → last card, so the last role ends where the first began.
      animation: gsap.to(list, { y: () => -(roles[roles.length - 1].offsetTop - roles[0].offsetTop), ease: "none" }),
      onUpdate: (st) => show(Math.min(releases.length - 1, Math.floor(st.progress * releases.length))),
    });
  });
  return (
    <section ref={root} className="cr cr--yc">
      <div className="yc-stage">
        <div className="yc-left">
          <CareerHead lede={false} />
          <div className="yc-year" aria-hidden>
            {[0, 1, 2, 3].map((c) => (
              <span key={c} className="yc-col">
                <span className="yc-strip">
                  {DIGITS.map((d) => (
                    <span key={d}>{d}</span>
                  ))}
                </span>
              </span>
            ))}
          </div>
        </div>
        <div className="yc-right">
          <ol className="yc-roles">
            {releases.map((r) => (
              <li key={r.version} className="yc-role">
                <span className="yc-when">
                  {r.years} · {r.place}
                </span>
                <img className="yc-logo" src={r.logo} alt={`${r.company} logo`} />
                <h3>{r.company}</h3>
                <p className="yc-rt">{r.role}</p>
                <ul>
                  {r.notes.map((n) => (
                    <li key={n.text}>{n.text}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
