export const siteConfig = {
  name: "Nebula Suite",
  description: "Comprehensive analytics and tools for Amazon sellers.",
  url: "https://nebula-suite.vercel.app",
  ogImage: "https://nebula-suite.vercel.app/og.jpg",
  links: {
    twitter: "https://twitter.com/nebulasuite",
    github: "https://github.com/nebula-suite",
  },
}

export type NavItem = {
  title: string
  href: string
  disabled?: boolean
}

export type MainNavItem = NavItem

export type SidebarNavItem = {
  title: string
  disabled?: boolean
  external?: boolean
  icon?: string
} & (
  | {
      href: string
      items?: never
    }
  | {
      href?: string
      items: NavItem[]
    }
)

export type SiteConfig = typeof siteConfig

export type DocsConfig = {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

