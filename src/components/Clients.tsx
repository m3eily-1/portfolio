"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useGsap } from "@/components/career/useGsap";
import PathMarquee from "@/components/PathMarquee";

// The curve the logos travel along (from the Fancy MarqueeAlongSvgPath demo Ahmed picked).
const PATH =
  "M1 209.434C58.5872 255.935 387.926 325.938 482.583 209.434C600.905 63.8051 525.516 -43.2211 427.332 19.9613C329.149 83.1436 352.902 242.723 515.041 267.302C644.752 286.966 943.56 181.94 995 156.5";

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
    gsap.from(".cl2-pm", { autoAlpha: 0, y: 30, duration: 1.2, scrollTrigger: { trigger: ".cl2-pm", start: "top 90%" } });
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
      <PathMarquee path={PATH} viewBox="0 0 996 330" baseVelocity={4} slowdownOnHover draggable dragSensitivity={0.1} responsive className="cl2-pm">
        {CLIENTS.map(([file, name]) => (
          <div key={file} className="cl2-tile">
            <img src={`/img/clients/${file}.webp`} alt={name === "Client" ? "Client logo" : name} loading="eager" draggable={false} />
          </div>
        ))}
      </PathMarquee>
    </section>
  );
}
