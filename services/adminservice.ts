import api from "@/lib/axios";

interface AllUserPayload {
  email: string;
}

interface LocationHistoryPayload {
  userId: string;
  date: string;
}

interface AddEmployeePayload {
  name: string;
  email: string;
  adminEmail: string;
  salery: string;
}

export const getAllUser = async (payload: AllUserPayload) => {
  const res = await api.post("/admin/alluser", payload);
  return res.data;
};

export const getLocationHistory = async (payload: LocationHistoryPayload) => {
  const res = await api.post("/location", payload);
  return res.data;
};

export const addEmployee = async (payload: AddEmployeePayload) => {
  const res = await api.post("/admin/addemployee", payload);
  return res.data;
};
