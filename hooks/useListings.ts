import { useQuery } from "@tanstack/react-query";
import { ApiResponse, fetchListings, ListingsPayload } from "@/lib/api";
import { Listing } from "@/entities/Listing";


export function useListings(filterPayload: ListingsPayload) {
  return useQuery<ApiResponse>({
    queryKey: ["listings", filterPayload],
    queryFn: () => fetchListings(filterPayload),
  });
}
