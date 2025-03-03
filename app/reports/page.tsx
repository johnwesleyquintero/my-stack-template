import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { ReportsList } from "@/components/reports/reports-list"
import { ReportTemplates } from "@/components/reports/report-templates"
import { Download, Plus } from "lucide-react"

export default function ReportsPage() {
  return (
    <div className="flex flex-col gap-4">
      <Breadcrumbs />
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export All
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Report
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Reports</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <ReportsList />
        </TabsContent>
        <TabsContent value="templates">
          <ReportTemplates />
        </TabsContent>
        <TabsContent value="scheduled">
          <Card>
            <CardHeader>
              <CardTitle>Scheduled Reports</CardTitle>
              <CardDescription>View and manage your scheduled report generation.</CardDescription>
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

