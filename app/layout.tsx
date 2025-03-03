import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { ErrorBoundaryWrapper } from "@/components/error-boundary-wrapper";
import { EnvironmentIndicator } from "@/components/environment-indicator";
import { Analytics } from "@/components/analytics";
import { cn } from "@/lib/utils";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Next Nebula Starter",
    template: "%s | Next Nebula Starter",
  },
  description:
    "A modern Next.js starter template with Supabase Auth and shadcn/ui",
  keywords: [
    "Next.js",
    "React",
    "Tailwind CSS",
    "Server Components",
    "Supabase",
  ],
  authors: [
    {
      name: "Next Nebula Team",
      url: "https://github.com/johnwesleyquintero/next-nebula-starter",
    },
  ],
  creator: "Next Nebula Team",
  generator: "v0.dev",
  metadataBase: new URL("https://next-nebula-starter.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://next-nebula-starter.vercel.app",
    title: "Next Nebula Starter",
    description:
      "A modern Next.js starter template with Supabase Auth and shadcn/ui",
    siteName: "Next Nebula Starter",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Next Nebula Starter Template",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Next Nebula Starter",
    description:
      "A modern Next.js starter template with Supabase Auth and shadcn/ui",
    creator: "@johnwesleyquintero",
    images: ["/twitter-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  alternates: {
    canonical: "https://next-nebula-starter.vercel.app",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="h-full scroll-smooth antialiased"
    >
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
        <meta name="theme-color" content="#000000" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className={cn(inter.className, "min-h-screen bg-background")}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ErrorBoundaryWrapper>{children}</ErrorBoundaryWrapper>
          <EnvironmentIndicator />
          <Toaster />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
