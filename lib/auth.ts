
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.ACCESS_TOKEN_SECRET || "default_secret";

export interface CustomJwtPayload extends JwtPayload {
  _id: string;
  name: string;
  email: string;
  role?: string;
  status: string;
}

export async function getUserFromCookies(): Promise<CustomJwtPayload | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) return null;

    const decoded = jwt.verify(token, JWT_SECRET) as CustomJwtPayload;
    return decoded;
  } catch (error) {
    console.log("Invalid or expired token:", error);
    return null; 
  }
}
