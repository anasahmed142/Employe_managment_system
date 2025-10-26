import { connectionToDatabase } from "@/lib/db";
import User from "@/models/User_model";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json(); 
    const { email, password } = payload;

    console.log("Received:", email, password);

    if (!email || !password) {
      return NextResponse.json({ success: false, message: "Email and password are required" }, { status: 400 });
    }

    await connectionToDatabase();
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ success: false, message: "plesase enter a valid email." }, { status: 409 });
    }

    const checkpassword = await user.comparePassword(password);
    if (!checkpassword) {
      return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
    }

    user.status = "online";
    await user.save();

    const token = user.generateAccessToken();
    if (!token) {
      return NextResponse.json({ success: false, message: "Token generation failed" }, { status: 500 });
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

    return NextResponse.json({ success: true, loggedInUser, message: "Login successful" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error, message: "Internal Server Error" }, { status: 500 });
  }
}
