"use client"; // For Next.js client components
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Dot, GitCommit, GitCompare, GitFork, Github, GithubIcon, LogOut, Star, User } from "lucide-react";
import React from "react";

export default function Dashboard() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-purple-100 via-pink-200 to-indigo-100 flex flex-col">
      <div
        className="absolute backdrop-blur-lg"
        style={{
          zIndex: -1,
        }}
      ></div>

      {/* Centered Radial Glow */}
      <div className="absolute inset-0 flex justify-center items-center -z-10">
        <div
          className="h-[500px] w-[500px] bg-pink-400 opacity-20 blur-3xl rounded-full"
          style={{
            filter: "blur(120px)",
          }}
        ></div>
      </div>

      {/* Navigation */}
      <header className="flex justify-between items-start p-6">
        <div className="flex items-center bg-white/95 px-6 py-1.5 rounded-xl w-44">
          <div className="flex items-center gap-1">
            <Star className="border-neutral-300 fill-yellow-500/90 text-yellow-500" size={13} />
            <span className="font-semibold text-sm">Prigen</span>
          </div>
          <div className="ml-auto flex text-center font-bold text-lg text-purple-600">
            ...
          </div>
        </div>
        
        <div className="flex gap-8 ">
          <a href="#" className="text-gray-500 font-medium"></a>
          <div className="bg-white flex justify-between  gap-5 rounded-lg px-5 py-1.5 text-gray-700 shadow hover:shadow-md">
            <a href="https://github.com/swarnenduG07/Prigen"> < GithubIcon className="fill-fuchsia-200" size={28}/> </a>
            <DropdownMenu>
                <DropdownMenuTrigger>
                <Avatar className="h-7 w-7 bg-neutral-700 hover:bg-zinc-800 cursor-pointer">
                <User className="h-8 w-8 text-red-500" />
                </Avatar>
                <DropdownMenuContent>
                    <DropdownMenuItem>
                    <a href="#" className="flex items-center gap-2"/>
                        <Dot className="h-4 w-4" />
                        <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={"#"}>
                    <a href="#" className="flex items-center gap-2"/>
                        <Dot className="h-4 w-4" />
                        <span className="flex gap-1 items-center"> <LogOut /> Logout</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenuTrigger>
            </DropdownMenu>  
          </div>
        </div>
      </header>

      <main className="flex flex-col justify-center items-center text-center mt-12">
        
        <h1 className="text-4xl md:text-5xl font-bold text-purple-600">
          Where would you like to do?
        </h1>
        <p className="text-gray-500 mt-4 text-lg">
          Explore your requirements
        </p>

        {/* Booking Form */}
        <section className="mt-10 w-full max-w-4xl rounded-lg bg-white shadow-lg p-8">
          {/* Tabs */}
          <div className="flex space-x-8 border-b pb-2">
            <button className="text-purple-700 font-semibold border-b-2 border-purple-600 pb-1">
              Flights
            </button>
            <button className="text-gray-400 font-medium">Hotels</button>
            <button className="text-gray-400 font-medium">Cars</button>
          </div>

          {/* Booking Inputs */}
          <form className="flex flex-col md:flex-row gap-6 mt-8">
            {/* Leaving From */}
            <div className="flex-1">
              <label className="block text-gray-500 font-semibold mb-2">
                Leaving from
              </label>
              <div className="w-full rounded-lg border border-gray-300 p-4 bg-gray-50">
                <span className="font-bold text-gray-800">Georgia, Tbilisi</span>
              </div>
            </div>

            {/* Destination */}
            <div className="flex-1">
              <label className="block text-gray-500 font-semibold mb-2">
                Destination
              </label>
              <div className="w-full rounded-lg border border-gray-300 p-4 bg-gray-50">
                <span className="font-bold text-purple-600">France, Paris</span>
              </div>
            </div>

            {/* Passengers */}
            <div className="flex-1">
              <label className="block text-gray-500 font-semibold mb-2">
                Passengers
              </label>
              <div className="w-full rounded-lg border border-gray-300 p-4 bg-gray-50">
                <span className="font-bold text-gray-800">
                  2 adults, 3 child, 1 pet
                </span>
              </div>
            </div>
          </form>

          {/* One Way Toggle */}
          <div className="flex justify-end mt-4">
            <label className="inline-flex items-center cursor-pointer">
              <span className="text-gray-500 mr-2">One way</span>
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:bg-purple-600"></div>
            </label>
          </div>
        </section>
      </main>
    </div>
  );
}
