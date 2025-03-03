"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="container flex flex-col items-center justify-center min-h-[80vh] gap-4">
      <h1 className="text-4xl font-bold">Something went wrong!</h1>
      <p className="text-muted-foreground text-center max-w-md">
        An error occurred while loading this page. Please try again or contact support if the problem persists.
      </p>
      <Button onClick={reset}>Try again</Button>
    </div>
  )
}

