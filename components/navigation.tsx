"use client"

import Link from "next/link"

import { usePathname } from "next/navigation"

export function Navigation() {
  const pathname = usePathname()
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ""

  return (
    <nav>
      <Link href={`${basePath}/`}>Home</Link>
      <Link href={`${basePath}/dashboard`}>Dashboard</Link>
      {/* Other navigation links */}
    </nav>
  )
}

