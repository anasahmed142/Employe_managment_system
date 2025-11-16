
import { connectionToDatabase } from "@/lib/db";
import Location from "@/models/Location_model";
import User from "@/models/User_model";
import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body) {
      return NextResponse.json(
        { message: " input is required for logout." },
        { status: 400 }
      );
    }

    const { email, location, photo } = body;

    if (!email) {
      return NextResponse.json(
        { message: "Email is required for logout." },
        { status: 400 }
      );
    }

    await connectionToDatabase();

    // Update user status to offline
    const user = await User.findOneAndUpdate(
      { email },
      { status: "offline" },
      { new: true }
    );

    if (!user) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }
    // if (user.role !== "admin") {
    if (location && photo) {
      const newLocation = new Location({
        user: user._id,
        LocationTypes: "Logout",
        location: location,
        photo
      });
      console.log("newLocation:",newLocation);
      var id = await newLocation.save();
      console.log("Logout saved:",id);
    }
    // }

    const cookieStore = await cookies();
    cookieStore.delete("accessToken");

    return NextResponse.json(
      { message: `Logout successful for ` },
      { status: 200 }
    );
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { message: `Internal server error${error}` },
      { status: 500 }
    );
  }
}
