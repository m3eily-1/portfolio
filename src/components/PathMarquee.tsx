"use client";

import { Children, useEffect, useMemo, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

/*
  Items travelling along an SVG path (after Fancy's MarqueeAlongSvgPath), without motion/Tailwind:
  each item rides `offset-path`, the loop advances `offset-distance` on the GSAP ticker, items slow
  down on hover, can be dragged with momentum, and a rolling z-index stacks them along the path.
*/

type Props = {
  children: React.ReactNode;
  path: string;
  viewBox: string;
  /** Percent of the path travelled per second. */
  baseVelocity?: number;
  slowdownOnHover?: boolean;
  slowDownFactor?: number;
  draggable?: boolean;
  dragSensitivity?: number;
  dragVelocityDecay?: number;
  repeat?: number;
  /** Scale the whole path to the container width. */
  responsive?: boolean;
  className?: string;
};

const wrap = (v: number) => ((v % 100) + 100) % 100;

export default function PathMarquee({
  children,
  path,
  viewBox,
  baseVelocity = 5,
  slowdownOnHover = false,
  slowDownFactor = 0.3,
  draggable = false,
  dragSensitivity = 0.2,
  dragVelocityDecay = 0.96,
  repeat = 1,
  responsive = false,
  className,
}: Props) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const [, , vbW, vbH] = viewBox.split(" ").map(Number);

  const items = useMemo(() => {
    const list = Children.toArray(children);
    return Array.from({ length: repeat }, (_, r) => list.map((child, i) => ({ child, key: `${r}-${i}`, clone: r > 0 }))).flat();
  }, [children, repeat]);

  // Scale the fixed-size path box to the container.
  useEffect(() => {
    if (!responsive) return;
    const o = outer.current;
    const box = inner.current;
    if (!o || !box) return;
    const fit = () => {
      const scale = Math.min(o.clientWidth / vbW, o.clientHeight / vbH);
      box.style.transform = `translate(${(o.clientWidth - vbW * scale) / 2}px, ${(o.clientHeight - vbH * scale) / 2}px) scale(${scale})`;
      // Keep tiles readable on small screens: never smaller than ~46px on screen.
      box.style.setProperty("--pm-tile", `${Math.max(56, 46 / scale)}px`);
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(o);
    return () => ro.disconnect();
  }, [responsive, vbW, vbH]);

  // The loop.
  useEffect(() => {
    const box = inner.current;
    const o = outer.current;
    if (!box || !o) return;
    const els = [...box.querySelectorAll<HTMLElement>(".pm-item")];
    const n = els.length;
    let offset = 0;
    let hover = 1; // eased hover factor
    let hovered = false;
    let dragging = false;
    let dragV = 0;
    let lastX = 0;
    const still = prefersReducedMotion();

    const render = () => {
      els.forEach((el, i) => {
        const d = wrap(offset + (i * 100) / n);
        el.style.offsetDistance = `${d}%`;
        el.style.zIndex = String(1 + Math.floor((d / 100) * 10));
      });
    };
    const tick = (_t: number, deltaMs: number) => {
      const dt = Math.min(deltaMs, 50) / 1000;
      if (dragging) {
        offset += dragV;
        dragV *= 0.9;
      } else {
        hover += ((hovered && slowdownOnHover ? slowDownFactor : 1) - hover) * Math.min(1, dt * 8);
        offset += (still ? 0 : baseVelocity * dt * hover) + dragV;
        dragV = Math.abs(dragV) > 0.01 ? dragV * dragVelocityDecay : 0;
      }
      render();
    };
    render();
    gsap.ticker.add(tick);

    const enter = () => (hovered = true);
    const leave = () => (hovered = false);
    const down = (e: PointerEvent) => {
      if (!draggable) return;
      dragging = true;
      dragV = 0;
      lastX = e.clientX;
      try {
        o.setPointerCapture(e.pointerId);
      } catch {}
      o.classList.add("is-grabbing");
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      dragV = (e.clientX - lastX) * dragSensitivity;
      lastX = e.clientX;
    };
    const up = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      if (o.hasPointerCapture(e.pointerId)) o.releasePointerCapture(e.pointerId);
      o.classList.remove("is-grabbing");
    };
    els.forEach((el) => {
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
    });
    o.addEventListener("pointerdown", down);
    o.addEventListener("pointermove", move);
    o.addEventListener("pointerup", up);
    o.addEventListener("pointercancel", up);
    return () => {
      gsap.ticker.remove(tick);
      els.forEach((el) => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      });
      o.removeEventListener("pointerdown", down);
      o.removeEventListener("pointermove", move);
      o.removeEventListener("pointerup", up);
      o.removeEventListener("pointercancel", up);
    };
  }, [items, baseVelocity, slowdownOnHover, slowDownFactor, draggable, dragSensitivity, dragVelocityDecay]);

  return (
    <div ref={outer} className={`pm${draggable ? " is-draggable" : ""}${className ? ` ${className}` : ""}`} data-cursor={draggable ? "Drag" : undefined}>
      <div ref={inner} className="pm-box" style={{ width: vbW, height: vbH }}>
        {items.map(({ child, key, clone }) => (
          <div key={key} className="pm-item" style={{ offsetPath: `path('${path}')` }} aria-hidden={clone || undefined}>
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}
