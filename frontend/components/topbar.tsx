"use client"
import { Avatar } from '@radix-ui/react-avatar';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@radix-ui/react-dropdown-menu';
import { Star, GithubIcon, User, Dot, LogOut } from 'lucide-react';
import React from 'react';
import ThemeToggle from './dark';

const Topbar = () => {
  return (
    <div>
      {/* Navigation */}
      <header className="flex justify-between items-start p-6">
        <div className="flex items-center bg-white/95 dark:bg-gray-800 px-6 py-1.5 rounded-xl w-44 cursor-pointer shadow-md">
          <div className="flex items-center gap-1">
            <Star
              className="border-neutral-300 fill-yellow-500/90 text-yellow-500"
              size={13}
            />
            <span className="font-semibold text-sm dark:text-white">Prigen</span>
          </div>
          <div className="ml-auto flex items-center font-bold text-lg text-purple-600 dark:text-purple-400">
            <ThemeToggle />
          </div>
        </div>

        <div className="flex gap-8">
          <a href="#" className="text-gray-500 dark:text-gray-300 font-medium"></a>
          <div className="bg-white dark:bg-gray-700 border-r border-gray-400 dark:border-gray-600 flex items-center justify-between gap-5 rounded-lg px-5 py-2 text-gray-700 dark:text-gray-300 shadow hover:shadow-md">
            <a
              href="https://github.com/swarnenduG07/Prigen"
              className="border-r border-emerald-300 dark:border-emerald-500"
            >
              <GithubIcon className="fill-fuchsia-200 mr-3" size={20} />
            </a>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className="h-7 w-7 bg-neutral-700 dark:bg-neutral-500 hover:bg-zinc-800 cursor-pointer">
                  <User className="h-5 w-5 text-red-500" />
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md shadow-md">
                <DropdownMenuItem>
                  <a href="#" className="flex items-center gap-2">
                    <Dot className="h-4 w-4" />
                    <span>Profile</span>
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <a href="#" className="flex items-center gap-2">
                    <Dot className="h-4 w-4" />
                    <span className="flex gap-1 items-center">
                      <LogOut /> Logout
                    </span>
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Topbar;
