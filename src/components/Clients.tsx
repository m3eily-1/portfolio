"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useGsap } from "@/components/career/useGsap";

// Client logos from page 8 of the PDF ("over 40 successful projects … local and global clients").
const CLIENTS = [
  ["webook", "webook"], ["hub", "HUB"], ["ejar", "Ejar"], ["orange", "Orange"], ["budget", "Budget"], ["check", "Check"],
  ["otida", "Otida"], ["adam-ai", "adam.ai"], ["afwme", "Africa Fashion Week Middle East"], ["ebf", "Egyptian Basketball Federation"],
  ["cerqel", "Cerqel"], ["flash", "Flash"], ["partner", "Partner"], ["bona", "BONA Invest"], ["egyptian-streets", "Egyptian Streets"],
  ["loreal", "L'Oréal"], ["jinni", "Jinni"], ["united-group", "United Group"], ["amkan", "AMKAN"], ["doctube", "DocTube"],
  ["repin", "Rep iN"], ["googar", "Googar"], ["zajel", "Zajel Speed"], ["leaders", "Leaders"], ["client-a", "Client"],
  ["client-b", "Client"], ["client-c", "Client"],
] as const;

export default function Clients() {
  const root = useRef<HTMLElement>(null);
  useGsap(root, () => {
    if (prefersReducedMotion()) return;
    gsap.from(".cl2-head > *", { y: 30, autoAlpha: 0, stagger: 0.1, duration: 1.1, scrollTrigger: { trigger: ".cl2", start: "top 75%" } });
    gsap.from(".cl2-marquee", { autoAlpha: 0, y: 30, duration: 1.2, scrollTrigger: { trigger: ".cl2-marquee", start: "top 90%" } });
  });
  return (
    <section ref={root} className="cl2" id="clients">
      <div className="cl2-head">
        <p className="label">
          <span>+</span> Clients
        </p>
        <h2 className="cl2-title">
          Brands I&rsquo;ve designed <em>for</em>
        </h2>
        <p className="cl2-lede">40+ products for local and global clients, across fintech, government, telecom, health, retail and media.</p>
      </div>
      {/* One infinite line: the list is rendered twice and the track slides by exactly one copy. */}
      <div className="cl2-marquee">
        <div className="cl2-track">
          {[0, 1].map((copy) => (
            <ul key={copy} className="cl2-row" aria-hidden={copy === 1}>
              {CLIENTS.map(([file, name]) => (
                <li key={file} className="cl2-tile">
                  <img src={`/img/clients/${file}.webp`} alt={copy === 1 ? "" : name === "Client" ? "Client logo" : name} loading="eager" />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
