import React from "react";
import Link from "next/link";

import Logo from "../Logo";
import SearchInput from "../SearchInput";
import UserButton from "../UserButton";

const Navbar = () => {
  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Logo />
          </div>

          <div className="hidden sm:block flex-1 max-w-md mx-6">
            <SearchInput />
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-4">
            <Link
              href="#"
              className="hidden md:block text-sm font-medium text-neutral-800 hover:text-lystioPurple transition-colors"
            >
              Advertise
            </Link>

            <button className="hidden md:flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                  stroke="#1F2937"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 12H22"
                  stroke="#1F2937"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z"
                  stroke="#1F2937"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <UserButton />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
