import React from 'react';
import { Search } from 'lucide-react';

const SearchInput = () => {
  return (
    <div className="relative w-full">
      <div className="relative flex items-center">
        <input
          type="text"
          placeholder="Search"
          className="w-full h-10 pl-4 pr-16 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-lystioPurple/30 focus:border-lystioPurple"
        />
        
        <div className="absolute right-12 hidden md:flex items-center">
          <button className="flex items-center gap-1 text-xs text-gray-700">
            <span>AI Search</span>
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L5 5L9 1" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        
        {/* Search button */}
        <button
          className="absolute right-1 p-2 bg-lystioPurple rounded-md hover:bg-lystioPurple/90 transition"
          aria-label="Search"
        >
          <Search size={16} className="text-white" />
        </button>
      </div>
    </div>
  );
};

export default SearchInput;