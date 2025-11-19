export const dynamic = "force-dynamic";
import { connectionToDatabase } from "@/lib/db";
import Location from "@/models/Location_model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json(); 
    const { userId, location } = payload;

    if (!userId || !location) {
      return NextResponse.json({ success: false, message: "userId and location are required" }, { status: 400 });
    }

    await connectionToDatabase();

    const newLocation = new Location({
      user: userId,
      LocationTypes: "Regular",
      location: location,
    });
    console.log("newLocation:",newLocation);
    const id = await newLocation.save();
    console.log("Login saved:",id);

    await newLocation.save();

    return NextResponse.json({ success: true, message: "Location tracked successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error, message: "Internal Server Error" }, { status: 500 });
  }
}
