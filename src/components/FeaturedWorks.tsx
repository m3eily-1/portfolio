"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { gsap, SplitText, prefersReducedMotion } from "@/lib/gsap";
import { projects } from "@/data/work";
import { navigate } from "@/components/Transition";
import { useGsap } from "@/components/career/useGsap";
import Arrow from "@/components/Arrow";
import { withBase } from "@/lib/scroll";

// Two staggered columns of case-study cards, like the reference's "Featured Works".
// Placeholder: solid grey thumbnails until Ahmed's final images arrive. Set to false to show the mockups again.
const PLACEHOLDER = true;
type Props = {
  /** Show only the first N projects plus an "All works" button (home page). */
  limit?: number;
  /** Page heading variant for /work. */
  all?: boolean;
};

export default function FeaturedWorks({ limit, all = false }: Props) {
  const root = useRef<HTMLElement>(null);
  const router = useRouter();
  const list = limit ? projects.slice(0, limit) : projects;
  const cols = [list.filter((_, i) => i % 2 === 0), list.filter((_, i) => i % 2 === 1)];

  useGsap(root, (el) => {
    if (prefersReducedMotion()) return;
    const t = new SplitText(el.querySelector(".fw-title"), { type: "words", mask: "words", wordsClass: "sw" });
    gsap.from(t.words, { yPercent: 140, stagger: 0.08, duration: 1.3, scrollTrigger: { trigger: ".fw-title", start: "top 80%" } });
    gsap.utils.toArray<HTMLElement>(".fw-card").forEach((c) => {
      gsap.fromTo(c.querySelector(".fw-img"), { clipPath: "inset(14% 8% 14% 8%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "none", scrollTrigger: { trigger: c, start: "top 95%", end: "top 45%", scrub: true } });
      gsap.fromTo(c.querySelector(".fw-img img"), { scale: 1.25 }, { scale: 1.02, ease: "none", scrollTrigger: { trigger: c, start: "top bottom", end: "bottom top", scrub: true } });
      gsap.from(c.querySelector(".fw-meta"), { y: 24, autoAlpha: 0, duration: 1, scrollTrigger: { trigger: c, start: "top 70%" } });
    });
    // The right column drifts a little slower for depth.
    gsap.to(".fw-col--b", { yPercent: -6, ease: "none", scrollTrigger: { trigger: ".fw-grid", start: "top bottom", end: "bottom top", scrub: true } });
  });

  return (
    <section ref={root} className="fw" id="work">
      <div className="fw-head">
        <div className="fw-head-l">
          <p className="label">
            <span>{all ? "(All)" : "(02)"}</span> {all ? `${projects.length} case studies` : "Selected work"}
          </p>
          <p className="fw-lede">
            {all
              ? "Every case study, from design systems and government platforms to fintech, telecom and health."
              : "A few of the 40+ products I\u2019ve shaped, across design systems, government, fintech, telecom and health."}
          </p>
        </div>
        {all ? (
          <h1 className="fw-title">
            All <em>Works</em>
          </h1>
        ) : (
          <h2 className="fw-title">
            Featured <em>Works</em>
          </h2>
        )}
      </div>

      <div className="fw-grid">
        {cols.map((col, ci) => (
          <div key={ci} className={`fw-col fw-col--${ci ? "b" : "a"}`}>
            {col.map((p, i) => (
              <a
                key={p.slug}
                href={withBase(`/work/${p.slug}`)}
                className={`fw-card${(i + ci) % 2 ? " is-tall" : ""}`}
                data-cursor="View"
                onClick={(e) => {
                  e.preventDefault();
                  navigate(router, `/work/${p.slug}`);
                }}
              >
                <div className={`fw-img${PLACEHOLDER ? " is-ph" : ""}`}>
                  {!PLACEHOLDER && <img src={p.cover} alt={`${p.name} mockups`} loading="lazy" />}
                </div>
                <div className="fw-meta">
                  <div>
                    <h3>{p.name}</h3>
                    <p>{p.summary}</p>
                  </div>
                  <span className="fw-tags">
                    {p.category} · {p.duration}
                  </span>
                  <span className="fw-go">
                    <Arrow dir="up-right" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        ))}
      </div>

      {limit && limit < projects.length && (
        <div className="fw-cta">
          <a
            className="btn btn--line"
            href={withBase("/work")}
            onClick={(e) => {
              e.preventDefault();
              navigate(router, "/work");
            }}
          >
            <span className="btn-ico">
              <Arrow />
            </span>
            All works ({projects.length})
          </a>
        </div>
      )}
    </section>
  );
}
