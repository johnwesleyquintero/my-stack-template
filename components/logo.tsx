"use client"

import Image from "next/image"
import Link from "next/link"
import { useTheme } from "next-themes"

export function Logo({ className }: { className?: string }) {
  const { theme, resolvedTheme } = useTheme()

  // Determine if we should show the dark version of the logo
  const isDark = theme === "dark" || resolvedTheme === "dark"

  return (
    <Link href="/" className={`flex items-center space-x-2 ${className}`}>
      <Image
        src={
          isDark
            ? "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/favicon-32x32-RCq5eHXW3WC77mg5mKcmZg7hmh8mx0.png"
            : "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/favicon-32x32-RCq5eHXW3WC77mg5mKcmZg7hmh8mx0.png"
        }
        alt="Nebula Suite Logo"
        width={32}
        height={32}
        className="h-8 w-auto"
      />
      <span className="font-bold text-xl">Nebula Suite</span>
    </Link>
  )
}

