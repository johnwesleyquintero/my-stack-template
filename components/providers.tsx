"use client"

import type React from "react"
import { ThemeProvider } from "next-themes"
import { AuthProvider } from "@/lib/auth/auth-context"
import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { queryClient } from "@/lib/query-client"
import { useEffect } from "react"

export function Providers({ children }: { children: React.ReactNode }) {
  // Fetch CSRF token on client-side initialization
  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await fetch("/api/csrf")
        if (response.ok) {
          const data = await response.json()
          // Store CSRF token in memory for use in subsequent requests
          window.__CSRF_TOKEN__ = data.csrfToken
        }
      } catch (error) {
        console.error("Failed to fetch CSRF token:", error)
      }
    }

    fetchCsrfToken()
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <AuthProvider>{children}</AuthProvider>
      </ThemeProvider>
      {process.env.NODE_ENV !== "production" && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  )
}

Providers.displayName = "Providers"

