import { Listing } from "@/entities/Listing";

export interface ApiResponse {
  res: Listing[];
  paging: {
    pageCount: number;
    page: number;
    pageSize: number;
    totalCount: number;
  };
}

export const API_ENDPOINTS = {
  TENEMENT_SEARCH: "/tenement/search",
  TENEMENT_SEARCH_MAP: "/tenement/search/map",
};

export const DEFAULT_FILTER_PAYLOAD = {
  filter: {
    rent: [0, 9999999],
  },
  sort: {},
  paging: {
    pageSize: 10,
    page: 1,
  },
};

// Interface for listings payload
export interface ListingsPayload {
  filter: {
    ids?: number[];
    size?: number[];
    rent?: number[];
    rentUtilities?: number[];
    rooms?: number[];
    roomsBed?: number[];
    roomsBath?: number[];
    type?: number[];
    subType?: number[];
    condition?: number[];
    accessibility?: number[];
    rentType?: string[];
    floorType?: number[];
    heatingType?: number[];
    pets?: string[];
    readiness?: number[];
    tier?: number[];
    furnish?: number[];
    status?: string;
    search?: string;
    rentDurationMax?: number;
    hasRequests?: boolean;
    hasRequestsUserId?: string;
    tags?: string[];
    availableNow?: boolean;
    withinId?: string[];
    within?: Record<string, unknown>;
    bbox?:
      | number[]
      | { north: number; east: number; south: number; west: number };
    near?: { lat: number; lng: number; radius?: number };
    amenities?: string[] | number[];
    moveIn?: string;
    maxAge?: number;
    efficiencyIncludeNull?: boolean;
    minGarages?: boolean;
    efficiency?: number;
    listId?: number;
    searchAgentId?: number;
    withLeads?: boolean;
    listingDuration?: number;
    parking?: number[];
    cellar?: number[];
    style?: string;
  };
  sort?: {
    rent?: "asc" | "desc";
    distance?: "asc" | "desc";
    size?: "asc" | "desc";
    createdAt?: "asc" | "desc";
    countLeads?: "asc" | "desc";
  };
  paging?: {
    pageSize?: number;
    page?: number;
  };
}

// fetsh listings
export async function fetchListings(
  filterPayload: ListingsPayload = DEFAULT_FILTER_PAYLOAD
): Promise<ApiResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const response = await fetch(`${baseUrl}${API_ENDPOINTS.TENEMENT_SEARCH}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(filterPayload),
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
}

export async function fetchMapListings(
  filterPayload: ListingsPayload = DEFAULT_FILTER_PAYLOAD
) {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const response = await fetch(
    `${baseUrl}${API_ENDPOINTS.TENEMENT_SEARCH_MAP}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(filterPayload),
    }
  );

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
}
