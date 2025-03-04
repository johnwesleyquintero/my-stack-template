'use client'

// Server Component
import { redirect } from 'next/navigation'
import { getServerClient } from '@/lib/supabase/server'

async function checkSession() {
  const supabase = await getServerClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()
  if (session) {
    redirect('/dashboard')
  }
  return null
}

// Client Component

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/logo'
import { ThemeToggle } from '@/components/theme-toggle'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  CheckCircle,
  Globe,
  ShoppingCart,
  BarChart3,
  FileSpreadsheet,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'

const features = [
  {
    title: 'Multi-Marketplace Support',
    description:
      'Connect and manage data from all your Amazon marketplaces in one place',
    icon: Globe,
  },
  {
    title: 'Automated Report Sync',
    description:
      'Automatically sync your Seller Central reports on your schedule',
    icon: FileSpreadsheet,
  },
  {
    title: 'Sales Analytics',
    description: 'Deep insights into your Amazon business performance',
    icon: BarChart3,
  },
  {
    title: 'Inventory Management',
    description: 'Track and optimize your Amazon inventory levels',
    icon: ShoppingCart,
  },
]

const marketplaces = [
  { name: 'United States', code: 'US', flag: '🇺🇸' },
  { name: 'Canada', code: 'CA', flag: '🇨🇦' },
  { name: 'United Kingdom', code: 'UK', flag: '🇬🇧' },
  { name: 'Germany', code: 'DE', flag: '🇩🇪' },
  { name: 'France', code: 'FR', flag: '🇫🇷' },
  { name: 'Italy', code: 'IT', flag: '🇮🇹' },
  { name: 'Spain', code: 'ES', flag: '🇪🇸' },
  { name: 'Japan', code: 'JP', flag: '🇯🇵' },
]

export default async function HomeClient() {
  await checkSession()

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between py-4">
          <Logo />
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="hidden md:inline-flex">
              Amazon Seller Central Integration
            </Badge>
            <ThemeToggle />
            <Link href="/dashboard">
              <Button>Open Dashboard</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Badge variant="secondary" className="mb-4">
                  Official Amazon Seller Central Integration
                </Badge>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Transform Your Amazon
                  <span className="text-primary"> Seller Data</span>
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Powerful analytics and automation for Amazon sellers. Connect
                  your Seller Central account and unlock insights across all
                  your marketplaces.
                </p>
              </motion.div>
              <motion.div
                className="space-x-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <Link href="/dashboard">
                  <Button size="lg" className="group">
                    Connect Seller Central
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link href="/help">
                  <Button variant="outline" size="lg">
                    View Features
                  </Button>
                </Link>
              </motion.div>
              <motion.div
                className="mt-8 flex flex-wrap justify-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {marketplaces.map(marketplace => (
                  <Badge
                    key={marketplace.code}
                    variant="outline"
                    className="text-sm"
                  >
                    {marketplace.flag} {marketplace.name}
                  </Badge>
                ))}
              </motion.div>
            </div>
          </div>
        </section>
        <section className="w-full bg-muted py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto grid max-w-5xl items-center gap-6 lg:grid-cols-2 lg:gap-12">
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="inline-flex items-center rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/amazon-logo-transparent-9Yx5eHXW3WC77mg5mKcmZg7hmh8mx0.png"
                    alt="Amazon Seller Central Logo"
                    width={80}
                    height={24}
                    className="mr-2 h-4 w-auto"
                    priority
                  />
                  Seller Central Integration
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Your Amazon Business, Simplified
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Connect once, access everything. Our secure integration with
                  Amazon Seller Central brings all your marketplace data into
                  one powerful dashboard.
                </p>
                <div className="grid gap-6 pt-4">
                  {features.map((feature, i) => (
                    <motion.div
                      key={feature.title}
                      className="flex gap-4"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <feature.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-semibold">{feature.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {feature.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              <motion.div
                className="relative flex min-h-[500px] flex-col gap-4 overflow-hidden rounded-xl border bg-card p-6"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                {/* Seller Central Integration Preview */}
                <div className="absolute right-2 top-2 flex items-center gap-2">
                  <Badge
                    variant="secondary"
                    className="bg-green-500/10 text-green-500"
                  >
                    Connected
                  </Badge>
                </div>

                <div className="flex items-center justify-between border-b pb-4">
                  <div className="flex items-center gap-3">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/amazon-logo-transparent-9Yx5eHXW3WC77mg5mKcmZg7hmh8mx0.png"
                      alt="Amazon Logo"
                      width={100}
                      height={30}
                      className="h-8 w-auto"
                    />
                    <Badge>Seller Central</Badge>
                  </div>
                  <Badge variant="outline" className="font-mono">
                    ATVPDKIKX0DER
                  </Badge>
                </div>

                <div className="grid gap-4">
                  <div className="space-y-2">
                    <div className="text-sm font-medium">
                      Connected Marketplaces
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {marketplaces.slice(0, 4).map(marketplace => (
                        <div
                          key={marketplace.code}
                          className="flex items-center gap-2 rounded-lg border bg-card p-2 text-sm"
                        >
                          <span>{marketplace.flag}</span>
                          <span>{marketplace.code}</span>
                          <CheckCircle className="ml-auto h-4 w-4 text-green-500" />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-medium">
                      Latest Sync Status
                    </div>
                    <div className="rounded-lg border bg-card p-4">
                      <div className="flex items-center justify-between text-sm">
                        <span>Inventory Report</span>
                        <Badge
                          variant="secondary"
                          className="bg-green-500/10 text-green-500"
                        >
                          Synced 5m ago
                        </Badge>
                      </div>
                      <div className="mt-2 flex items-center justify-between text-sm">
                        <span>Order History</span>
                        <Badge
                          variant="secondary"
                          className="bg-green-500/10 text-green-500"
                        >
                          Synced 12m ago
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-medium">Today's Overview</div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="rounded-lg border bg-card p-3 text-center">
                        <div className="text-2xl font-bold">127</div>
                        <div className="text-xs text-muted-foreground">
                          Orders
                        </div>
                      </div>
                      <div className="rounded-lg border bg-card p-3 text-center">
                        <div className="text-2xl font-bold">$8.2k</div>
                        <div className="text-xs text-muted-foreground">
                          Revenue
                        </div>
                      </div>
                      <div className="rounded-lg border bg-card p-3 text-center">
                        <div className="text-2xl font-bold text-green-500">
                          ↑ 12%
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Growth
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex items-center gap-2">
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              © {new Date().getFullYear()} Nebula Suite. All rights reserved.
            </p>
            <Badge variant="outline">Amazon Partner</Badge>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/terms"
              className="text-sm text-muted-foreground underline-offset-4 hover:underline"
            >
              Terms
            </Link>
            <Link
              href="/privacy"
              className="text-sm text-muted-foreground underline-offset-4 hover:underline"
            >
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
