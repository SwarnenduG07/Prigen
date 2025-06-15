import Features from "@/components/features";
import LandingHero from "@/components/hero";
import { LandingNavBar } from "@/components/navbar";

export default function Home() {
  return (
    <main>
      <LandingNavBar />
      <LandingHero />

      <Features />
    </main>
  );
}
