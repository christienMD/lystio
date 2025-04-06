import { useQuery } from "@tanstack/react-query";
import { fetchListings, ListingsPayload, ApiResponse } from "@/lib/api";

export function useListings(filterPayload: ListingsPayload) {
  return useQuery<ApiResponse, Error>({
    queryKey: ["listings", filterPayload],
    queryFn: () => fetchListings(filterPayload),
  });
}