"use client";

import { Fragment, useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

// Chapter 02 — 2014–2018. The story is written as code; scrolling types it and the preview renders it.

type Tok = [string, string?];
// k keyword · f function · s string · c comment · n number · p property · t type
const CODE: Tok[][] = [
  [["// chapter-02.ts — 2014 → 2018", "c"]],
  [["import", "k"], [" { curiosity } "], ["from", "k"], [' "./2010"', "s"], [";"]],
  [],
  [["const", "k"], [" ahmed = "], ["new", "k"], [" Designer", "t"], ["({ since: "], ["2010", "n"], [" });"]],
  [],
  [["// 2014: Faculty of Computers & Informatics", "c"]],
  [["ahmed."], ["learn", "f"], ["(["], ['"algorithms"', "s"], [", "], ['"data structures"', "s"], [", "], ['"HCI"', "s"], ["]);"]],
  [],
  [["// 2018: art meets engineering", "c"]],
  [["const", "k"], [" ux = ahmed."], ["merge", "f"], ["(curiosity, logic);"]],
  [],
  [["export const", "k"], [" Button", "t"], [" = styled."], ["button", "f"], ["`"]],
  [["  background", "p"], [": "], ["#917B50", "n"], [";"]],
  [["  color", "p"], [": "], ["#12100E", "n"], [";"]],
  [["  padding", "p"], [": "], ["18px 30px", "n"], [";"]],
  [["  font", "p"], [": "], ['500 16px "Inter Tight"', "s"], [";"]],
  [["  border-radius", "p"], [": "], ["0", "n"], [";"], ["  // always", "c"]],
  [["`"], [";"]],
  [],
  [["render", "f"], ["(<"], ["Button", "t"], [">Hello, product design</"], ["Button", "t"], [">);"]],
];

const FULL = CODE.map((l) => l.map((t) => t[0]).join("")).join("\n");
// Preview steps unlock once the code has typed past these markers.
const STEPS: [string, string][] = [
  ["styled.button`", "has-el"],
  ["#917B50;", "has-bg"],
  ["#12100E;", "has-color"],
  ["18px 30px;", "has-pad"],
  ['"Inter Tight";', "has-font"],
  ["// always", "has-square"],
  ["</Button>);", "has-text"],
];

const BEATS = [
  { year: "2014", text: "I enrolled in the Faculty of Computers & Informatics to learn how things actually work." },
  { year: "2018", text: "Computer science met my artistic roots, and I stepped into UX/UI design." },
];

export default function ChapterLogic() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const chars = Array.from(el.querySelectorAll<HTMLElement>(".ed-code i"));
    const preview = el.querySelector<HTMLElement>(".ed-preview")!;
    const beats = el.querySelectorAll(".ch-beat");
    const gutter = Array.from(el.querySelectorAll<HTMLElement>(".ed-gutter span"));
    const total = chars.length;
    const lineStarts: number[] = [];
    let acc = 0;
    CODE.forEach((l) => {
      lineStarts.push(acc);
      acc += l.reduce((s, t) => s + t[0].length, 0) + 1;
    });
    const stepAt = STEPS.map(([m]) => FULL.indexOf(m) + m.length);
    let shown = 0;

    const set = (n: number) => {
      if (n > shown) for (let i = shown; i < n; i++) chars[i].className = "on";
      else for (let i = n; i < shown; i++) chars[i].className = "";
      shown = n;
      STEPS.forEach(([, cls], i) => preview.classList.toggle(cls, n >= stepAt[i]));
      const line = lineStarts.filter((s) => s <= n).length - 1;
      gutter.forEach((g, i) => g.classList.toggle("is-on", i === line));
      el.classList.toggle("is-done", n >= total);
      beats.forEach((b, i) => b.classList.toggle("is-on", i === (n > FULL.indexOf("// 2018") ? 1 : 0)));
    };

    let ctx: gsap.Context | undefined;
    let alive = true;
    document.fonts.ready.then(() => {
      if (!alive) return;
      ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: "+=260%",
        pin: ".ch-stage",
        onUpdate: (st) => set(Math.round(Math.min(1, st.progress / 0.85) * total)),
      });
      gsap.from(".ed", { y: 60, scale: 0.94, autoAlpha: 0, duration: 1.2, scrollTrigger: { trigger: el, start: "top 65%" } });
      }, el);
    });
    set(0);
    return () => {
      alive = false;
      ctx?.revert();
    };
  }, []);

  // One <i> per character so typing can be scrubbed without re-rendering.
  let key = 0;
  return (
    <section ref={root} className="ch ch--logic">
      <div className="ch-stage">
        <aside className="ch-copy">
          <p className="label">
            <span>Chapter 02</span> 2014 — 2018
          </p>
          <h2 className="ch-title">
            <span className="mono">Logic</span>
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

        <div className="ed" aria-hidden>
          <div className="ed-bar">
            <span>story</span>
            <span className="is-on">chapter-02.ts</span>
            <span>design.css</span>
          </div>
          <div className="ed-body">
            <ul className="ed-tree">
              <li className="dir">▾ STORY</li>
              <li>2010-pixels.psd</li>
              <li className="is-on">chapter-02.ts</li>
              <li>design.css</li>
              <li className="dir">▸ products</li>
            </ul>
            <div className="ed-main">
              <div className="ed-gutter">
                {CODE.map((_, i) => (
                  <span key={i}>{i + 1}</span>
                ))}
              </div>
              <pre className="ed-code">
                {CODE.map((line, li) => (
                  <Fragment key={li}>
                    {line.map((t, ti) => (
                      <span key={ti} className={t[1] ? `tk-${t[1]}` : undefined}>
                        {t[0].split("").map((c) => (
                          <i key={key++}>{c}</i>
                        ))}
                      </span>
                    ))}
                    <i key={key++}>{"\n"}</i>
                  </Fragment>
                ))}
              </pre>
            </div>
            <div className="ed-side">
              <p className="ed-side-h">Preview</p>
              <div className="ed-preview">
                <button tabIndex={-1}>Hello, product design</button>
              </div>
              <div className="ed-term">
                <p>$ npm run build</p>
                <p className="ed-ok">✓ compiled ux-designer@2018</p>
                <p className="ed-ok">✓ 4 years · 0 errors · 1 new career</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
