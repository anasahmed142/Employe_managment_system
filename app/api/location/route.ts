
import { connectionToDatabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import Location from "@/models/Location_model";

export async function GET(req: NextRequest) {
  try {
    await connectionToDatabase();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ message: "User ID are required" }, { status: 400 });
    }

    const locations = await Location.find({ user: userId }).populate("user", "name email");

    return NextResponse.json(locations, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
