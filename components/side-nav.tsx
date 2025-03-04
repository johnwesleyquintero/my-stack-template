'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { Logo } from '@/components/logo'
import {
  BarChart3,
  Database,
  Search,
  Settings,
  Upload,
  Users,
  FileSpreadsheet,
  HelpCircle,
  LayoutDashboard,
  ChevronDown,
  Book,
} from 'lucide-react'
import { useSidebarStore } from '@/lib/stores/sidebar-store'
import { useEffect } from 'react'
import { useAuth } from '@/lib/auth/auth-context'

const routes = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard',
  },
  {
    label: 'Upload Data',
    icon: Upload,
    href: '/upload',
  },
  {
    label: 'Data Mapping',
    icon: Database,
    href: '/mapping',
  },
  {
    label: 'Export Data',
    icon: FileSpreadsheet,
    href: '/export',
  },
  {
    label: 'Documentation',
    icon: Book,
    href: '/docs',
  },
  {
    label: 'Search Terms',
    icon: Search,
    href: '/search-terms',
  },
  {
    label: 'Analytics',
    icon: BarChart3,
    href: '/analytics',
  },
  {
    label: 'Team',
    icon: Users,
    href: '/team',
  },
  {
    label: 'Settings',
    icon: Settings,
    href: '/settings',
  },
  {
    label: 'Help',
    icon: HelpCircle,
    href: '/help',
  },
]

export function SideNav() {
  const pathname = usePathname()
  const { isOpen, setSidebarOpen } = useSidebarStore()
  const { userProfile } = useAuth()

  // Close sidebar on mobile when navigating
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [setSidebarOpen])

  const sidebarContent = (
    <div className="flex h-full flex-col">
      <div className="flex h-14 items-center border-b px-4">
        <Logo />
      </div>
      <ScrollArea className="flex-1">
        <nav className="px-2 py-4" aria-label="Main Navigation">
          <div className="space-y-1">
            {routes.map(route => {
              const isActive =
                pathname === route.href ||
                pathname?.startsWith(`${route.href}/`)
              return (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
                    isActive
                      ? 'bg-accent text-accent-foreground'
                      : 'transparent'
                  )}
                  aria-current={isActive ? 'page' : undefined}
                  onClick={() => {
                    if (window.innerWidth < 768) {
                      setSidebarOpen(false)
                    }
                  }}
                >
                  <route.icon className="h-5 w-5" />
                  {route.label}
                </Link>
              )
            })}
          </div>
        </nav>
      </ScrollArea>
      <div className="mt-auto border-t p-4">
        <div className="flex items-center gap-3 rounded-md px-3 py-2">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-primary/10 p-1">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">
                {userProfile?.full_name || 'Nebula Team'}
              </p>
              <p className="text-xs text-muted-foreground">Free Plan</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="ml-auto">
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <aside
        className={cn(
          'hidden w-64 border-r transition-all duration-300 md:block',
          !isOpen && 'md:w-0 md:opacity-0'
        )}
      >
        {sidebarContent}
      </aside>
      <Sheet open={isOpen} onOpenChange={setSidebarOpen}>
        <SheetContent
          side="left"
          className="p-0 sm:max-w-xs"
          description="Navigation menu"
        >
          {sidebarContent}
        </SheetContent>
      </Sheet>
    </>
  )
}
