
import { NextResponse } from "next/server";
import { connectionToDatabase } from "@/lib/db";
import User from "@/models/User_model"; // Assuming you have a User model

// A placeholder for a Location model
// You would need to create this model similar to your User_model
import Location from "@/models/Location_model"; 

// @desc    Log employee location
// @route   POST /api/location
// @access  Private (should be protected)
export async function POST(req: Request) {
  try {
    await connectionToDatabase();
    const { userId, latitude, longitude } = await req.json();

    if (!userId || !latitude || !longitude) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    // Here you would save the location to a new "locations" collection in your database
    // For now, we'll just log it and return a success response.
    console.log(`Received location for user ${userId}: ${latitude}, ${longitude}`);

    // TODO: Create a Location model and save the data.
    const newLocation = new Location({
      userId,
      latitude,
      longitude,
      timestamp: new Date(),
    });
    await newLocation.save();

    return NextResponse.json({ message: "Location logged successfully" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}

// @desc    Get employee location history
// @route   GET /api/location?userId=...&date=...
// @access  Private (for admins)
export async function GET(req: Request) {
    try {
        await connectionToDatabase();
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("userId");
        const date = searchParams.get("date"); // e.g., "2023-10-27"

        if (!userId || !date) {
            return NextResponse.json({ message: "User ID and date are required" }, { status: 400 });
        }
        
        // TODO: Query the database for location records for the given user and date
        console.log(`Fetching locations for user ${userId} on date ${date}`);

        // Placeholder data
        const locations = [
            { latitude: 34.0522, longitude: -118.2437, timestamp: new Date() },
            { latitude: 34.0525, longitude: -118.2440, timestamp: new Date() },
        ];

        return NextResponse.json(locations, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
}
