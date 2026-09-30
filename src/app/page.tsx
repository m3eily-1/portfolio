import Header from "@/components/Header";
import Hero from "@/components/Hero";
import StoryIntro from "@/components/StoryIntro";
import ChapterPixels from "@/components/ChapterPixels";
import ChapterLogic from "@/components/ChapterLogic";
import ChapterProducts from "@/components/ChapterProducts";
import CareerCounter from "@/components/career/CareerCounter";
import FeaturedWorks from "@/components/FeaturedWorks";
import Services from "@/components/Services";
import Clients from "@/components/Clients";
import AiDelight from "@/components/AiDelight";
import HowIWork from "@/components/HowIWork";
import Voices from "@/components/Voices";
import Beyond from "@/components/Beyond";
import Contact from "@/components/Contact";
import PageReady from "@/components/PageReady";
import "@/styles/home.css";
import "@/styles/chapters.css";
import "@/styles/career.css";
import "@/styles/sections2.css";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <StoryIntro />
        <ChapterPixels />
        <ChapterLogic />
        <ChapterProducts />
        <CareerCounter />
        <FeaturedWorks limit={4} />
        <AiDelight />
        <Clients />
        <Services />
        <HowIWork />
        <Voices />
        <Beyond />
        <Contact />
      </main>
      <PageReady />
    </>
  );
}
