'use client'

import { Logo } from '@/components/logo'
import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import { UserNav } from '@/components/user-nav'
import { MainNav } from '@/components/main-nav'
import { Menu, Bell } from 'lucide-react'
import { CommandMenu } from '@/components/command-menu'
import { KeyboardShortcuts } from '@/components/keyboard-shortcuts'
import { useSidebarStore } from '@/lib/stores/sidebar-store'

export function DashboardHeader() {
  const { toggleSidebar } = useSidebarStore()

  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="flex h-16 items-center px-4 sm:px-6">
        <Button
          variant="ghost"
          size="icon"
          className="mr-2 md:hidden"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div className="flex items-center">
          <Logo className="hidden md:flex" />
        </div>
        <MainNav className="mx-6 hidden md:flex" />
        <div className="ml-auto flex items-center space-x-4">
          <div className="hidden md:flex md:w-64 lg:w-96">
            <CommandMenu />
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-destructive"></span>
          </Button>
          <ThemeToggle />
          <KeyboardShortcuts />
          <UserNav />
        </div>
      </div>
    </header>
  )
}
