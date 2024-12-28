import Features from "@/components/features";
import LandingHero from "@/components/hero";
import  { LandingNavBar } from "@/components/navbar";
import { Bird } from "lucide-react";

export default function Home() {
  return (
     <main>
           <LandingNavBar/>
           <LandingHero />
           <div className="flex justify-center mt-12">
             <Bird className="text-purple-500 w-36 h-36" />
           </div>
           <Features />
     </main>
  );
}
