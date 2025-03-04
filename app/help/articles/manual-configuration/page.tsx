import type { Metadata } from 'next'
import { Card, CardContent } from '@/components/ui/card'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { InfoIcon } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Manual Configuration Guide | Nebula Suite Help',
  description:
    'Learn how to use Nebula Suite without connecting to external APIs',
}

export default function ManualConfigurationGuidePage() {
  return (
    <div className="container mx-auto space-y-6 py-6">
      <Breadcrumbs
        items={[
          { title: 'Help', href: '/help' },
          { title: 'Articles', href: '/help/articles' },
          {
            title: 'Manual Configuration',
            href: '/help/articles/manual-configuration',
          },
        ]}
      />

      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Manual Configuration Guide</h1>

        <Alert>
          <InfoIcon className="h-4 w-4" />
          <AlertTitle>Working Offline</AlertTitle>
          <AlertDescription>
            Nebula Suite can be used completely offline with manual data entry
            and sample data options. No API connection is required for these
            features.
          </AlertDescription>
        </Alert>

        <Card>
          <CardContent className="space-y-4 p-6">
            <h2 className="text-2xl font-semibold">Manual Data Entry</h2>
            <div className="prose max-w-none">
              <p>
                Nebula Suite provides multiple ways to work with your data
                without connecting to external APIs. This guide explains how to
                use the manual configuration options.
              </p>

              <h3>JSON Data Entry</h3>
              <p>
                The JSON editor allows you to paste or type JSON data directly.
                This is useful when you have data from another source or want to
                create custom datasets.
              </p>
              <ul>
                <li>Navigate to the Upload page</li>
                <li>Select the "Manual Entry" tab</li>
                <li>Choose "JSON Format"</li>
                <li>Enter your data as a JSON array of objects</li>
                <li>Click "Process Data" to continue</li>
              </ul>

              <h3>CSV Data Entry</h3>
              <p>
                The CSV editor allows you to paste or type CSV data directly.
                This is useful for spreadsheet data or when working with
                comma-separated values.
              </p>
              <ul>
                <li>Navigate to the Upload page</li>
                <li>Select the "Manual Entry" tab</li>
                <li>Choose "CSV Format"</li>
                <li>Enter your data with headers in the first row</li>
                <li>Click "Process Data" to continue</li>
              </ul>

              <h3>Sample Data</h3>
              <p>
                Nebula Suite includes pre-configured sample datasets that you
                can use to explore the platform's features without uploading
                your own data.
              </p>
              <ul>
                <li>Navigate to the Upload page</li>
                <li>Select the "Sample Data" tab</li>
                <li>Choose the data type (Products, Keywords, Sales)</li>
                <li>Select the number of records</li>
                <li>Click "Load Sample Data" to continue</li>
              </ul>

              <h3>Offline Mode</h3>
              <p>
                Offline mode allows you to process files locally without
                uploading them to our servers. This is useful when working
                without an internet connection or when dealing with sensitive
                data.
              </p>
              <ul>
                <li>Navigate to the Upload page</li>
                <li>
                  Click the "Online Mode" button to toggle to "Offline Mode"
                </li>
                <li>Upload your files as usual</li>
                <li>Files will be processed locally in your browser</li>
              </ul>

              <h3>Data Templates</h3>
              <p>
                Nebula Suite provides templates for common data structures. You
                can download these templates, fill them with your data, and then
                upload or paste them back into the system.
              </p>
              <ul>
                <li>Navigate to the Upload page</li>
                <li>Select either "Manual Entry" or "Sample Data" tab</li>
                <li>Click "Download Template" to get a template file</li>
                <li>Fill the template with your data</li>
                <li>Upload or paste the data back into Nebula Suite</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
