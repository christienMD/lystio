import { useQuery } from "@tanstack/react-query";
import { fetchMapListings, ListingsPayload } from "@/lib/api";

export function useMapListings(filterPayload: ListingsPayload) {
  return useQuery({
    queryKey: ["mapListings", filterPayload],
    queryFn: () => fetchMapListings(filterPayload),
  });
}