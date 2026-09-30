"use client";

import { useEffect, useRef } from "react";
import { gsap, isFinePointer } from "@/lib/gsap";

/** Round follower cursor (a literally round object, so it keeps its radius). */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!isFinePointer() || !dot.current) return;
    const el = dot.current;
    document.documentElement.classList.add("has-cursor");
    const xTo = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3" });
    const move = (e: PointerEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      document.documentElement.style.setProperty("--mx", `${e.clientX}px`);
      document.documentElement.style.setProperty("--my", `${e.clientY}px`);
      const t = e.target instanceof Element ? e.target : null;
      el.classList.toggle("is-hover", !!t?.closest("a,button,[data-cursor]"));
      const label = t?.closest<HTMLElement>("[data-cursor]")?.dataset.cursor ?? "";
      el.dataset.label = label;
    };
    window.addEventListener("pointermove", move);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);
  return <div ref={dot} className="cursor" aria-hidden />;
}
