import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Overview } from "@/components/overview"
import { RecentSales } from "@/components/recent-sales"
import { MetricCard } from "@/components/metric-card"
import { BarChart3, ArrowUpRight, Users, FileSpreadsheet } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Breadcrumbs } from "@/components/breadcrumbs"

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-4">
      <Breadcrumbs />
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              title="Total Revenue"
              value="$45,231.89"
              change="+20.1% from last month"
              icon={BarChart3}
              trend="up"
            />
            <MetricCard
              title="Units Sold"
              value="2,350"
              change="-3.2% from last month"
              icon={FileSpreadsheet}
              trend="down"
            />
            <MetricCard title="Active Products" value="12,234" change="+49 this week" icon={Users} trend="up" />
            <MetricCard
              title="Average Order Value"
              value="$59.99"
              change="+$4.50 from last month"
              icon={ArrowUpRight}
              trend="up"
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Revenue Overview</CardTitle>
                <CardDescription>Monthly revenue breakdown</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <Overview />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Sales</CardTitle>
                <CardDescription>Latest transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentSales />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Custom Reports</CardTitle>
              <CardDescription>Generate custom reports based on your data</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="insights" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI-Powered Insights</CardTitle>
              <CardDescription>Get intelligent insights about your business</CardDescription>
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

