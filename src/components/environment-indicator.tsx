'use client'

export function EnvironmentIndicator() {
  return process.env.NODE_ENV !== 'production' ? (
    <div className="fixed bottom-2 right-2 z-50 rounded bg-yellow-200 px-2 py-1 text-sm">
      {process.env.NODE_ENV}
    </div>
  ) : null
}
