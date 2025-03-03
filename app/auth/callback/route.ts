import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const redirectTo =
    requestUrl.searchParams.get("redirectedFrom") || "/dashboard";

  if (code) {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    try {
      await supabase.auth.exchangeCodeForSession(code);
    } catch (error) {
      console.error("Error exchanging code for session:", error);
      return NextResponse.redirect("/login?error=Session exchange failed");
    }
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(`${requestUrl.origin}${redirectTo}`);
}
