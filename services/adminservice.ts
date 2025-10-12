
import api from "@/lib/axios";
interface Payload {
  email: string;
}

export const getAllUser = async (payload: Payload) => {
  const res = await api.post("/admin/alluser", { payload });
  return res.data;
};
