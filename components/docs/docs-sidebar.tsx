"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronDown } from "lucide-react"
import { docsNavigation, iconComponents } from "@/lib/docs/navigation"
import type { SidebarNavItem } from "@/lib/constants"
import { useState } from "react"

interface DocsSidebarProps {
  className?: string
}

export function DocsSidebar({ className }: DocsSidebarProps) {
  return (
    <aside className={cn("hidden lg:block", className)}>
      <ScrollArea className="h-[calc(100vh-3.5rem)] py-6 pr-6 lg:py-8">
        <div className="w-full">
          {docsNavigation.map((item, index) => (
            <DocsSidebarItem key={index} item={item} />
          ))}
        </div>
      </ScrollArea>
    </aside>
  )
}

interface DocsSidebarItemProps {
  item: SidebarNavItem
  level?: number
}

function DocsSidebarItem({ item, level = 0 }: DocsSidebarItemProps) {
  const pathname = usePathname()
  const [expanded, setExpanded] = useState(isCurrentPath(pathname, item))
  const Icon = item.icon ? iconComponents[item.icon as keyof typeof iconComponents] : null

  // Check if current path matches item or its children
  function isCurrentPath(path: string, navItem: SidebarNavItem): boolean {
    if (path === navItem.href) return true
    if (navItem.items) {
      return navItem.items.some((child) => isCurrentPath(path, child))
    }
    return false
  }

  const isActive = isCurrentPath(pathname, item)

  // Handle items with children
  if (item.items) {
    return (
      <div className="mb-2">
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-between font-medium",
            isActive && "bg-accent text-accent-foreground",
            level > 0 && "pl-8",
          )}
          onClick={() => setExpanded(!expanded)}
        >
          <span className="flex items-center">
            {Icon && <Icon className="mr-2 h-4 w-4" />}
            {item.title}
          </span>
          <ChevronDown className={cn("h-4 w-4 transition-transform", expanded ? "rotate-180" : "")} />
        </Button>
        {expanded && (
          <div className="mt-1">
            {item.items.map((child, index) => (
              <DocsSidebarItem key={index} item={child} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    )
  }

  // Handle leaf items
  return (
    <Link
      href={item.href}
      className={cn(
        "flex items-center py-2 px-4 text-sm font-medium",
        "hover:bg-accent hover:text-accent-foreground rounded-md transition-colors",
        isActive && "bg-accent text-accent-foreground",
        level > 0 && "ml-4",
      )}
    >
      {Icon && <Icon className="mr-2 h-4 w-4" />}
      {item.title}
    </Link>
  )
}

