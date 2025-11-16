import { LocationRecord } from "@/components/location-history-table";

// Interface for the full API response
export interface LocationHistoryResponse {
  locations: LocationRecord[];
  totalPages: number;
  currentPage: number;
}

/**
 * Fetches paginated location history from the live API.
 * @param {object} options - Pagination options.
 * @param {number} options.page - The page number to fetch.
 * @param {number} options.limit - The number of records per page.
 * @returns {Promise<LocationHistoryResponse>} The full paginated response from the API.
 */
export const getAllLocationHistory = async ({ page = 1, limit = 10 } = {}): Promise<LocationHistoryResponse> => {
  try {
    const response = await fetch(`/api/location-history?page=${page}&limit=${limit}`);

    if (!response.ok) {
      // Log the error and fall back to a safe, empty state
      console.error(`API Error: ${response.status} ${response.statusText}`);
      return { locations: [], totalPages: 0, currentPage: 1 };
    }

    const data: LocationHistoryResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch location history:", error);
    // Return a safe fallback to prevent UI crashes
    return { locations: [], totalPages: 0, currentPage: 1 };
  }
};
