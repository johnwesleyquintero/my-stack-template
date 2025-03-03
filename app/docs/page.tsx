import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon } from "lucide-react"
import { MermaidDiagram } from "@/components/mermaid-diagram"
import { architectureDiagrams, diagramTitles } from "@/lib/docs/diagrams"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DocsPage() {
  return (
    <div className="flex flex-col gap-8">
      {/* Header Section */}
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold tracking-tight">Documentation</h1>
        <p className="text-xl text-muted-foreground">
          Learn how to use Nebula Suite to process and analyze your Amazon seller data.
        </p>
      </div>

      {/* Quick Overview Alert */}
      <Alert>
        <InfoIcon className="h-4 w-4" />
        <AlertTitle>Getting Started</AlertTitle>
        <AlertDescription>
          Nebula Suite helps you process Amazon seller data through a streamlined pipeline. Upload your data, map
          fields, and export processed results.
        </AlertDescription>
      </Alert>

      {/* Supported Data Sources */}
      <Card>
        <CardHeader>
          <CardTitle>Supported Data Sources</CardTitle>
          <CardDescription>We support multiple data sources with custom field mapping</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Amazon Seller Central Reports</h3>
            <p className="text-sm text-muted-foreground mb-4">Direct import support for all Amazon report types:</p>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2">
              <li>Business Reports</li>
              <li>Inventory Reports</li>
              <li>Sales Reports</li>
              <li>Performance Reports</li>
              <li>Advertising Reports</li>
              <li>Customer Service Reports</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Third-Party Tools Integration</h3>
            <p className="text-sm text-muted-foreground mb-4">Support for popular Amazon seller tools:</p>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2">
              <li>Helium 10 exports</li>
              <li>Jungle Scout data</li>
              <li>Sellics reports</li>
              <li>Viral Launch analytics</li>
              <li>AMZScout exports</li>
              <li>Other tool exports (through custom mapping)</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Custom Template System</h3>
            <p className="text-sm text-muted-foreground mb-4">Save and reuse your field mappings:</p>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2">
              <li>Save custom field mappings as templates</li>
              <li>Share templates across your organization</li>
              <li>Auto-detection of known formats</li>
              <li>Version control for templates</li>
              <li>Import/Export template configurations</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Architecture Overview */}
      <Card>
        <CardHeader>
          <CardTitle>System Architecture</CardTitle>
          <CardDescription>Understanding how Nebula Suite is built and organized</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="dataPipeline" className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-3">
              <TabsTrigger value="dataPipeline">Data Pipeline</TabsTrigger>
              <TabsTrigger value="serverClient">Server/Client</TabsTrigger>
              <TabsTrigger value="dataFetching">Data Fetching</TabsTrigger>
              <TabsTrigger value="authentication">Authentication</TabsTrigger>
              <TabsTrigger value="codeOrganization">Organization</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
            </TabsList>

            {Object.entries(architectureDiagrams).map(([key, diagram]) => (
              <TabsContent key={key} value={key} className="pt-4">
                <div className="rounded-lg border bg-card p-6">
                  <h3 className="mb-4 text-lg font-medium">{diagramTitles[key as keyof typeof diagramTitles]}</h3>
                  <MermaidDiagram chart={diagram} />
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* Data Mapping Guide */}
      <Card>
        <CardHeader>
          <CardTitle>Data Mapping Guide</CardTitle>
          <CardDescription>Learn how to map your data and save templates</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Field Mapping Process</h3>
            <p className="text-sm text-muted-foreground mb-4">Step-by-step guide to mapping your data:</p>
            <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-2">
              <li>Upload your data file from any supported source</li>
              <li>Review automatically detected fields</li>
              <li>Map remaining fields manually or select a saved template</li>
              <li>Preview the mapped data</li>
              <li>Save your mapping as a template (optional)</li>
              <li>Process your data</li>
            </ol>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Template Management</h3>
            <p className="text-sm text-muted-foreground mb-4">How to work with mapping templates:</p>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2">
              <li>Create templates for different data sources</li>
              <li>Share templates with team members</li>
              <li>Update existing templates</li>
              <li>Export templates for backup</li>
              <li>Import templates from other users</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Feature Documentation */}
      <Card>
        <CardHeader>
          <CardTitle>Features</CardTitle>
          <CardDescription>Detailed documentation of Nebula Suite's core features</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Data Upload</h3>
            <p className="text-sm text-muted-foreground mb-4">Upload your data through various methods:</p>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2">
              <li>Direct file upload (CSV, Excel)</li>
              <li>Google Sheets integration</li>
              <li>Amazon API connection</li>
              <li>Third-party tool exports</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Data Mapping</h3>
            <p className="text-sm text-muted-foreground mb-4">Map your data fields to our standardized format:</p>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2">
              <li>Interactive field mapping interface</li>
              <li>Automatic field detection</li>
              <li>Mapping templates</li>
              <li>Custom field mapping</li>
              <li>Template sharing and management</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Data Processing</h3>
            <p className="text-sm text-muted-foreground mb-4">Process and transform your data:</p>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2">
              <li>Automated data validation</li>
              <li>Format standardization</li>
              <li>Error handling and reporting</li>
              <li>Batch processing capabilities</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Export Options</h3>
            <p className="text-sm text-muted-foreground mb-4">Export your processed data in various formats:</p>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2">
              <li>CSV export</li>
              <li>Excel export</li>
              <li>Direct to Google Drive</li>
              <li>API access</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

