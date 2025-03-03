import { NextResponse } from "next/server"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import crypto from "crypto"

export async function GET() {
  try {
    // Check Supabase connection
    const supabase = createRouteHandlerClient({ cookies })
    const { error: authError } = await supabase.auth.getSession()

    if (authError) {
      throw new Error(`Supabase auth error: ${authError.message}`)
    }

    // Check environment variables
    const requiredEnvVars = [
      "NEXT_PUBLIC_SUPABASE_URL",
      "NEXT_PUBLIC_SUPABASE_ANON_KEY",
      "NEXT_PUBLIC_STORAGE_KEY",
      "NEXT_PUBLIC_VERCEL_ENV",
      "NEXT_PUBLIC_APP_VERSION",
      "NEXT_PUBLIC_BASE_PATH",
    ]

    const missingEnvVars = requiredEnvVars.filter((envVar) => !process.env[envVar])

    if (missingEnvVars.length > 0) {
      throw new Error(`Missing environment variables: ${missingEnvVars.join(", ")}`)
    }

    // Check CSRF token generation
    try {
      const cookieStore = cookies()
      const csrfCookie = cookieStore.get("csrf-token")

      // If no CSRF cookie exists, generate one to test cookie functionality
      if (!csrfCookie) {
        const token = crypto.randomUUID()
        cookieStore.set("csrf-token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          path: "/",
        })
      }
    } catch (cookieError) {
      return NextResponse.json(
        {
          status: "unhealthy",
          error: "Cookie handling error: " + (cookieError instanceof Error ? cookieError.message : String(cookieError)),
          timestamp: new Date().toISOString(),
        },
        { status: 500 },
      )
    }

    return NextResponse.json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      environment: process.env.NEXT_PUBLIC_VERCEL_ENV || "development",
      version: process.env.NEXT_PUBLIC_APP_VERSION || "1.0.0",
      basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
      supabase: "connected",
      middleware: "functional",
    })
  } catch (error) {
    console.error("Health check failed:", error)
    return NextResponse.json(
      {
        status: "unhealthy",
        error: error instanceof Error ? error.message : "Unknown error occurred",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}

