import React from 'react';
import Image from 'next/image';

const SearchInput = () => {
  return (
    <div className="relative w-full max-w-md">
      <div className="relative flex items-center">
        <input
          type="text"
          placeholder="Search"
          className="w-full h-10 pl-4 pr-32 text-gray-700 bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-lystioPurple/30 focus:border-lystioPurple"
        />
        
        <div className="absolute right-16 flex items-center gap-1.5">
          <div className="flex items-center">
            <Image 
              src="/images/star.svg" 
              width={14} 
              height={14} 
              alt="AI" 
              className="mr-1.5"
            />
            <span className="text-sm font-medium">AI Search</span>
            <svg 
              className="ml-1" 
              width="12" 
              height="12" 
              viewBox="0 0 12 12" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M3 5L6 8L9 5" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        
        <div className="absolute right-0 top-0 h-10 flex items-center pr-1">
          <button
            className="h-8 w-8 bg-lystioPurple rounded-full flex items-center justify-center hover:bg-lystioPurple/90 transition-colors"
            aria-label="Search"
          >
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 20 20" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M17.5 17.5L14.5833 14.5833M16.6667 9.16667C16.6667 13.3088 13.3088 16.6667 9.16667 16.6667C5.02453 16.6667 1.66667 13.3088 1.66667 9.16667C1.66667 5.02453 5.02453 1.66667 9.16667 1.66667C13.3088 1.66667 16.6667 5.02453 16.6667 9.16667Z" 
                stroke="white" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchInput;