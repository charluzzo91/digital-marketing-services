import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Process } from "@/components/Process";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { StickyBar } from "@/components/StickyBar";
import { IntroOverlay } from "@/components/IntroOverlay";

export default function Home() {
  return (
    <>
      <IntroOverlay />
      <Nav />
      <main id="main">
        <Hero />
        <Services />
        <Process />
        <About />
        <Contact />
      </main>
      <Footer />
      <StickyBar />
    </>
  );
}
