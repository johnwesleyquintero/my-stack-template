import { MetricCard } from "@/components/metric-card"
import { Package, AlertTriangle, TrendingUp, DollarSign } from "lucide-react"

export function ProductMetrics() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <MetricCard title="Total Products" value="1,234" change="+49 from last month" icon={Package} trend="up" />
      <MetricCard title="Out of Stock" value="23" change="+5 from last week" icon={AlertTriangle} trend="up" />
      <MetricCard title="Total Sales" value="$45,231" change="+20.1% from last month" icon={TrendingUp} trend="up" />
      <MetricCard title="Average Price" value="$59.99" change="+$4.50 from last month" icon={DollarSign} trend="up" />
    </div>
  )
}

