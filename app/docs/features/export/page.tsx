import type { Metadata } from "next"
import { Card, CardContent } from "@/components/ui/card"
import { Breadcrumbs } from "@/components/breadcrumbs"

export const metadata: Metadata = {
  title: "Export Features | Nebula Suite Documentation",
  description: "Learn about Nebula Suite's powerful export capabilities",
}

export default function ExportFeaturesPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <Breadcrumbs
        items={[
          { title: "Documentation", href: "/docs" },
          { title: "Features", href: "/docs/features" },
          { title: "Export", href: "/docs/features/export" },
        ]}
      />

      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Export Features</h1>

        <Card>
          <CardContent className="p-6 space-y-4">
            <h2 className="text-2xl font-semibold">Export Capabilities</h2>
            <div className="prose max-w-none">
              <h3>Supported Formats</h3>
              <ul>
                <li>CSV Export</li>
                <li>Excel (XLSX) Export</li>
                <li>JSON Data Export</li>
                <li>PDF Reports</li>
              </ul>

              <h3>Export Options</h3>
              <ul>
                <li>Custom Field Selection</li>
                <li>Data Filtering</li>
                <li>Scheduled Exports</li>
                <li>Bulk Export</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

