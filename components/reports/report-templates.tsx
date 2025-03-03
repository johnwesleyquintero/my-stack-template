import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart3, Package, Users, Target, KeyRound, ArrowUpDown, Search, Building2 } from "lucide-react"

export function ReportTemplates() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Sales Performance
          </CardTitle>
          <CardDescription>Comprehensive analysis of sales metrics and trends</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Included Metrics:</h4>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              <li>Revenue</li>
              <li>Units Sold</li>
              <li>Conversion Rate</li>
            </ul>
          </div>
          <Button className="w-full mt-4">Generate Report</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Inventory Status
          </CardTitle>
          <CardDescription>Current stock levels and reorder recommendations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Included Metrics:</h4>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              <li>Stock Levels</li>
              <li>Reorder Points</li>
              <li>Stock Value</li>
            </ul>
          </div>
          <Button className="w-full mt-4">Generate Report</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Customer Analysis
          </CardTitle>
          <CardDescription>Customer behavior and satisfaction metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Included Metrics:</h4>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              <li>Reviews</li>
              <li>Ratings</li>
              <li>Return Rate</li>
            </ul>
          </div>
          <Button className="w-full mt-4">Generate Report</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Competitor Analysis
          </CardTitle>
          <CardDescription>Market position and competitor comparison</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Included Metrics:</h4>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              <li>Price Comparison</li>
              <li>Market Share</li>
              <li>Ranking</li>
            </ul>
          </div>
          <Button className="w-full mt-4">Generate Report</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <KeyRound className="h-5 w-5" />
            Keyword Tracker
          </CardTitle>
          <CardDescription>Track keyword performance and rankings over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Included Metrics:</h4>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              <li>Organic Rankings</li>
              <li>Sponsored Rankings</li>
              <li>Weekly/Monthly Trends</li>
            </ul>
            <h4 className="text-sm font-medium mt-4">Drill Down By:</h4>
            <div className="flex gap-2 flex-wrap">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                <Search className="w-3 h-3 mr-1" />
                ASIN
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                <ArrowUpDown className="w-3 h-3 mr-1" />
                Keyword
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                <Building2 className="w-3 h-3 mr-1" />
                Brand
              </span>
            </div>
          </div>
          <Button className="w-full mt-4">Generate Report</Button>
        </CardContent>
      </Card>
    </div>
  )
}

