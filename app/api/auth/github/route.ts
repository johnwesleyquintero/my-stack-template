import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const cookieStore = cookies()
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

  // Use URL constructor to handle the request URL
  const requestUrl = new URL(request.url)
  const callbackUrl = `${requestUrl.origin}/auth/callback`

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: callbackUrl,
    },
  })

  if (error) {
    return NextResponse.redirect(`${requestUrl.origin}/auth/error?error=${error.message}`)
  }

  return NextResponse.redirect(data.url)
}

