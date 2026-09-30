import type { Metadata } from "next";
import Header from "@/components/Header";
import FeaturedWorks from "@/components/FeaturedWorks";
import PageReady from "@/components/PageReady";
import "@/styles/home.css";
import "@/styles/sections2.css";

export const metadata: Metadata = {
  title: "All works — Ahmed Mealy",
  description: "Every case study: design systems, government platforms, fintech, telecom and health products.",
};

export default function WorkPage() {
  return (
    <>
      <Header />
      <main className="fwp">
        <FeaturedWorks all />
      </main>
      <PageReady />
    </>
  );
}
