import type { Metadata } from "next";
import Header from "@/components/Header";
import StoryIntro from "@/components/StoryIntro";
import ChapterPixels from "@/components/ChapterPixels";
import ChapterLogic from "@/components/ChapterLogic";
import ChapterProducts from "@/components/ChapterProducts";
import CareerCounter from "@/components/career/CareerCounter";
import Beyond from "@/components/Beyond";
import Contact from "@/components/Contact";
import PageReady from "@/components/PageReady";
import "@/styles/home.css";
import "@/styles/chapters.css";
import "@/styles/career.css";
import "@/styles/sections2.css";

export const metadata: Metadata = {
  title: "My story — Ahmed Mealy",
  description: "From pixels to products: Photoshop, code, design systems and every role along the way.",
};

export default function StoryPage() {
  return (
    <>
      <Header />
      <main>
        <StoryIntro />
        <ChapterPixels />
        <ChapterLogic />
        <ChapterProducts />
        <CareerCounter />
        <Beyond />
        <Contact />
      </main>
      <PageReady />
    </>
  );
}
