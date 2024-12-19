"use client"; // For Next.js client components
import Topbar from "@/components/topbar";
import { Button } from "@/components/ui/button";
import InteractiveHoverButton from "@/components/ui/interactive-hover-button";
import { DownloadIcon, ReceiptEuro, SendIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function Dashboard() {
  return (
    <div className="bg-gray-200 h-screen">
    <div className="w-[590px] h-[400px] bg-gradient-to-br from-[#d82fc4] to-[#abc614] rounded-[100%] absolute z-1 top-[60%] left-[50%] translate-x-[-50%] translate-y-[-50%] blue-[90px] flex items-center text-center justify-center blur-[90px]"></div>
       <div>
         <Topbar />
       </div>
       <div>
          <main className="flex flex-col justify-center items-center text-center mt-12">
            
            <h1 className="text-4xl md:text-5xl font-bold text-purple-600">
              Share & Receve your File with end to end  ecryption
            </h1>
            <p className="text-gray-500 mt-4 text-lg">
              Explore your requirements
            </p>

            <section className="mt-32 w-full max-w-xl rounded-lg bg-white/20 shadow-lg backdrop-blur-md py-16
          relative before:absolute before:inset-0 before:bg-gradient-to-br before:from-purple-500/10 
          before:via-pink-500/10 before:to-blue-500/10 before:-z-10 before:rounded-lg">
              <div className="flex space-x-8  items-center justify-center" >
                  <InteractiveHoverButton  className=" bg-jnd"><InteractiveHoverButton/>
                     <SendIcon />
                     Send File
                  </InteractiveHoverButton >
                  <InteractiveHoverButton className=" bg-transparent" text="Receve File"/>
                  
                </div>
            </section>
          </main>
       </div>
    </div>
  );
}
