import type { Metadata } from 'next'
import { Card, CardContent } from '@/components/ui/card'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { ClientPageWrapper } from '@/components/ClientPageWrapper'

export const metadata: Metadata = {
  title: 'Getting Started | Nebula Suite Documentation',
  description: 'Get started with Nebula Suite - Your data pipeline solution',
}

export default function GettingStartedPage() {
  return (
    <ClientPageWrapper>
      <div className="container mx-auto space-y-6 py-6">
        <Breadcrumbs
          items={[
            { title: 'Documentation', href: '/docs' },
            { title: 'Getting Started', href: '/docs/getting-started' },
          ]}
        />

        <div className="space-y-6">
          <h1 className="text-3xl font-bold">
            Getting Started with Nebula Suite
          </h1>

          <Card>
            <CardContent className="space-y-4 p-6">
              <h2 className="text-2xl font-semibold">Quick Start Guide</h2>
              <div className="prose max-w-none">
                <h3>1. Sign Up and Login</h3>
                <p>Create your account or login to get started</p>

                <h3>2. Upload Your First File</h3>
                <p>Support for Amazon reports, Helium 10 exports, and more</p>

                <h3>3. Map Your Data</h3>
                <p>Use our intuitive mapping interface or saved templates</p>

                <h3>4. Generate Reports</h3>
                <p>Access insights and analytics from your processed data</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ClientPageWrapper>
  )
}
