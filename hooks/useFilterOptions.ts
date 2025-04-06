// src/hooks/useFilterOptions.ts
import { useQuery } from '@tanstack/react-query';

async function fetchFilterOptions() {
  // Replace with your actual API endpoint
  const response = await fetch('/api/filter-options');
  if (!response.ok) {
    throw new Error('Failed to fetch filter options');
  }
  return response.json();
}

export function useFilterOptions() {
  return useQuery({
    queryKey: ['filterOptions'],
    queryFn: fetchFilterOptions,
    staleTime: 1000 * 60 * 10,
  });
}