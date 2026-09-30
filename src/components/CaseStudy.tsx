"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { gsap, SplitText, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { projects, getProject, nextProject } from "@/data/work";
import { navigate } from "@/components/Transition";
import Arrow from "@/components/Arrow";
import { withBase } from "@/lib/scroll";

export default function CaseStudy({ slug }: { slug: string }) {
  const p = getProject(slug)!;
  const next = nextProject(slug);
  const index = projects.findIndex((q) => q.slug === slug);
  const root = useRef<HTMLElement>(null);
  const router = useRouter();

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    let ctx: gsap.Context | undefined;
    let alive = true;
    document.fonts.ready.then(() => {
      if (!alive) return;
      ctx = gsap.context(() => {
        const reduced = prefersReducedMotion();
        if (!reduced) {
          const name = new SplitText(".cs-name", { type: "words,chars", mask: "chars", charsClass: "sc" });
          gsap
            .timeline({ defaults: { ease: "expo.out" }, delay: 0.35 })
            .from(name.chars, { yPercent: 140, stagger: 0.035, duration: 1.4 })
            .from(".cs-meta > *, .cs-summary", { y: 24, autoAlpha: 0, stagger: 0.07, duration: 1 }, 0.3)
            .fromTo(".cs-cover", { clipPath: "inset(30% 8% 0% 8%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.8, ease: "expo.inOut" }, 0.2);
          gsap.fromTo(".cs-cover img", { scale: 1.2 }, { scale: 1, ease: "none", scrollTrigger: { trigger: ".cs-cover", start: "top bottom", end: "bottom top", scrub: true } });
          gsap.utils.toArray<HTMLElement>(".cs-reveal").forEach((r) =>
            gsap.from(r, { y: 50, autoAlpha: 0, duration: 1.2, scrollTrigger: { trigger: r, start: "top 86%" } }),
          );
          gsap.utils.toArray<HTMLElement>(".cs-gal figure").forEach((f) =>
            gsap.fromTo(f, { clipPath: "inset(12% 12% 12% 12%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "none", scrollTrigger: { trigger: f, start: "top 95%", end: "top 35%", scrub: true } }),
          );
        }
        gsap.utils.toArray<HTMLElement>(".cs-impact b").forEach((b) => {
          const o = { v: reduced ? Number(b.dataset.to) : 0 };
          b.textContent = String(o.v);
          if (reduced) return;
          gsap.to(o, { v: Number(b.dataset.to), duration: 2, ease: "power3.out", scrollTrigger: { trigger: b, start: "top 85%" }, onUpdate: () => (b.textContent = String(Math.round(o.v))) });
        });
        ScrollTrigger.refresh();
      }, el);
    });
    return () => {
      alive = false;
      ctx?.revert();
    };
  }, [slug]);

  const go = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(router, href);
  };

  return (
    <main ref={root} className="cs" key={slug}>
      <section className="cs-hero">
        <p className="label">
          <span>Case study</span> {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
        </p>
        <h1 className="cs-name">{p.name}</h1>
        <dl className="cs-meta">
          {p.client && (
            <div>
              <dt>Client</dt>
              <dd>{p.client}</dd>
            </div>
          )}
          <div>
            <dt>Category</dt>
            <dd>{p.category}</dd>
          </div>
          <div>
            <dt>Timeline</dt>
            <dd>{p.duration}</dd>
          </div>
          {p.link && (
            <div>
              <dt>Live</dt>
              <dd>
                <a href={p.link.href} target="_blank" rel="noreferrer">
                  {p.link.label} ↗
                </a>
              </dd>
            </div>
          )}
        </dl>
        <p className="cs-summary">{p.summary}</p>
      </section>

      <figure className="cs-cover">
        <img src={p.cover} alt={`${p.name} mockups`} />
      </figure>

      <section className="cs-block cs-reveal">
        <p className="label">
          <span>01</span> Overview
        </p>
        <p className="cs-overview">{p.overview}</p>
      </section>

      {p.sections.map((s, si) => (
        <section key={s.title} className="cs-block">
          <p className="label cs-sticky">
            <span>{String(si + 2).padStart(2, "0")}</span> {s.title}
          </p>
          <ol className="cs-items">
            {s.items.map((it, i) => (
              <li key={i} className="cs-reveal">
                <b>{String(i + 1).padStart(2, "0")}</b>
                <div>
                  {it.head && <h3>{it.head}</h3>}
                  <p>{it.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      ))}

      {p.impact && (
        <section className="cs-impact">
          <p className="label">
            <span>Impact</span> What changed
          </p>
          <div className="cs-impact-grid">
            {p.impact.map((m) => (
              <div key={m.label} className="cs-reveal">
                <strong>
                  <b data-to={m.value}>{m.value}</b>
                  {m.suffix}
                </strong>
                <h3>{m.label}</h3>
                <p>{m.text}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {p.images.length > 1 && (
        <section className="cs-gal">
          {p.images.slice(1).map((src) => (
            <figure key={src}>
              <img src={src} alt="" loading="lazy" />
            </figure>
          ))}
        </section>
      )}

      <a className="cs-next" href={withBase(`/work/${next.slug}`)} onClick={go(`/work/${next.slug}`)} data-cursor="Next">
        <span className="label">
          <span>Next case</span> {next.category}
        </span>
        <strong>{next.name}</strong>
        <img src={next.cover} alt="" loading="lazy" />
        <span className="cs-next-go">
          <Arrow />
        </span>
      </a>
      <footer className="cs-foot">
        <a href={withBase("/#work")} onClick={go("/#work")}>
          ← All work
        </a>
        <span>© 2026 Ahmed Mealy</span>
      </footer>
    </main>
  );
}
