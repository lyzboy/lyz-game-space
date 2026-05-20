import { auth } from "@/auth";
import { NextAuthRequest } from "next-auth";
import { NextResponse } from "next/server";

export default auth((req: NextAuthRequest) => {
  // check if the endpoint is an admin route
  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");
  // get the user's role
  const role = req.auth?.user?.role;

  if (isAdminRoute && role !== "ADMIN") {
    return NextResponse.redirect(new URL("/", req.url));
  }
});

export const config = {
  matcher: ["/admin/:path*"],
};
