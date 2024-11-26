"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Bird, Menu } from "lucide-react";
import { signIn } from "next-auth/react";

export function LandingNavBar(): JSX.Element {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    setIsLoggedIn(Boolean(token));
  }, []);

  const handleSignout = (): void => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/signin");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 border border-neutral-800 rounded-2xl flex items-center justify-between lg:mx-48 md:mx-24 mx-4 mt-4 px-4 py-2 backdrop-blur-sm bg-neutral-800/80">
      <div className="flex items-center text-neutral-100 space-x-2 cursor-pointer">
        <Bird className="text-emerald-400" />
        <span className="font-mono font-bold lg:text-lg md:text-lg text-sm">Prigen</span>
      </div>

      <div className="flex items-center space-x-4">
        <div className="hidden md:flex items-center space-x-4">
          {!isLoggedIn ? (
            <>
              <span className="hover:text-purple-500 cursor-pointer text-gray-300">Feature</span>
              <Button
                className="w-20 h-8 rounded-xl hover:bg-zinc-800 hover:text-white"
                onClick={() => router.push("/signin")}
              >
                Log in
              </Button>
              <Button
                className="rounded-xl w-20 h-8 bg-purple-600 hover:bg-purple-700 hover:shadow-md"
                onClick={() => router.push("/signup")}
              >
                Signup
              </Button>
            </>
          ) : (
            <Button
              className="rounded-full bg-orange-400 hover:bg-red-800 hover:text-white"
              onClick={handleSignout}
              variant="ghost"
            >
              Logout
            </Button>
          )}
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
