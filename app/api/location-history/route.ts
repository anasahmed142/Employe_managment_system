import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { connectionToDatabase } from "@/lib/db";
import Location from "@/models/Location_model";

// Interface for the final location record sent in the API response
interface LocationRecord {
  uid: string;
  name: string;
  timestamp: string;
  latitude: number;
  longitude: number;
  accuracy: number;
  type: string;
}

export async function GET(req: NextRequest) {
  // Main try/catch block to prevent any unhandled exceptions and 500 errors
  try {
    await connectionToDatabase();

    // --- Pagination Logic (Kept Intact) ---
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const skip = (page - 1) * limit;

    const totalRecords = await Location.countDocuments();
    const totalPages = Math.ceil(totalRecords / limit);

    // --- Database Query with Type-Safe Population ---
    const locations = await Location.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate<{ user: { _id: Types.ObjectId; name: string } }>("user", "_id name");

    // --- Null-Safe and Type-Safe Mapping ---
    // Use .reduce() to safely build the array, skipping any invalid documents
    const formattedLocations = locations.reduce<LocationRecord[]>((acc, loc) => {
      // Check for existence of critical nested fields before attempting to access them
      if (
        !loc ||
        !loc.user ||
        !loc.location ||
        typeof loc.location.latitude !== 'number' ||
        typeof loc.location.longitude !== 'number'
      ) {
        console.warn("Skipping a location document with missing critical fields:", loc);
        return acc; // Skip this document
      }

      // Safely access user ID and name from populated object
      const userId = loc.user._id?.toString();
      const fullname = loc.user.name?.toString();

      if (!userId) {
        console.warn("Skipping a location document with an invalid user ID:", loc);
        return acc; // Skip if user ID cannot be determined
      }

      // If all checks pass, create the final record
      acc.push({
        uid: userId,
        name: fullname,
        timestamp: loc.createdAt.toISOString(),
        latitude: loc.location.latitude,
        longitude: loc.location.longitude,
        accuracy: loc.location.accuracy,
        type: loc.LocationTypes,
      });

      return acc;
    }, []);

    // --- Final Response (Kept Intact) ---
    return NextResponse.json(
      {
        locations: formattedLocations,
        totalPages,
        currentPage: page,
      },
      { status: 200 }
    );

  } catch (error) {
    // Catch-all for any other unexpected errors during execution
    console.error("Failed to fetch location history:", error);
    return NextResponse.json(
      { error: "An internal server error occurred while fetching location history." },
      { status: 500 }
    );
  }
}
