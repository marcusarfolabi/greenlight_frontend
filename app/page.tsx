import { StickyActionFooter } from "./components/landingPage/StickyActionFooter";
import { Hero } from "./components/landingPage/Hero";
import { Features } from "./components/landingPage/Features";
import { Audience } from "./components/landingPage/Audience";
import { FAQ } from "./components/landingPage/FAQ";

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <Features />
      <Audience /> 
      <FAQ  />
      
      <StickyActionFooter />
    </main>
  );
}