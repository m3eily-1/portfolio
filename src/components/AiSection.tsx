"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { useGsap } from "@/components/career/useGsap";

// AI: the answer arrives the way AI answers do — typed prompt, "thinking", then a streamed reply.
const PROMPT = "How do you design with AI?";
const PILLARS = [
  { n: "01", title: "AI-built prototypes", text: "I pair design with AI coding agents to ship working prototypes in days, not weeks: this site, 3D event maps and concept apps." },
  { n: "02", title: "AI in my workflow", text: "Figma with AI (MCP), ChatGPT and generative image and video tools speed up research, UX copy, ideation and assets." },
  { n: "03", title: "Designing AI products", text: "AI features that feel human and trustworthy: assistants, smart recommendations and conversational flows." },
];

export default function AiSection() {
  const root = useRef<HTMLElement>(null);
  useGsap(root, (el) => {
    const typed = el.querySelector<HTMLElement>(".ai-typed")!;
    const reduced = prefersReducedMotion();
    if (reduced) {
      typed.textContent = PROMPT;
      el.classList.add("is-answered");
      return;
    }
    gsap.from(".ai-l > *", { y: 30, autoAlpha: 0, stagger: 0.1, duration: 1.1, scrollTrigger: { trigger: el, start: "top 70%" } });
    const state = { n: 0 };
    const tl = gsap.timeline({ paused: true });
    tl.to(state, {
      n: PROMPT.length,
      duration: PROMPT.length * 0.045,
      ease: "none",
      onUpdate: () => (typed.textContent = PROMPT.slice(0, Math.round(state.n))),
    })
      .call(() => el.classList.add("is-sent"))
      .to(".ai-think", { autoAlpha: 1, duration: 0.2 }, "+=0.2")
      .to(".ai-think", { autoAlpha: 0, duration: 0.2 }, "+=1.1")
      .call(() => el.classList.add("is-answered"))
      .from(".ai-pillar", { y: 24, autoAlpha: 0, stagger: 0.35, duration: 0.8, ease: "power3.out" });
    ScrollTrigger.create({ trigger: ".ai-chat", start: "top 75%", once: true, onEnter: () => tl.play() });
  });

  return (
    <section ref={root} className="ai" id="ai">
      <div className="ai-l">
        <p className="label">
          <span>+</span> AI
        </p>
        <h2 className="ai-title">
          AI in how I design, <em>and what I design.</em>
        </h2>
        <p className="ai-lede">
          AI changed how products get made. I use it end to end, from research to working prototypes, and design AI features
          people actually enjoy using.
        </p>
      </div>

      <div className="ai-chat" aria-label="How I design with AI">
        <div className="ai-bar" aria-hidden>
          <span className="ai-dot" />
          Ahmed · design co-pilot
        </div>
        <div className="ai-body">
          <div className="ai-msg ai-msg--me">
            <span className="ai-typed" aria-hidden />
            <span className="ai-caret" aria-hidden />
            <span className="sr-only">{PROMPT}</span>
          </div>
          <div className="ai-think" aria-hidden>
            <i />
            <i />
            <i />
          </div>
          <ol className="ai-answer">
            {PILLARS.map((p) => (
              <li key={p.n} className="ai-pillar">
                <b>{p.n}</b>
                <div>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="ai-input" aria-hidden>
          <span>Ask anything about my process…</span>
          <i>↑</i>
        </div>
      </div>
    </section>
  );
}
