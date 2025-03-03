import { BookOpen, FileText, Workflow, Boxes, Upload, Database, Download, Settings } from "lucide-react"
import type { SidebarNavItem } from "@/lib/constants"

export const docsNavigation: SidebarNavItem[] = [
  {
    title: "Introduction",
    href: "/docs",
    icon: "BookOpen",
  },
  {
    title: "Getting Started",
    href: "/docs/getting-started",
    icon: "FileText",
  },
  {
    title: "Architecture",
    href: "/docs/architecture",
    icon: "Workflow",
    items: [
      {
        title: "Overview",
        href: "/docs/architecture/overview",
      },
      {
        title: "Data Pipeline",
        href: "/docs/architecture/data-pipeline",
      },
      {
        title: "Authentication",
        href: "/docs/architecture/authentication",
      },
    ],
  },
  {
    title: "Features",
    href: "/docs/features",
    icon: "Boxes",
    items: [
      {
        title: "Data Upload",
        href: "/docs/features/upload",
      },
      {
        title: "Data Mapping",
        href: "/docs/features/mapping",
      },
      {
        title: "Data Processing",
        href: "/docs/features/processing",
      },
      {
        title: "Export Options",
        href: "/docs/features/export",
      },
    ],
  },
  {
    title: "API Reference",
    href: "/docs/api",
    icon: "FileText",
  },
  {
    title: "Integrations",
    href: "/docs/integrations",
    icon: "Settings",
    items: [
      {
        title: "Amazon Seller Central",
        href: "/docs/integrations/amazon",
      },
      {
        title: "Google Sheets",
        href: "/docs/integrations/google-sheets",
      },
    ],
  },
]

export const iconComponents = {
  BookOpen,
  FileText,
  Workflow,
  Boxes,
  Upload,
  Database,
  Download,
  Settings,
}

