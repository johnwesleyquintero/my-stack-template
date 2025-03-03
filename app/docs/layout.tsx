import type React from "react"
import type { Metadata } from "next"
import { DocsSidebar } from "@/components/docs/docs-sidebar"

export const metadata: Metadata = {
  title: "Documentation - Nebula Suite",
  description: "Learn how to use Nebula Suite's Amazon data pipeline tools and features.",
}

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
      <DocsSidebar />
      <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
        <div className="mx-auto w-full min-w-0">{children}</div>
      </main>
    </div>
  )
}

