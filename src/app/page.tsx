import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"

export default async function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <nav className="container flex h-14 items-center">
          <div className="flex flex-1 items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="font-bold">Nebula</span>
            </div>
            {/* @ts-expect-error Server Component */}
            <ThemeToggle />
          </div>
        </nav>
      </header>
      <main className="flex-1">
        <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
          <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
            <h1 className="font-heading text-3xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">
              Next Nebula Starter
            </h1>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              A modern Next.js starter template
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}
