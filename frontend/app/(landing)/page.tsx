import LandingHero from "@/components/hero";
import  { LandingNavBar } from "@/components/navbar";

export default function Home() {
  return (
     <main>
           <LandingNavBar/>
           <LandingHero />
     </main>
  );
}
