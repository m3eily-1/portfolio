import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturedWorks from "@/components/FeaturedWorks";
import Services from "@/components/Services";
import Clients from "@/components/Clients";
import AiSection from "@/components/AiSection";
import Delight from "@/components/Delight";

// Delight section hidden for now (Ahmed, 2026-09-30); flip to true to bring it back.
const SHOW_DELIGHT = false;
import HowIWork from "@/components/HowIWork";
import Voices from "@/components/Voices";
import Contact from "@/components/Contact";
import PageReady from "@/components/PageReady";
import "@/styles/home.css";
import "@/styles/sections2.css";

// The story (title slide, chapters 01–04, off-screen) lives on /story.
export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Clients />
        <FeaturedWorks limit={4} />
        <AiSection />
        {SHOW_DELIGHT && <Delight />}
        <Services />
        <HowIWork />
        <Voices />
        <Contact />
      </main>
      <PageReady />
    </>
  );
}
