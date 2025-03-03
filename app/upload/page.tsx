import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileUploader } from "@/components/file-uploader"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Upload Data",
  description: "Upload your Amazon seller reports to analyze and process your data",
}

export default function UploadPage() {
  return (
    <div className="flex flex-col gap-4">
      <Breadcrumbs />
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Upload Data</h1>
      </div>

      <Alert>
        <InfoIcon className="h-4 w-4" />
        <AlertTitle>Multiple Data Input Options</AlertTitle>
        <AlertDescription>
          Nebula Suite supports various ways to input your data - upload files, enter data manually, or use sample data.
          You can work completely offline with manual entry and sample data options.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Add Your Data</CardTitle>
          <CardDescription>Upload files, enter data manually, or use sample data to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <FileUploader />
        </CardContent>
      </Card>

      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Upload History</CardTitle>
          <CardDescription>Your recent file uploads and their status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="grid grid-cols-5 p-4 font-medium border-b">
              <div>Filename</div>
              <div>Upload Date</div>
              <div>Status</div>
              <div>Type</div>
              <div>Actions</div>
            </div>
            <div className="grid grid-cols-5 p-4 items-center">
              <div className="text-sm">monthly_sales_report.csv</div>
              <div className="text-sm text-muted-foreground">2 days ago</div>
              <div>
                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-100">
                  Processed
                </span>
              </div>
              <div className="text-sm text-muted-foreground">File Upload</div>
              <div className="flex items-center gap-2">
                <button className="text-sm text-blue-600 hover:underline">View</button>
                <button className="text-sm text-blue-600 hover:underline">Delete</button>
              </div>
            </div>
            <div className="grid grid-cols-5 p-4 items-center border-t">
              <div className="text-sm">Manual Entry - Products</div>
              <div className="text-sm text-muted-foreground">5 days ago</div>
              <div>
                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-100">
                  Processed
                </span>
              </div>
              <div className="text-sm text-muted-foreground">Manual Entry</div>
              <div className="flex items-center gap-2">
                <button className="text-sm text-blue-600 hover:underline">View</button>
                <button className="text-sm text-blue-600 hover:underline">Delete</button>
              </div>
            </div>
            <div className="grid grid-cols-5 p-4 items-center border-t">
              <div className="text-sm">Sample Data - Keywords</div>
              <div className="text-sm text-muted-foreground">1 week ago</div>
              <div>
                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-100">
                  Processed
                </span>
              </div>
              <div className="text-sm text-muted-foreground">Sample Data</div>
              <div className="flex items-center gap-2">
                <button className="text-sm text-blue-600 hover:underline">View</button>
                <button className="text-sm text-blue-600 hover:underline">Delete</button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

