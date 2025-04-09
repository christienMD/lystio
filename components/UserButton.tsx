import Image from "next/image";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";

const UserButton = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none flex items-center">
        <div className="relative h-8 w-8 rounded-full overflow-hidden">
          <Image
            src="/images/user.png"
            alt="User profile"
            fill
            className="object-cover"
          />
        </div>
        <svg
          className="ml-1"
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 5L6 9L10 5"
            stroke="#6B7280"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60 p-0" sideOffset={10}>
        <div className="flex flex-col items-center justify-center p-2">
          <div className="relative h-10 w-10 rounded-full overflow-hidden mb-2">
            <Image
              src="/images/user.png"
              alt="User profile"
              fill
              className="object-cover"
            />
          </div>
          <p className="text-sm font-medium">User Name</p>
          <p className="text-xs text-neutral-500">user@example.com</p>
        </div>
        <div className="px-4">
          <Separator />
        </div>
        <div>
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
