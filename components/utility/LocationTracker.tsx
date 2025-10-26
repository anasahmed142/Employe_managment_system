
"use client";

import { useAppSelector } from "@/store";
import { useEffect } from "react";

const LocationTracker = () => {
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    if (user && user?.role !== "admin") {
      const trackLocation = () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude, accuracy } = position.coords;
              fetch("/api/track-location", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  userId: user.userId,
                  location: { latitude, longitude, accuracy },
                }),
              });
            },
            (error) => {
              console.error("Error getting location:", error);
            }
          );
        }
      };

      trackLocation(); // Track location immediately on component mount
      const intervalId = setInterval(trackLocation, 5 * 60 * 1000); // Track location every 5 minutes

      return () => clearInterval(intervalId); // Cleanup on component unmount
    }
  }, [user]);

  return null; // This component doesn't render anything
};

export default LocationTracker;
