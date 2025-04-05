import { useQuery } from '@tanstack/react-query';
import { fetchListings, ListingsPayload } from '@/lib/api';

export function useListings(filterPayload: ListingsPayload) {
  return useQuery({
    queryKey: ['listings', filterPayload],
    queryFn: () => fetchListings(filterPayload),
  });
}

