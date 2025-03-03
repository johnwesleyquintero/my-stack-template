import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  try {
    const res = NextResponse.next();

    if (
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ) {
      console.error("Supabase credentials are not properly configured");
      return res;
    }

    const supabase = createMiddlewareClient({ req, res });

    const {
      data: { session },
    } = await supabase.auth.getSession();

    // If there's no session and the user is trying to access a protected route
    if (!session && isProtectedRoute(req.nextUrl.pathname)) {
      const redirectUrl = req.nextUrl.clone();
      redirectUrl.pathname = "/login";
      redirectUrl.searchParams.set("redirectedFrom", req.nextUrl.pathname);
      return NextResponse.redirect(redirectUrl);
    }

    return res;
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.next();
  }
}

/**
 * Determines if a route should be protected (requires authentication)
 */
function isProtectedRoute(pathname: string): boolean {
  // Define protected routes that require authentication
  const protectedPaths = [
    "/dashboard",
    "/settings",
    "/profile",
    "/team",
    "/analytics",
    "/reports",
    "/products",
    "/upload",
  ];

  // Check if the pathname starts with any of the protected paths
  return protectedPaths.some((path) => pathname.startsWith(path));
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
