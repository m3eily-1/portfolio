"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { person } from "@/data/site";
import { getLenis, lockScroll } from "@/lib/scroll";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { navigate } from "@/components/Transition";
import Arrow from "@/components/Arrow";

const LINKS = [
  { id: "story", label: "Story" },
  { id: "work", label: "Work" },
  { id: "process", label: "Process" },
  { id: "contact", label: "Contact" },
];
// The phone menu has room for a couple more.
const MENU = [
  { id: "story", label: "Story" },
  { id: "work", label: "Work" },
  { id: "delight", label: "Delight" },
  { id: "services", label: "Services" },
  { id: "process", label: "Process" },
  { id: "contact", label: "Contact" },
];

export default function Header() {
  const root = useRef<HTMLElement>(null);
  const router = useRouter();
  const path = usePathname();
  const menu = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  // Mobile menu: lock the page, reveal the panel top-down, stagger the links in.
  useEffect(() => {
    const el = menu.current;
    if (!el) return;
    lockScroll(open);
    root.current?.classList.toggle("is-menu", open);
    if (prefersReducedMotion()) {
      gsap.set(el, { autoAlpha: open ? 1 : 0 });
      return;
    }
    if (open) {
      gsap.set(el, { autoAlpha: 1 });
      gsap.fromTo(el, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 0.8, ease: "expo.inOut" });
      gsap.fromTo(el.querySelectorAll(".mm-link, .mm-foot > *"), { yPercent: 60, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, stagger: 0.05, duration: 0.8, delay: 0.3, ease: "expo.out" });
    } else {
      gsap.to(el, { clipPath: "inset(0 0 100% 0)", duration: 0.6, ease: "expo.inOut", onComplete: () => gsap.set(el, { autoAlpha: 0 }) });
    }
  }, [open]);

  // Close if the route changes or the screen grows past the phone layout.
  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 901px)");
    const on = () => mq.matches && setOpen(false);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  // Hide on scroll down, show on scroll up; compact once past the hero.
  useEffect(() => {
    let last = window.scrollY;
    const on = () => {
      const y = window.scrollY;
      const el = root.current;
      if (!el) return;
      el.classList.toggle("is-hidden", y > last && y > 200);
      el.classList.toggle("is-solid", y > 80);
      last = y;
    };
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const go = (id: string) => {
    if (path !== "/") return navigate(router, `/#${id}`);
    getLenis()?.scrollTo(`#${id}`, { duration: 1.8 });
  };
  const goFromMenu = (id: string) => {
    setOpen(false);
    // Wait for the scroll lock to lift before travelling.
    setTimeout(() => go(id), 450);
  };

  return (
    <>
    <header ref={root} className="hdr">
      <button className="hdr-name" onClick={() => (path === "/" ? getLenis()?.scrollTo(0, { duration: 1.6 }) : navigate(router, "/"))}>
        <img className="logo" src="/logo/logo-am.svg?v=3" alt={person.name} />
      </button>
      <nav className="hdr-nav">
        {LINKS.map((l) => (
          <button key={l.id} onClick={() => go(l.id)}>
            {l.label}
          </button>
        ))}
      </nav>
      <a className="btn btn--line hdr-cta" href={`mailto:${person.email}`}>
        <span className="btn-ico">
          <Arrow />
        </span>
        Let&rsquo;s talk
      </a>
      <button className="hdr-menu" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-controls="mobile-menu">
        <span>{open ? "Close" : "Menu"}</span>
        <i aria-hidden className={open ? "is-x" : ""}>
          <b />
          <b />
        </i>
      </button>
    </header>

    <div ref={menu} id="mobile-menu" className="mm" aria-hidden={!open}>
      <nav className="mm-nav">
        {MENU.map((l, i) => (
          <button key={l.id} className="mm-link" onClick={() => goFromMenu(l.id)} tabIndex={open ? 0 : -1}>
            <b>{String(i + 1).padStart(2, "0")}</b>
            {l.label}
          </button>
        ))}
      </nav>
      <div className="mm-foot">
        <a className="btn btn--light" href={`mailto:${person.email}`} tabIndex={open ? 0 : -1}>
          <span className="btn-ico">
            <Arrow />
          </span>
          Let&rsquo;s talk
        </a>
        <p>{person.email}</p>
        <p className="mm-social">
          {person.links.map((l) => (
            <a key={l.label} href={l.href} target="_blank" rel="noreferrer" tabIndex={open ? 0 : -1}>
              {l.label}
            </a>
          ))}
        </p>
      </div>
    </div>
    </>
  );
}
