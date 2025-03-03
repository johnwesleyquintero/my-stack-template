"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, Home } from "lucide-react"

export function Breadcrumbs() {
  const pathname = usePathname()
  const segments = pathname.split("/").filter(Boolean)

  return (
    <nav aria-label="Breadcrumb" className="flex items-center space-x-1 text-sm text-muted-foreground">
      <Link href="/" className="flex items-center hover:text-foreground">
        <Home className="h-4 w-4" />
        <span className="sr-only">Home</span>
      </Link>
      {segments.map((segment, index) => {
        const href = `/${segments.slice(0, index + 1).join("/")}`
        const isLast = index === segments.length - 1
        const title = segment.charAt(0).toUpperCase() + segment.slice(1)

        return (
          <div key={href} className="flex items-center">
            <ChevronRight className="h-4 w-4" />
            {isLast ? (
              <span className="ml-1 font-medium text-foreground">{title}</span>
            ) : (
              <Link href={href} className="ml-1 hover:text-foreground">
                {title}
              </Link>
            )}
          </div>
        )
      })}
    </nav>
  )
}

