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
  const res = await api.post("https://ems-api-qix4.onrender.com/api/admin/alluser", payload);
  return res.data;
};

export const getLocationHistory = async (payload: LocationHistoryPayload) => {
  const res = await api.post("https://ems-api-qix4.onrender.com/api/location", payload);
  return res.data;
};

export const addEmployee = async (payload: AddEmployeePayload) => {
  const res = await api.post("https://ems-api-qix4.onrender.com/api/admin/addemployee", payload);
  return res.data;
};

interface DeleteUserPayload {
  userId: string;
}

export const deleteUser = async (payload: DeleteUserPayload) => {
  const res = await api.post("https://ems-api-qix4.onrender.com/api/admin/deleteuser", payload);
  return res.data;
};

interface GetUserByIdPayload {
  userId: string;
}

export const getUserById = async (payload: GetUserByIdPayload) => {
  const res = await api.post("https://ems-api-qix4.onrender.com/api/admin/getuser", payload);
  return res.data;
};

interface UpdateUserPayload {
  userId: string;
  name?: string;
  email?: string;
  role?: string;
  salery?: string;
}

export const updateUser = async (payload: UpdateUserPayload) => {
  const res = await api.post("https://ems-api-qix4.onrender.com/api/admin/updateuser", payload);
  return res.data;
};

export const getPayroll = async () => {
  const res = await api.post("https://ems-api-qix4.onrender.com/api/payroll");
  return res.data;
};
