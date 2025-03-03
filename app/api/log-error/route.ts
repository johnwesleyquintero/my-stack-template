import { NextResponse } from "next/server"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { getCsrfToken } from "@/lib/csrf"

export async function POST(request: Request) {
  try {
    // Validate CSRF token
    const csrfToken = request.headers.get("x-csrf-token")
    const expectedToken = getCsrfToken()

    if (!csrfToken || !expectedToken || csrfToken !== expectedToken) {
      return NextResponse.json({ success: false, error: "Invalid CSRF token" }, { status: 403 })
    }

    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

    // Get the current session to identify the user
    const {
      data: { session },
    } = await supabase.auth.getSession()

    const errorData = await request.json()

    // Add user ID if available
    if (session?.user) {
      errorData.userId = session.user.id
    }

    // Add server-side context
    errorData.serverContext = {
      timestamp: new Date().toISOString(),
      environment: process.env.NEXT_PUBLIC_VERCEL_ENV || "development",
      version: process.env.NEXT_PUBLIC_APP_VERSION || "1.0.0",
    }

    // Log to console in development
    if (process.env.NODE_ENV === "development") {
      console.error("Error logged from client:", errorData)
    }

    // Store in Supabase if available
    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      const { error } = await supabase.from("error_logs").insert({
        error_message: errorData.message,
        error_stack: errorData.stack,
        context: errorData.context,
        user_id: errorData.userId,
        url: errorData.context?.url,
        timestamp: new Date().toISOString(),
        status_code: errorData.context?.statusCode,
        request_id: errorData.context?.requestId,
      })

      if (error) {
        console.error("Failed to store error in database:", error)
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error in error logging endpoint:", error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}

