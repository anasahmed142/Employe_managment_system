import { NextRequest, NextResponse } from "next/server";
import { connectionToDatabase } from "@/lib/db";
import User from "@/models/User_model";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log('Body in user:',body.email);
    
    const { email } = body || {};

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      );
    }
    await connectionToDatabase();
    const adminUser = await User.findOne({ email }).select("role");
    if (!adminUser || adminUser.role !== "admin") {
      return NextResponse.json(
        { success: false, message: "Not Authorized, only admin can access this" },
        { status: 401 }
      );
    }
    // Fetch all users except password and refreshToken
    const allUsers = await User.find().select("-password -refreshToken");

    if (!allUsers || allUsers.length === 0) {
      return NextResponse.json(
        { success: false, message: "No users found." },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { success: true, message: "All users retrieved successfully.", data: allUsers },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Internal Server Error", error },
      { status: 500 }
    );
  }
}
