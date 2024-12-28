"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Bird, Menu } from "lucide-react";
import { signIn } from "next-auth/react";

export function LandingNavBar(): JSX.Element {
  const router = useRouter();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 border border-neutral-800 rounded-2xl flex items-center justify-between lg:mx-48 md:mx-24 mx-4 mt-4 px-6 py-3 backdrop-blur-sm bg-neutral-900/80 z-50">
      <div className="flex items-center text-neutral-100 space-x-3 cursor-pointer">
        <Bird className="text-purple-500 w-8 h-8" />
        <span className="font-mono font-bold lg:text-xl md:text-lg text-md">Prigen</span>
      </div>

      <div className="flex items-center space-x-6">
        <div className="hidden md:flex items-center space-x-6">
          <a href="#features" className="text-neutral-300 hover:text-white transition-colors">
            Features
          </a>
          <a href="#pricing" className="text-neutral-300 hover:text-white transition-colors">
            Pricing
          </a>
          <Button
            className="px-6 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white transition-all duration-200"
            onClick={() => router.push("/signin")}
          >
            Log in
          </Button>
          <Button
            className="px-6 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white hover:opacity-90 transition-all duration-200"
            onClick={() => router.push("/signup")}
          >
            Sign up
          </Button>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-white hover:text-gray-300 focus:outline-none"
        >
          <Menu size={24} />
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="absolute top-16 right-4 bg-gray-800 w-48 py-2 rounded-lg shadow-lg md:hidden">
          <a href="#features" className="block px-4 py-2 text-white hover:bg-gray-700">
            Features
          </a>
          <div className="px-4 py-2 space-y-2">
            <Button
              className="w-full h-7 text-sm font-semibold delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-purple-500 transition duration-200 ease-in-out"
              variant="outline"
              onClick={() => signIn()}
            >
              Login
            </Button>
            <Button
              className="w-full h-7 delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-purple-500 transition duration-200 ease-in-out"
              onClick={() => router.push("/signup")}
            >
              Signup
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
