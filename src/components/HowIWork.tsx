"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useGsap } from "@/components/career/useGsap";

// Numbered steps (Double Diamond phases), laid out like the reference's "How we work".
const STEPS = [
  { title: "Discover the Right Problem", text: "Research before pixels: interviews, UX audits, competitors and data, with AI to help synthesise it, until the real problem is clear.", img: "/img/process/discover.webp" },
  { title: "Define It Sharply", text: "Turn findings into problem statements, user flows and success metrics everyone agrees on.", img: "/img/process/define.webp" },
  { title: "Develop and Explore", text: "Explore wide with wireframes, UI directions and AI-built working prototypes, then converge on the strongest one.", img: "/img/process/develop.webp" },
  { title: "Deliver with Clarity", text: "Test with real users, refine, hand off every asset and support the build through launch.", img: "/img/process/deliver.webp" },
];

export default function HowIWork() {
  const root = useRef<HTMLElement>(null);
  useGsap(root, () => {
    if (prefersReducedMotion()) return;
    gsap.utils.toArray<HTMLElement>(".hw-step").forEach((s) => {
      gsap
        .timeline({ scrollTrigger: { trigger: s, start: "top 75%" } })
        .from(s.querySelector(".hw-rule"), { scaleX: 0, transformOrigin: "left", duration: 1.4, ease: "expo.inOut" })
        .from(s.querySelectorAll(".hw-n, .hw-title, .hw-text"), { y: 40, autoAlpha: 0, stagger: 0.08, duration: 1.1 }, 0.2)
        .fromTo(s.querySelector(".hw-img"), { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 1.4, ease: "expo.inOut" }, 0.15);
      gsap.fromTo(s.querySelector(".hw-img img"), { yPercent: -6 }, { yPercent: 6, ease: "none", scrollTrigger: { trigger: s, start: "top bottom", end: "bottom top", scrub: true } });
    });
  });
  return (
    <section ref={root} className="hw" id="process">
      <div className="hw-head">
        <p className="label">
          <span>+</span> How I work
        </p>
        <p className="hw-lede">I lean on the Double Diamond for its flexibility and user focus, and adapt when a problem needs a different shape.</p>
      </div>
      <ol className="hw-list">
        {STEPS.map((s, i) => (
          <li key={s.title} className="hw-step">
            <span className="hw-rule" />
            <span className="hw-n">{String(i + 1).padStart(2, "0")}.</span>
            <div className="hw-copy">
              <h3 className="hw-title">{s.title}</h3>
              <p className="hw-text">{s.text}</p>
            </div>
            {/* Free Unsplash photos (licence: free use, no attribution needed), graded to the site palette. */}
            <figure className="hw-img" aria-hidden>
              <img src={s.img} alt="" loading="lazy" />
            </figure>
          </li>
        ))}
      </ol>
    </section>
  );
}
