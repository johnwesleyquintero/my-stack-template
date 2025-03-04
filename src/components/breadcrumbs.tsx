"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight } from "lucide-react"

export function Breadcrumbs() {
  const pathname = usePathname()
  const paths = pathname.split('/').filter(p => p)

  return (
    <nav className="flex items-center space-x-1 text-sm text-muted-foreground">
      <Link
        href="/"
        className="hover:text-foreground transition-colors"
      >
        Home
      </Link>
      {paths.map((path, index) => (
        <React.Fragment key={path}>
          <ChevronRight className="h-4 w-4" />
          <Link
            href={`/${paths.slice(0, index + 1).join('/')}`}
            className="capitalize hover:text-foreground transition-colors"
          >
            {path.replace(/-/g, ' ')}
          </Link>
        </React.Fragment>
      ))}
    </nav>
  )
}
