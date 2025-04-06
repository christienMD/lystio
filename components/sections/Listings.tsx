"use client";

import { useEffect, useState } from "react";
import ListingCard from "@/components/cards/ListingCard";
import ListingHeader from "./ListingHeader";
import GooleMapListing from "./GooleMapListing";
import { useListings } from "@/hooks/useListings";
import ListingSkeleton from "../skeletons/ListingSkeleton";
import useFilterStore from "@/stores/useFiltereStore";

const Listings = () => {
  const filters = useFilterStore(state => state.filters);
  const setSort = useFilterStore(state => state.setSort);
  
  const { data, isLoading, error } = useListings(filters);
  const listings = data?.res || [];
  const totalCount = data?.paging?.totalCount || 0;

  const [viewType, setViewType] = useState<"grid" | "list" | "compact">("grid");

  const handleViewChange = (view: "grid" | "list" | "compact") => {
    setViewType(view);
  };

  const getSortOption = (sort: Record<string, "asc" | "desc"> | undefined) => {
    if (!sort) return "relevance";
    const [field, order] = Object.entries(sort)[0];
    if (field === "rent" && order === "asc") return "price_asc";
    if (field === "rent" && order === "desc") return "price_desc";
    if (field === "createdAt" && order === "desc") return "newest";
    return "relevance";
  };

  const handleSortChange = (sort: string) => {
    if (sort === "price_asc") {
      setSort("asc", "rent");
    } else if (sort === "price_desc") {
      setSort("desc", "rent");
    } else if (sort === "newest") {
      setSort("desc", "createdAt");
    } else {
      setSort(null, "rent");
    }
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

  useEffect(() => {
    if (error) {
      console.error("Listings error:", error);
    }
  }, [error]);

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
            count={totalCount || listings.length}
            currentView={viewType}
            currentSort={getSortOption(filters.sort)}
            onViewChange={handleViewChange}
            onSortChange={handleSortChange}
          />

          {isLoading ? (
            <ListingSkeleton count={4} viewType={viewType} />
          ) : error ? (
            <div className="p-4 text-center text-red-500">
              Error loading listings
            </div>
          ) : listings.length === 0 ? (
            <div className="p-8 text-center bg-gray-50 rounded-lg border border-gray-200">
              <div className="text-lg font-medium text-gray-800 mb-2">
                No listings found
              </div>
              <p className="text-gray-600">
                There are no properties matching your current filters. Try
                adjusting your search criteria.
              </p>
            </div>
          ) : (
            <div className={`grid ${getGridLayout()}`}>
              {listings.map((listing) => (
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

export default Listings
