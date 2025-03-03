import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Icons } from "@/components/icons";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <Icons.logo className="h-6 w-6" />
              <span className="font-bold">Next Nebula</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Button variant="outline" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
          <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
            <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
              Build faster with
              <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                {" "}
                Next Nebula
              </span>
            </h1>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              A modern starter template for Next.js applications. Built with
              TypeScript, Tailwind CSS, and Supabase.
            </p>
            <div className="space-x-4">
              <Button size="lg" asChild>
                <Link href="/docs">Get Started</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="https://github.com/yourusername/next-nebula-starter">
                  <Icons.gitHub className="mr-2 h-4 w-4" />
                  GitHub
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="container space-y-6 py-8 md:py-12 lg:py-24">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
              Features
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              This starter template is packed with features to help you build
              your next project faster.
            </p>
          </div>
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <Icons.nextjs className="h-12 w-12" />
                <div className="space-y-2">
                  <h3 className="font-bold">Next.js 14</h3>
                  <p className="text-sm text-muted-foreground">
                    App Router, React Server Components, and more.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <Icons.typescript className="h-12 w-12" />
                <div className="space-y-2">
                  <h3 className="font-bold">TypeScript</h3>
                  <p className="text-sm text-muted-foreground">
                    Built-in TypeScript support for better development.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <Icons.tailwind className="h-12 w-12" />
                <div className="space-y-2">
                  <h3 className="font-bold">Tailwind CSS</h3>
                  <p className="text-sm text-muted-foreground">
                    Beautiful and responsive UI with Tailwind CSS.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <Icons.logo className="h-6 w-6" />
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              Built by{" "}
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noreferrer noopener"
                className="font-medium underline underline-offset-4"
              >
                your name
              </a>
              . The source code is available on{" "}
              <a
                href="https://github.com/yourusername/next-nebula-starter"
                target="_blank"
                rel="noreferrer noopener"
                className="font-medium underline underline-offset-4"
              >
                GitHub
              </a>
              .
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
