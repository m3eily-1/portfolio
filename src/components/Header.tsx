"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { person } from "@/data/site";
import { getLenis } from "@/lib/scroll";
import { navigate } from "@/components/Transition";
import Arrow from "@/components/Arrow";

const LINKS = [
  { id: "story", label: "Story" },
  { id: "work", label: "Work" },
  { id: "process", label: "Process" },
  { id: "contact", label: "Contact" },
];

export default function Header() {
  const root = useRef<HTMLElement>(null);
  const router = useRouter();
  const path = usePathname();

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

  return (
    <header ref={root} className="hdr">
      <button className="hdr-name" onClick={() => (path === "/" ? getLenis()?.scrollTo(0, { duration: 1.6 }) : navigate(router, "/"))}>
        <img className="logo" src="/logo/logo-am.svg" alt={person.name} />
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
    </header>
  );
}
