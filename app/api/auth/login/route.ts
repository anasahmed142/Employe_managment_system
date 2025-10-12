import { connectionToDatabase } from "@/lib/db";
import { response } from "@/lib/response";
import User from "@/models/User_model";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json(); 
    const { email, password } = payload;

    console.log("Received:", email, password);

    if (!email || !password) {
      return response(null, 400, "Email and password are required");
    }

    connectionToDatabase();
    const user = await User.findOne({ email });
    if (!user) {
      return response(null, 409, "plesase enter a valid email.");
    }

    const checkpassword = await user.comparePassword(password);
    if (!checkpassword) {
      return response(null, 401, "Invalid credentials");
    }

    user.status = "online";
    await user.save();

    const token = user.generateAccessToken();
    if (!token) {
      return response(null, 500, "Token generation failed");
    }

    const CookieStore = await cookies();

    CookieStore.set({
      name: "accessToken",
      value: token,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 1 * 24 * 60 * 60, // 1 day
      sameSite: "lax",
    });

    const loggedInUser = {
      userId: user._id.toString(),
      name: user.name,
      email: user.email,
      status: user.status,
      role: user.role,
      accessToken: token,
    };

    return response({ loggedInUser }, 200, "Login successful");
  } catch (error) {
    return response({ error }, 500, "Internal Server Error");
  }
}
