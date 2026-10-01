"use client";

import { useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useGsap } from "@/components/career/useGsap";

// Services as an accordion, like the reference. Items come from the PDF's UX/UI skill lists.
const SERVICES = [
  {
    name: "Product Design",
    items: ["iOS and Android app design", "Responsive web apps and dashboards", "User flows and wireframes", "UI directions and visual design", "Prototypes for testing"],
  },
  {
    name: "AI Product Design",
    items: ["AI features and assistant experiences", "Conversation and prompt design", "Working prototypes built with AI coding agents", "Fast concepting with generative image and video tools"],
  },
  {
    name: "Design Systems",
    items: ["Typography, colour and UI components", "Reusable libraries in Figma", "Style guides and interaction patterns", "Workshops and support for dev teams"],
  },
  {
    name: "UX Research & Audit",
    items: ["User research and interviews", "Expert audits with the 10 heuristics and UX laws", "Competitive analysis", "Usability testing with real users"],
  },
  {
    name: "Interaction & Prototyping",
    items: ["Interaction design", "Clickable prototypes in Figma and ProtoPie", "Accessibility checks", "Clear handoff to development"],
  },
];

export default function Services() {
  const root = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(0);

  useGsap(root, () => {
    if (prefersReducedMotion()) return;
    gsap.from(".sv-l > *", { y: 30, autoAlpha: 0, stagger: 0.1, duration: 1.1, scrollTrigger: { trigger: ".sv", start: "top 70%" } });
    gsap.from(".sv-item", { y: 30, autoAlpha: 0, stagger: 0.08, duration: 1, scrollTrigger: { trigger: ".sv-list", start: "top 80%" } });
  });

  return (
    <section ref={root} className="sv" id="services">
      <div className="sv-l">
        <h2 className="sv-title">Expertise to ship quality products</h2>
        <p className="sv-blurb">Focused product design to help teams shape, improve and launch clearer, more consistent digital products.</p>
      </div>
      <div className="sv-r">
        <p className="label">
          <span>+</span> Services
        </p>
        <ul className="sv-list">
          {SERVICES.map((s, i) => (
            <li key={s.name} className={`sv-item${open === i ? " is-open" : ""}`}>
              <button className="sv-btn" aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
                <span>{s.name}</span>
                <i aria-hidden>{open === i ? "−" : "+"}</i>
              </button>
              <div className="sv-body">
                <ul>
                  {s.items.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
