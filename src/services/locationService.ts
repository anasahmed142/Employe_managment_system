import { LocationRecord } from "@/components/location-history-table";

export interface LocationHistoryResponse {
  locations: LocationRecord[];
  totalPages: number;
  currentPage: number;
}

export const getAllLocationHistory = async (
  { page = 1, limit = 10 } = {}
): Promise<LocationHistoryResponse> => {
  // 1. Retrieve the accessToken from localStorage.
  const token = localStorage.getItem('accessToken');

  // 2. If no token is found, stop the request and handle gracefully.
  if (!token) {
    console.warn("Authentication token not found. Redirecting to login.");
    // Redirect to login page as the user is not authenticated.
    window.location.href = '/login?session_expired=true';
    return { locations: [], totalPages: 0, currentPage: 1 };
  }

  // Prepare headers for the fetch request.
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };

  try {
    const response = await fetch(`/api/location-history?page=${page}&limit=${limit}`, {
      headers,
    });

    // 3. After fetch, check for 401 or 403 to handle session expiry.
    if (response.status === 401 || response.status === 403) {
      console.error("Authentication error: Session has expired or is invalid.");
      // Clear the invalid token from storage.
      localStorage.removeItem('accessToken');
      // Redirect to the login page with a clear message.
      window.location.href = '/login?session_expired=true';
      return { locations: [], totalPages: 0, currentPage: 1 };
    }

    // 4. For any other non-200 responses, return a safe fallback.
    if (!response.ok) {
      console.error(`API Error: ${response.status} ${response.statusText}`);
      return { locations: [], totalPages: 0, currentPage: 1 };
    }

    // If the request is successful, parse and return the data.
    const data: LocationHistoryResponse = await response.json();
    return data;

  } catch (error) {
    // Handle network errors or other unexpected issues.
    console.error("Failed to fetch location history:", error);
    return { locations: [], totalPages: 0, currentPage: 1 };
  }
};
