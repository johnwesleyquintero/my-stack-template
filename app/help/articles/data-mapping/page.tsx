import type { Metadata } from 'next'
import { Card, CardContent } from '@/components/ui/card'
import { Breadcrumbs } from '@/components/breadcrumbs'

export const metadata: Metadata = {
  title: 'Data Mapping Guide | Nebula Suite Help',
  description: 'Learn how to map your data effectively in Nebula Suite',
}

export default function DataMappingGuidePage() {
  return (
    <div className="container mx-auto space-y-6 py-6">
      <Breadcrumbs
        items={[
          { title: 'Help', href: '/help' },
          { title: 'Articles', href: '/help/articles' },
          { title: 'Data Mapping', href: '/help/articles/data-mapping' },
        ]}
      />

      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Data Mapping Guide</h1>

        <Card>
          <CardContent className="space-y-4 p-6">
            <h2 className="text-2xl font-semibold">
              Understanding Data Mapping
            </h2>
            <div className="prose max-w-none">
              <h3>Supported Data Sources</h3>
              <ul>
                <li>Amazon Seller Central Reports</li>
                <li>Helium 10 Exports</li>
                <li>Custom Data Sources</li>
              </ul>

              <h3>Template Management</h3>
              <ul>
                <li>Save Custom Templates</li>
                <li>Share Templates</li>
                <li>Version Control</li>
              </ul>

              <h3>Best Practices</h3>
              <p>Guidelines for effective data mapping and organization</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
