"use client"

import { useAuth } from "@/lib/auth/auth-context"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Clock } from "lucide-react"

export function TrialBanner() {
  const { trialInfo } = useAuth()

  if (!trialInfo || !trialInfo.isActive) return null

  return (
    <Alert className="fixed bottom-4 right-4 w-auto max-w-md">
      <Clock className="h-4 w-4" />
      <AlertDescription className="flex items-center justify-between">
        <span>
          {trialInfo.daysRemaining} {trialInfo.daysRemaining === 1 ? "day" : "days"} remaining in your trial
        </span>
        <Button variant="outline" size="sm" className="ml-4">
          Upgrade Now
        </Button>
      </AlertDescription>
    </Alert>
  )
}

