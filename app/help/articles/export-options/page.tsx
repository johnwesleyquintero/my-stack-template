import type { Metadata } from 'next'
import { Card, CardContent } from '@/components/ui/card'
import { Breadcrumbs } from '@/components/breadcrumbs'

export const metadata: Metadata = {
  title: 'Export Options | Nebula Suite Help',
  description: 'Learn about different export options in Nebula Suite',
}

export default function ExportOptionsPage() {
  return (
    <div className="container mx-auto space-y-6 py-6">
      <Breadcrumbs
        items={[
          { title: 'Help', href: '/help' },
          { title: 'Articles', href: '/help/articles' },
          { title: 'Export Options', href: '/help/articles/export-options' },
        ]}
      />

      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Export Options Guide</h1>

        <Card>
          <CardContent className="space-y-4 p-6">
            <h2 className="text-2xl font-semibold">Available Export Options</h2>
            <div className="prose max-w-none">
              <h3>File Formats</h3>
              <ul>
                <li>CSV (Comma Separated Values)</li>
                <li>XLSX (Excel Workbook)</li>
                <li>PDF Reports</li>
                <li>JSON Data</li>
              </ul>

              <h3>Export Settings</h3>
              <ul>
                <li>Field Selection</li>
                <li>Data Filtering</li>
                <li>Scheduled Exports</li>
                <li>Bulk Operations</li>
              </ul>

              <h3>Advanced Features</h3>
              <ul>
                <li>Custom Templates</li>
                <li>Automated Exports</li>
                <li>Export History</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
