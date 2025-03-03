"use client"

import { useEffect, useState } from "react"

export function SkipLink() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <a
      href="#main-content"
      className="fixed top-2 left-2 z-50 -translate-y-[200%] bg-background p-4 transition-transform focus:translate-y-0 focus:ring-2 focus:ring-ring"
    >
      Skip to main content
    </a>
  )
}

