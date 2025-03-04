import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { InfoIcon } from 'lucide-react'

export default function APIDocsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold tracking-tight">API Reference</h1>
        <p className="text-xl text-muted-foreground">
          Complete API documentation for integrating with Nebula Suite.
        </p>
      </div>

      <Alert>
        <InfoIcon className="h-4 w-4" />
        <AlertTitle>Authentication Required</AlertTitle>
        <AlertDescription>
          All API endpoints require authentication using your API key. You can
          find your API key in the settings page.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="rest" className="w-full">
        <TabsList>
          <TabsTrigger value="rest">REST API</TabsTrigger>
          <TabsTrigger value="sdk">SDK</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
        </TabsList>

        <TabsContent value="rest" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>REST API Endpoints</CardTitle>
              <CardDescription>
                Available endpoints and their usage.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Data Upload Endpoint */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Upload Data</h3>
                <div className="rounded-md bg-muted p-4">
                  <p className="font-mono text-sm">POST /api/v1/data/upload</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  Upload data files for processing. Supports CSV and Excel
                  formats.
                </p>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Request Headers:</p>
                  <pre className="rounded-md bg-muted p-4">
                    <code className="text-sm">
                      {`Authorization: Bearer YOUR_API_KEY
Content-Type: multipart/form-data`}
                    </code>
                  </pre>
                </div>
              </div>

              {/* Data Export Endpoint */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Export Data</h3>
                <div className="rounded-md bg-muted p-4">
                  <p className="font-mono text-sm">GET /api/v1/data/export</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  Export processed data in various formats.
                </p>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Query Parameters:</p>
                  <pre className="rounded-md bg-muted p-4">
                    <code className="text-sm">
                      {`format: "csv" | "excel" | "json"
dateRange: "YYYY-MM-DD/YYYY-MM-DD" (optional)`}
                    </code>
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sdk" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>SDK Documentation</CardTitle>
              <CardDescription>
                Official SDK libraries and usage examples.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="webhooks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Webhooks</CardTitle>
              <CardDescription>
                Real-time notifications for your application.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
