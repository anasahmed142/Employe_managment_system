export const dynamic = "force-dynamic";
import { NextRequest } from "next/server";
import User from "@/models/User_model";
import { response } from "@/lib/response";
import { connectionToDatabase } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password , role = "employee"} = await req.json();

    if (!name || !email || !password) {
      return response(null, 400, "Email and password are required.");
    }

    connectionToDatabase();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return response(null, 409, "User already exists.");
    }

    const newUser = new User({
       name,
      email,
      password,
      role,

    });

    const user = await User.create(newUser);

    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken "
    );

    if (!createdUser) {
      return response(null, 500, "User registration failed.");
    }

    return response(
      createdUser,
      201,
      "Signup successful! Check your email to verify."
    );
  } catch (error) {
   const err = error as Error;
    return response(null, 500, "Internal Server Error", err.message);
  }
} 
