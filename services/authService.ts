
import api from "@/lib/axios";
export interface GeolocationCoordinatess {
  accuracy: number;
  altitude: number | null;
  altitudeAccuracy: number | null;
  heading: number | null;
  latitude: number;
  longitude: number;
  speed: number | null;
}
interface LoginPayload {
  name?: string;
  email: string;
  password: string;
  location?: GeolocationCoordinatess;
  photo?: string;
}
interface LogoutPayload {
  email: string;
  location?: GeolocationCoordinatess;
  photo?: string;
}
export const registerApi = async (payload: LoginPayload) => {
    const res = await api.post("/auth/register", payload);
    return res.data;
}

export const loginApi = async (payload: LoginPayload) => {
  console.log("payload:",payload);
  
  const res = await api.post("/auth/login", payload);
  return res.data; 
};
export const logoutApi = async (payload: LogoutPayload) => {
  const res = await api.post("/auth/logout", payload, { withCredentials: true });
  return res;
};

