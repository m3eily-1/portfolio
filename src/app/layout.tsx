import type { Metadata, Viewport } from "next";
import { Geist_Mono, Pixelify_Sans, Mrs_Saint_Delafield } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Transition from "@/components/Transition";
import "@/styles/base.css";

// Type follows the reference hero: Times New Roman for everything, Geist Mono for labels.
const mono = Geist_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--f-mono", display: "swap" });
const pixel = Pixelify_Sans({ subsets: ["latin"], variable: "--f-pixel", display: "swap" });
const script = Mrs_Saint_Delafield({ subsets: ["latin"], weight: "400", variable: "--f-script", display: "swap" });

export const metadata: Metadata = {
  title: "Ahmed Mealy — From pixels to products",
  description:
    "Product Design Lead at webook, Riyadh, designing delightful, AI-powered products. The story of a designer who went from graphic design to code to product design, and 40+ products along the way.",
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#12100e" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const fonts = [mono, pixel, script].map((f) => f.variable).join(" ");
  return (
    <html lang="en" className={fonts}>
      <body>
        <SmoothScroll />
        <Cursor />
        <Transition />
        {children}
      </body>
    </html>
  );
}
