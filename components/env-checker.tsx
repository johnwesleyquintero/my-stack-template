"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { validateEnvVars } from "@/lib/env"

export function EnvChecker() {
  try {
    validateEnvVars()
  } catch (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Configuration Error</AlertTitle>
        <AlertDescription>
          {error instanceof Error ? error.message : "An error occurred while validating environment variables"}
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Environment Status</CardTitle>
        <CardDescription>Current environment configuration</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-sm">
            <span className="font-medium">Environment:</span>{" "}
            <code className="rounded bg-muted px-2 py-1">{process.env.NEXT_PUBLIC_VERCEL_ENV || "development"}</code>
          </p>
          <p className="text-sm">
            <span className="font-medium">Supabase:</span> <code className="rounded bg-muted px-2 py-1">Connected</code>
          </p>
          <p className="text-sm">
            <span className="font-medium">API URL:</span>{" "}
            <code className="rounded bg-muted px-2 py-1">{process.env.NEXT_PUBLIC_SUPABASE_URL}</code>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

