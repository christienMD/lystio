"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown, Grid, LayoutGrid, List } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface Props {
  title: string;
  count: number;
  onViewChange?: (view: "grid" | "list" | "compact") => void;
  onSortChange?: (sort: string) => void;
  currentView?: "grid" | "list" | "compact";
  currentSort?: string;
}

const sortOptions = [
  { id: "relevance", label: "Sort by Relevance" },
  { id: "price_asc", label: "Price: Low to High" },
  { id: "price_desc", label: "Price: High to Low" },
  { id: "date", label: "Newest" },
];

const ListingHeader = ({
  title = "Listing around me",
  count = 2091,
  onViewChange,
  onSortChange,
  currentView = "grid",
  currentSort = "relevance",
}: Props) => {
  const [sortOpen, setSortOpen] = useState(false);

  const handleViewClick = (view: "compact" | "list" | "grid") => {
    if (onViewChange) {
      onViewChange(view);
    }
  };

  const handleSortClick = (sort: string) => {
    if (onSortChange) {
      onSortChange(sort);
      setSortOpen(false);
    }
  };

  const currentSortOption = sortOptions.find((option) => option.id === currentSort);

  return (
    <div className="flex flex-col xs:flex-row xs:items-center justify-between w-full mb-4 gap-2 xs:gap-4">
      <div className="flex items-center gap-2">
        <div className="relative w-6 h-6">
          <Image
            src="/images/location.svg"
            fill
            alt="Location"
            sizes="24px"
            className="object-contain"
          />
        </div>
        <div>
          <h2 className="text-xl font-medium">{title}</h2>
          <p className="text-sm text-neutral-500">
            {count.toLocaleString()} properties
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 xs:gap-4 mt-2 xs:mt-0">
        {/* View type tabs */}
        <div className="flex border rounded-md overflow-hidden">
          <button
            onClick={() => handleViewClick("compact")}
            className={`p-1.5 xs:p-2 ${
              currentView === "compact" ? "bg-gray-100" : "bg-white"
            }`}
            aria-label="Compact view"
          >
            <Grid size={16} className="text-gray-700" />
          </button>
          <button
            onClick={() => handleViewClick("list")}
            className={`p-1.5 xs:p-2 ${
              currentView === "list" ? "bg-gray-100" : "bg-white"
            }`}
            aria-label="List view"
          >
            <List size={16} className="text-gray-700" />
          </button>
          <button
            onClick={() => handleViewClick("grid")}
            className={`p-1.5 xs:p-2 ${
              currentView === "grid" ? "bg-gray-100" : "bg-white"
            }`}
            aria-label="Grid view"
          >
            <LayoutGrid size={16} className="text-gray-700" />
          </button>
        </div>

        {/* Sort dropdown */}
        <DropdownMenu open={sortOpen} onOpenChange={setSortOpen}>
          <DropdownMenuTrigger className="flex items-center gap-1 text-xs xs:text-sm whitespace-nowrap focus:outline-none">
            <span>{currentSortOption?.label || "Sort"}</span>
            <ArrowUpDown size={14} className="text-gray-500 ml-1" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            {sortOptions.map((option) => (
              <DropdownMenuItem
                key={option.id}
                onClick={() => handleSortClick(option.id)}
                className={`cursor-pointer ${
                  currentSort === option.id ? "bg-gray-100 font-medium" : ""
                }`}
              >
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default ListingHeader;
