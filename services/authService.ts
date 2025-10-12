import api from "@/lib/axios";

interface LoginPayload {
  name?: string;
  email: string;
  password: string;
}
interface LogoutPayload {
  email: string;
}
export const registerApi = async (payload: LoginPayload) => {
    const res = await api.post("/auth/register", payload);
    return res.data;
}

export const loginApi = async (payload: LoginPayload) => {
  const res = await api.post("/auth/login", payload);
  return res.data; 
};
export const logoutApi = async (payload: LogoutPayload) => {
  const res = await api.post("/auth/logout", payload, { withCredentials: true });
  return res;
};



