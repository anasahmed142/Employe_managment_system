import { GeolocationCoordinatess } from "@/services/authService";

export const getLocation = (): Promise<GeolocationCoordinatess> => {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      console.warn("Geolocation not supported, returning fallback location.");
      return resolve({
        latitude: 12344,
        longitude: 12342342,
        accuracy: 11,
        altitude: 1,
        altitudeAccuracy: 1,
        heading: 1,
        speed: 1,
      });
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          altitude: position.coords.altitude,
          altitudeAccuracy: position.coords.altitudeAccuracy,
          heading: position.coords.heading,
          speed: position.coords.speed,
        });
      },
      (error) => {
        switch (error.code) {
          case 1:
            console.warn("User denied permission for location access. Using fallback location.");
            break;
          case 2:
            console.warn("Location unavailable. Using fallback location.");
            break;
          case 3:
            console.warn("Location request timed out. Using fallback location.");
            break;
        }
        // Fully typed fallback
        resolve({
          latitude: 12344,
          longitude: 12342342,
          accuracy: 11,
          altitude: null,
          altitudeAccuracy: null,
          heading: null,
          speed: null,
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  });
};
