import type React from 'react'
import { SideNav } from '@/components/side-nav'
import { TrialBanner } from '@/components/trial-banner'
import { DashboardHeader } from '@/components/dashboard-header'
import { VersionInfo } from '@/components/version-info'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="flex flex-1">
        <SideNav />
        <main
          className="flex-1 overflow-auto p-4 md:p-6 lg:p-8"
          id="main-content"
        >
          {children}
        </main>
      </div>
      <footer className="border-t px-4 py-2">
        <div className="flex items-center justify-between">
          <VersionInfo />
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Nebula Suite. All rights reserved.
          </p>
        </div>
      </footer>
      <TrialBanner />
    </div>
  )
}
