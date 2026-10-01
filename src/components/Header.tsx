"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { person } from "@/data/site";
import { getLenis, lockScroll } from "@/lib/scroll";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { navigate } from "@/components/Transition";
import Arrow from "@/components/Arrow";

// Header is logo + Menu on every screen size; the links live in the overlay.
const MENU: { id: string; label: string; route?: string }[] = [
  { id: "story", label: "Story" },
  { id: "work", label: "Work" },
  // { id: "delight", label: "Delight" }, // section hidden for now
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
  const opened = useRef(false);

  // Menu: lock the page, reveal the panel top-down, stagger the links in.
  useEffect(() => {
    const el = menu.current;
    if (!el) return;
    // Only touch the scroll lock once the menu has been used, so mounting never undoes the preloader's lock.
    if (open) opened.current = true;
    if (opened.current) lockScroll(open);
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

  // Close on route change or Escape.
  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    const on = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", on);
    return () => window.removeEventListener("keydown", on);
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

  const go = (id: string, route?: string) => {
    // A page of its own: travel there, or back to its top if already on it.
    if (route) return path === route ? getLenis()?.scrollTo(0, { duration: 1.6 }) : navigate(router, route);
    // A section on this page scrolls in place; otherwise go home and land on it.
    if (document.getElementById(id)) return getLenis()?.scrollTo(`#${id}`, { duration: 1.8 });
    navigate(router, `/#${id}`);
  };
  const goFromMenu = (id: string, route?: string) => {
    setOpen(false);
    // Wait for the scroll lock to lift before travelling.
    setTimeout(() => go(id, route), 450);
  };

  return (
    <>
    <header ref={root} className="hdr">
      <button className="hdr-name" onClick={() => (path === "/" ? getLenis()?.scrollTo(0, { duration: 1.6 }) : navigate(router, "/"))}>
        <img className="logo" src="/logo/logo-am.svg?v=3" alt={person.name} />
      </button>
      <div className="hdr-right">
      <a className="btn btn--line hdr-cta" href={`mailto:${person.email}`}>
        <span className="btn-ico">
          <Arrow />
        </span>
        Let&rsquo;s talk
      </a>
      <button className="hdr-menu" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-controls="site-menu">
        <span>{open ? "Close" : "Menu"}</span>
        <i aria-hidden className={open ? "is-x" : ""}>
          <b />
          <b />
        </i>
      </button>
      </div>
    </header>

    <div ref={menu} id="site-menu" className="mm" aria-hidden={!open}>
      <nav className="mm-nav">
        {MENU.map((l, i) => (
          <button key={l.id} className="mm-link" onClick={() => goFromMenu(l.id, l.route)} tabIndex={open ? 0 : -1}>
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
