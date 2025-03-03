// Create a new API route to handle CSRF token generation
import { NextResponse } from "next/server"
import { generateCsrfToken } from "@/lib/csrf"

export async function GET() {
  const token = generateCsrfToken()

  return NextResponse.json({
    csrfToken: token,
    success: true,
  })
}

