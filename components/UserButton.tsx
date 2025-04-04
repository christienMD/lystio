import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const UserButton = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <Avatar className="h-8 w-8 bg-lystioPurple hover:opacity-90 transition">
          <AvatarFallback className="bg-lystioPurple text-white font-medium text-sm">
            M
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60 p-0" sideOffset={10}>
        <div className="flex flex-col items-center justify-center p-4">
          <Avatar className="h-12 w-12 bg-lystioPurple mb-2">
            <AvatarFallback className="bg-lystioPurple text-white font-medium">
              M
            </AvatarFallback>
          </Avatar>
          <p className="text-sm font-medium">User Name</p>
          <p className="text-xs text-neutral-500">user@example.com</p>
        </div>
        <div className="border-t border-neutral-200">
          <DropdownMenuItem className="py-2 cursor-pointer">
            <span className="text-sm">Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="py-2 cursor-pointer">
            <span className="text-sm">Settings</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="py-2 cursor-pointer text-red-600">
            <span className="text-sm">Log out</span>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;