'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { captureError } from '@/lib/error-logger'

// Create a client-side button wrapper
const ClientButton = ({
  onClick,
  children,
}: {
  onClick: () => void
  children: React.ReactNode
}) => {
  return <Button onClick={onClick}>{children}</Button>
}

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    captureError(error, { componentStack: error.stack })
  }, [error])

  return (
    <div className="container flex min-h-[80vh] flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">Something went wrong!</h1>
      <p className="max-w-md text-center text-muted-foreground">
        An error occurred while loading this page. Please try again or contact
        support if the problem persists.
      </p>
      <ClientButton onClick={reset}>Try again</ClientButton>
    </div>
  )
}
