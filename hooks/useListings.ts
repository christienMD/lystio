import { useQuery } from "@tanstack/react-query";
import { fetchListings } from "@/lib/api";

export interface ListingsFilter {
  propertyType?: string;
  rentType?: string;
  beds?: string;
  baths?: string;
  livingRooms?: string;
  pets?: string;
  deposit?: string;
  priceMin?: number;
  priceMax?: number;
  page?: number;
  pageSize?: number;
  sort?: string;
}

interface SortObject {
  rent?: "asc" | "desc";
  createdAt?: "asc" | "desc";
  distance?: "asc" | "desc";
  size?: "asc" | "desc";
  countLeads?: "asc" | "desc";
}

export function useListings(filters: ListingsFilter = {}) {
    const sortObject: SortObject = {};
  if (filters.sort) {
    switch (filters.sort) {
      case "price_asc":
        sortObject["rent"] = "asc";
        break;
      case "price_desc":
        sortObject["rent"] = "desc";
        break;
      case "date":
        sortObject["createdAt"] = "desc";
        break;
      // Default (relevance) doesn't need any specific sort
    }
  }

  const filterPayload = {
    filter: {
      rent: [filters.priceMin || 0, filters.priceMax || 999999],
      ...(filters.propertyType && { type: [parseInt(filters.propertyType)] }),
      ...(filters.rentType && { rentType: [filters.rentType] }),
      ...(filters.beds && { roomsBed: [parseInt(filters.beds)] }),
      ...(filters.baths && { roomsBath: [parseInt(filters.baths)] }),
      ...(filters.pets && { pets: [filters.pets] }),
    },
    sort: sortObject,
    paging: {
      pageSize: filters.pageSize || 4,
      page: filters.page || 1,
    },
  };

  return useQuery({
    queryKey: ["listings", filterPayload],
    queryFn: () => fetchListings(filterPayload),
  });
}
