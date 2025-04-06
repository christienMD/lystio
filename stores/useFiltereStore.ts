import { create } from 'zustand';
import { ListingsPayload, DEFAULT_FILTER_PAYLOAD } from '@/lib/api';

interface FilterState {
  filters: ListingsPayload;
  
  // Actions
  setPropertyType: (type: number | null) => void;
  setRentType: (rentType: string | null) => void;
  setRoomsBed: (roomsBed: number | null) => void;
  setPets: (pets: string | null) => void;
  setPriceRange: (min: number, max: number) => void;
  setSort: (sort: "asc" | "desc" | null, field: "rent" | "createdAt" | "distance" | "size" | "countLeads") => void;
  setPage: (page: number) => void;
  resetFilters: () => void;
}

// Create store
const useFilterStore = create<FilterState>((set) => ({
  filters: {...DEFAULT_FILTER_PAYLOAD, paging: {pageSize: 4, page: 1}},
  
  setPropertyType: (type) => set((state) => ({
    filters: {
      ...state.filters,
      filter: {
        ...state.filters.filter,
        type: type ? [type] : undefined
      }
    }
  })),
  
  setRentType: (rentType) => set((state) => ({
    filters: {
      ...state.filters,
      filter: {
        ...state.filters.filter,
        rentType: rentType ? [rentType] : undefined
      }
    }
  })),
  
  setRoomsBed: (roomsBed) => set((state) => ({
    filters: {
      ...state.filters,
      filter: {
        ...state.filters.filter,
        roomsBed: roomsBed ? [roomsBed] : undefined
      }
    }
  })),
  
  setPets: (pets) => set((state) => ({
    filters: {
      ...state.filters,
      filter: {
        ...state.filters.filter,
        pets: pets ? [pets] : undefined
      }
    }
  })),
  
  setPriceRange: (min, max) => set((state) => ({
    filters: {
      ...state.filters,
      filter: {
        ...state.filters.filter,
        rent: [min, max]
      }
    }
  })),
  
  setSort: (sort, field) => set((state) => ({
    filters: {
      ...state.filters,
      sort: sort ? { [field]: sort } : {}
    }
  })),
  
  setPage: (page) => set((state) => ({
    filters: {
      ...state.filters,
      paging: {
        ...state.filters.paging,
        page
      }
    }
  })),
  
  resetFilters: () => set({
    filters: {...DEFAULT_FILTER_PAYLOAD, paging: {pageSize: 4, page: 1}}
  }),
}));

export default useFilterStore;