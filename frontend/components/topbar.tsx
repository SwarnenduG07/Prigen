import { Avatar } from '@radix-ui/react-avatar'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@radix-ui/react-dropdown-menu'
import { Star, GithubIcon, User, Dot, LogOut } from 'lucide-react'
import React from 'react'

const Topbar = () => {
  return (
    <div>
           {/* Navigation */}
      <header className="flex justify-between items-start p-6">
        <div className="flex items-center bg-white/95 px-6 py-1.5 rounded-xl w-44 cursor-pointer">
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
    </div>
  )
}

export default Topbar
