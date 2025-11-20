"use client";

import { getLocation } from "@/lib/geolocation";
import { useAppSelector } from "@/store";
import { useEffect } from "react";
import api from "@/lib/axios";

const LocationTracker = () => {
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    if (!user?.userId) return; // prevent firing when user is null
// if (user && user?.role !== "admin") {
    const trackLocation = async () => {
      try {
        console.log("Sending location...");

        // Ensure location is awaited & resolved
        const location = await getLocation();

        if (!location || location instanceof Promise) {
          console.error("Location not resolved:", location);
          return;
        }

        const responseData = {
          userId: user.userId,
          location,
        };

        const res = await api.post("http://localhost:5000/api/track-location", responseData);

        console.log("Location response:", res.data);
      } catch (error) {
        console.error("Error tracking location:", error);
      }
    };

    trackLocation(); // call once
    const intervalId = setInterval(trackLocation, 5 * 60 * 1000); // every 5 minutes

    return () => clearInterval(intervalId);
  // }
  }, [user]);

  return null;
};

export default LocationTracker;
