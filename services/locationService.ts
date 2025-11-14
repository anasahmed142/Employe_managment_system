import { LocationRecord } from "@/components/location-history-table";

// This is a mock service to simulate fetching data from a backend.
// In a real application, this would be an API call to Firestore or another database.
export const getAllLocationHistory = async (): Promise<{ locations: LocationRecord[] }> => {
  console.log("Fetching mock location history...");
  // Simulate a network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Return mock data that matches the LocationRecord type
  const mockData: LocationRecord[] = [
    {
      uid: "user-1-uid",
      timestamp: new Date(),
      latitude: 34.0522,
      longitude: -118.2437,
      type: "login",
    },
    {
      uid: "user-2-uid",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      latitude: 40.7128,
      longitude: -74.0060,
      type: "logout",
    },
    {
      uid: "user-1-uid",
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      latitude: 34.0522,
      longitude: -118.2437,
      type: "check-in",
    },
    {
        uid: "user-3-uid",
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        latitude: 48.8566,
        longitude: 2.3522,
        type: "login",
    }
  ];

  return { locations: mockData };
};
