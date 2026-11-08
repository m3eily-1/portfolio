import type { Metadata, Viewport } from "next";
import { Geist_Mono, Pixelify_Sans, Mrs_Saint_Delafield } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Transition from "@/components/Transition";
import Preloader from "@/components/Preloader";
import "@/styles/base.css";

// Type follows the reference hero: Times New Roman for everything, Geist Mono for labels.
const mono = Geist_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--f-mono", display: "swap" });
const pixel = Pixelify_Sans({ subsets: ["latin"], variable: "--f-pixel", display: "swap" });
const script = Mrs_Saint_Delafield({ subsets: ["latin"], weight: "400", variable: "--f-script", display: "swap" });

const SITE = "https://m3eily-1.github.io/portfolio/";
const TITLE = "Ahmed Mealy — From pixels to products";
const DESCRIPTION =
  "Senior product designer and builder at webook, Riyadh, designing delightful, AI-powered products. The story of a designer who went from graphic design to code to product design, and 40+ products along the way.";
// Share image (LinkedIn, X, WhatsApp…): built by scripts/make-og.py. Absolute URL so the /portfolio base path is kept.
const OG = { url: `${SITE}og.png`, width: 1200, height: 630, alt: "Ahmed Mealy, Senior Product Designer & Builder" };

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { type: "website", url: SITE, siteName: "Ahmed Mealy", title: TITLE, description: DESCRIPTION, images: [OG] },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: [OG.url] },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#000000" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const fonts = [mono, pixel, script].map((f) => f.variable).join(" ");
  return (
    <html lang="en" className={fonts}>
      <body>
        <SmoothScroll />
        <Cursor />
        <Transition />
        <Preloader />
        {children}
      </body>
    </html>
  );
}
