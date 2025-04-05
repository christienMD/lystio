"use client";

import { useState } from "react";
import ListingCard from "@/components/cards/ListingCard";
import ListingHeader from "./ListingHeader";
// import { listings as mockListings } from "@/utils/data";
import GooleMapListing from "./GooleMapListing";
import { DEFAULT_FILTER_PAYLOAD } from "@/lib/api";
import { useListings } from "@/hooks/useListings";

const Listings = () => {
  const { data, isLoading, error } = useListings(DEFAULT_FILTER_PAYLOAD);
  const listings = data?.res || [];
  console.log('listings: ', listings);

  const [viewType, setViewType] = useState<"grid" | "list" | "compact">("grid");
  const [sortBy, setSortBy] = useState("relevance");

  const handleViewChange = (view: "grid" | "list" | "compact") => {
    setViewType(view);
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
  };

  const getGridLayout = () => {
    switch (viewType) {
      case "grid":
        return "grid-cols-1 xs:grid-cols-1 md:grid-cols-2 gap-4 xs:gap-6";
      case "list":
        return "grid-cols-1 gap-4";
      case "compact":
        return "grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 2xl:grid-cols-3 gap-3";
      default:
        return "grid-cols-1 md:grid-cols-2 gap-6";
    }
  };
  
  
  if (isLoading) {
    return <div className="container mx-auto py-4 px-3 sm:py-6 sm:px-4">Loading...</div>;
  }

  if (error) {
    return <div className="container mx-auto py-4 px-3 sm:py-6 sm:px-4">Error loading listings</div>;
  }

  return (
    <div className="container mx-auto py-4 px-3 sm:py-6 sm:px-4">
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
        {/* Left side - map */}
        <div className="order-2 lg:order-1 lg:w-1/2 bg-gray-100 rounded-lg min-h-[300px] sm:min-h-[400px]">
          <GooleMapListing />
        </div>

        {/* Right side - listings */}
        <div className="order-1 lg:order-2 lg:w-1/2">
          <ListingHeader
            title="Listing around me"
            count={listings?.length || 0}
            currentView={viewType}
            currentSort={sortBy}
            onViewChange={handleViewChange}
            onSortChange={handleSortChange}
          />

          <div className={`grid ${getGridLayout()}`}>
            {listings?.map((listing) => (
              <ListingCard
                key={listing.id}
                data={listing}
                className={viewType === "list" ? "flex-card" : ""}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Listings;