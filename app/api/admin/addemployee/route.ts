import { NextResponse } from "next/server";
import { connectionToDatabase } from "@/lib/db";
import User from "@/models/User_model";

// Connect to the database
connectionToDatabase();

export async function POST(request: Request) {
  try {
    const { name, salery, email, adminEmail } = await request.json();

    // Check if the user making the request is an admin
    const admin = await User.findOne({ email: adminEmail });
    if (!admin || admin.role !== "admin") {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    // Create a new user
    const newUser = new User({
      name,
      email,
      salery,
      password: "password", // Default password
    });

    await newUser.save();

    return NextResponse.json(
      { message: "Employee added successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding employee:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
