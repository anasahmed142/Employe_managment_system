import { NextRequest, NextResponse } from "next/server";
import { connectionToDatabase } from "@/lib/db";
import User from "@/models/User_model";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, ...updateData } = body || {};

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "User ID is required" },
        { status: 400 }
      );
    }
    await connectionToDatabase();
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true }).select("-password -refreshToken");

    if (!updatedUser) {
      return NextResponse.json(
        { success: false, message: "User not found." },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { success: true, message: "User updated successfully.", data: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Internal Server Error", error },
      { status: 500 }
    );
  }
}
