import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { AlertCircle } from "lucide-react"
import { DataTable } from "@/components/data-table"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ExportOptions } from "@/components/export-options"
import { ErrorBoundary } from "@/components/error-boundary"

export default function ExportPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4">
        <Breadcrumbs />
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Export Data</h1>
        </div>

        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Export Your Processed Data</AlertTitle>
          <AlertDescription>
            Your data has been processed and is ready for export. Choose from the options below to export your data.
          </AlertDescription>
        </Alert>

        <ErrorBoundary errorBoundaryName="export-page">
          <Card>
            <CardHeader>
              <CardTitle>Export Your Processed Data</CardTitle>
              <CardDescription>
                Export your processed Amazon data to various formats or upload directly to Google Drive.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <DataTable />
              </div>

              <ExportOptions />
            </CardContent>
          </Card>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Export History</CardTitle>
              <CardDescription>Your recent data exports and their destinations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-4 p-4 font-medium border-b">
                  <div>Filename</div>
                  <div>Export Date</div>
                  <div>Destination</div>
                  <div>Actions</div>
                </div>
                <div className="grid grid-cols-4 p-4 items-center">
                  <div className="text-sm">monthly_sales_report.csv</div>
                  <div className="text-sm text-muted-foreground">2 days ago</div>
                  <div className="text-sm">Local Download</div>
                  <div className="flex items-center gap-2">
                    <button className="text-sm text-blue-600 hover:underline">Download Again</button>
                  </div>
                </div>
                <div className="grid grid-cols-4 p-4 items-center border-t">
                  <div className="text-sm">inventory_status.xlsx</div>
                  <div className="text-sm text-muted-foreground">5 days ago</div>
                  <div className="text-sm">Google Drive</div>
                  <div className="flex items-center gap-2">
                    <button className="text-sm text-blue-600 hover:underline">View in Drive</button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </ErrorBoundary>
      </div>
    </DashboardLayout>
  )
}

