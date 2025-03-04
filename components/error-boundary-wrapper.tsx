import type * as React from 'react'
import { ErrorBoundary } from 'react-error-boundary'

export function ErrorBoundaryWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ErrorBoundary
      fallback={
        <div className="flex min-h-screen items-center justify-center p-4">
          <div className="w-full max-w-md rounded-lg border bg-background p-6 shadow-lg">
            <div className="flex flex-col gap-2">
              <h2 className="text-lg font-semibold">An error occurred</h2>
              <div className="text-sm text-muted-foreground">
                <p>Something went wrong. Please try:</p>
                <ul className="mt-2 list-inside list-disc">
                  <li>Refreshing the page</li>
                  <li>Checking your internet connection</li>
                  <li>Clearing your browser cache</li>
                  <li>Contacting support if the issue persists</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      }
    >
      {children}
    </ErrorBoundary>
  )
}
