import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  BarChart3,
  Package,
  Users,
  Target,
  KeyRound,
  ArrowUpDown,
  Search,
  Building2,
} from 'lucide-react'

export function ReportTemplates() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Sales Performance
          </CardTitle>
          <CardDescription>
            Comprehensive analysis of sales metrics and trends
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Included Metrics:</h4>
            <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
              <li>Revenue</li>
              <li>Units Sold</li>
              <li>Conversion Rate</li>
            </ul>
          </div>
          <Button className="mt-4 w-full">Generate Report</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Inventory Status
          </CardTitle>
          <CardDescription>
            Current stock levels and reorder recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Included Metrics:</h4>
            <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
              <li>Stock Levels</li>
              <li>Reorder Points</li>
              <li>Stock Value</li>
            </ul>
          </div>
          <Button className="mt-4 w-full">Generate Report</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Customer Analysis
          </CardTitle>
          <CardDescription>
            Customer behavior and satisfaction metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Included Metrics:</h4>
            <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
              <li>Reviews</li>
              <li>Ratings</li>
              <li>Return Rate</li>
            </ul>
          </div>
          <Button className="mt-4 w-full">Generate Report</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Competitor Analysis
          </CardTitle>
          <CardDescription>
            Market position and competitor comparison
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Included Metrics:</h4>
            <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
              <li>Price Comparison</li>
              <li>Market Share</li>
              <li>Ranking</li>
            </ul>
          </div>
          <Button className="mt-4 w-full">Generate Report</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <KeyRound className="h-5 w-5" />
            Keyword Tracker
          </CardTitle>
          <CardDescription>
            Track keyword performance and rankings over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Included Metrics:</h4>
            <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
              <li>Organic Rankings</li>
              <li>Sponsored Rankings</li>
              <li>Weekly/Monthly Trends</li>
            </ul>
            <h4 className="mt-4 text-sm font-medium">Drill Down By:</h4>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                <Search className="mr-1 h-3 w-3" />
                ASIN
              </span>
              <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                <ArrowUpDown className="mr-1 h-3 w-3" />
                Keyword
              </span>
              <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                <Building2 className="mr-1 h-3 w-3" />
                Brand
              </span>
            </div>
          </div>
          <Button className="mt-4 w-full">Generate Report</Button>
        </CardContent>
      </Card>
    </div>
  )
}
