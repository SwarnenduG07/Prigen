"use client"; 
import Topbar from "@/components/topbar";
import InteractiveHoverButton from "@/components/ui/interactive-hover-button";
import Link from "next/link";
import React from "react";

export default function Dashboard() {
  return (
    <div className="bg-gray-200 dark:bg-gray-900 h-screen text-gray-800 dark:text-gray-200">
      <div className="w-[590px] h-[400px] bg-gradient-to-br from-[#d82fc4] to-[#abc614] rounded-[100%] absolute z-1 top-[60%] left-[50%] translate-x-[-50%] translate-y-[-50%] blur-[90px] flex items-center text-center justify-center "></div>
      <div>
        <Topbar />
      </div>
      <div>
        <main className="flex flex-col justify-center items-center text-center mt-12">
          <h1 className="text-4xl md:text-5xl font-bold text-purple-600 dark:text-purple-400">
            Share & Receive your File with End-to-End Encryption
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-7 text-xl">
            Share your file with speed and security
          </p>

          <section
            className="mt-32 w-full max-w-xl bg-white/20 dark:bg-gray-600/10 shadow-lg backdrop-blur-md py-16
          relative before:absolute before:inset-0 before:bg-gradient-to-br before:from-purple-500/10 
          before:via-pink-500/10 before:to-blue-500/10 before:-z-10 before:rounded-lg rounded-xl"
          >
            <div className="flex space-x-8 items-center justify-center">
              <Link href={"upload"}>
                <InteractiveHoverButton
                  className="bg-transparent hover:bg-purple-400 dark:hover:bg-purple-400 border-purple-500 dark:border-emerald-300"
                  text="Send File"
                />
              </Link>
              <Link href={"recever"}>
                <InteractiveHoverButton
                  className="bg-transparent hover:bg-purple-400 dark:hover:bg-purple-500
                  500 border-purple-500 dark:border-emerald-300"
                  text="Receive File"
                />
              </Link>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
