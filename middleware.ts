import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicRoutes = ["/api/auth/login", "/api/auth/register"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  console.log("Middleware triggered for:", pathname);


  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  const token =
    req.cookies.get("accessToken")?.value ||
    req.headers.get("authorization")?.replace("Bearer ", "");

    console.log(token)

  if (!token) {
    return NextResponse.json(
      { error: "Unauthorized: Token missing" },
      { status: 401 }
    );
  }

  try {
    return NextResponse.next()      
  } catch (error) {
    console.log("Token verification failed:", error);
    return NextResponse.json(
      { error: "Unauthorized: Invalid or expired token" },
      { status: 401 }
    );
  }
}


export const config = {
  matcher: ["/api/:path*"],
  

};
