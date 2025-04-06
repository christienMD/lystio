"use client";

import { useState } from "react";
import ListingCard from "@/components/cards/ListingCard";
import ListingHeader from "./ListingHeader";
import GooleMapListing from "./GooleMapListing";
import { useListings, ListingsFilter } from "@/hooks/useListings";
import ListingSkeleton from "../skeletons/ListingSkeleton";

const Listings = () => {
  const [filters, setFilters] = useState<ListingsFilter>({
    priceMin: 0,
    priceMax: 10000,
    page: 1,
    pageSize: 4,
  });

  const { data, isLoading, error } = useListings(filters);
  const listings = data?.res || [];

  const [viewType, setViewType] = useState<"grid" | "list" | "compact">("grid");
  const [sortBy, setSortBy] = useState("relevance");

  const handleFilterChange = (newFilters: Partial<ListingsFilter>) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
    }));
  };

  const handleViewChange = (view: "grid" | "list" | "compact") => {
    setViewType(view);
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
  };

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({
      ...prev,
      page,
    }));
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


  if (error) {
    return (
      <div className="container mx-auto py-4 px-3 sm:py-6 sm:px-4">
        Error loading listings
      </div>
    );
  }

  return (
    <div className="container mx-auto py-4 px-3 sm:py-6 sm:px-4">
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
        <div className="order-2 lg:order-1 lg:w-1/2 bg-gray-100 rounded-lg min-h-[300px] sm:min-h-[400px]">
          <GooleMapListing />
        </div>

        <div className="order-1 lg:order-2 lg:w-1/2">
          <ListingHeader
            title="Listing around me"
            count={listings.length || 0}
            currentView={viewType}
            currentSort={sortBy}
            onViewChange={handleViewChange}
            onSortChange={handleSortChange}
          />

          {isLoading ? (
            <ListingSkeleton count={4} viewType={viewType} />
          ) : error ? (
            <div className="p-4 text-center text-red-500">
              Error loading listings
            </div>
          ) : (
            <div className={`grid ${getGridLayout()}`}>
              {listings?.map((listing) => (
                <ListingCard
                  key={listing.id}
                  data={listing}
                  className={viewType === "list" ? "flex-card" : ""}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Listings;
