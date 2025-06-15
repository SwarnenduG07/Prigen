"use client";
import FileHistory from "@/components/filehistory";
import Topbar from "@/components/topbar";
import InteractiveHoverButton from "@/components/ui/interactive-hover-button";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

export default function Dashboard() {
  return (
    <div className="min-h-screen relative">
      <div
        className="fixed w-[600px] h-[600px] bg-gradient-to-br from-fuchsia-600/30 to-purple-600/30 rounded-full 
        blur-[100px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10"
      />

      <div>
        <Topbar />
      </div>

      <main className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center justify-center mt-16 space-y-6">
          <motion.h1
            className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-fuchsia-300 to-purple-600 
              bg-clip-text text-transparent text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Share & Receive Files Securely
          </motion.h1>

          <motion.p
            className="text-xl text-gray-400 max-w-2xl text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            End-to-end encrypted file sharing with blazing fast speeds
          </motion.p>

          <motion.section
            className="w-full max-w-xl mt-16 p-8 rounded-2xl backdrop-blur-md
              bg-white/5 border border-purple-500/20 shadow-xl
              relative before:absolute before:inset-0 before:bg-gradient-to-br 
              before:from-purple-500/10 before:via-fuchsia-500/10 before:to-blue-500/10 
              before:-z-10 before:rounded-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
              <Link href="/upload">
                <InteractiveHoverButton
                  className="px-5 md:w-auto bg-gradient-to-r from-purple-500 to-fuchsia-500 
                    hover:opacity-90 transition-all duration-200"
                  text="Send File"
                />
              </Link>

              <Link href="/recever">
                <InteractiveHoverButton
                  className="px-6 md:w-auto bg-gradient-to-r from-fuchsia-500 to-purple-500
                    hover:opacity-90 transition-all duration-200"
                  text="Receive File"
                />
              </Link>
            </div>
          </motion.section>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-16"
        >
          <FileHistory />
        </motion.div>
      </main>
    </div>
  );
}
