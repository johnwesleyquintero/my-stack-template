import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function CardSkeleton() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="h-4 w-24 animate-pulse rounded bg-muted" />
        <div className="h-4 w-4 animate-pulse rounded bg-muted" />
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="h-6 w-32 animate-pulse rounded bg-muted" />
          <div className="h-4 w-16 animate-pulse rounded bg-muted" />
        </div>
      </CardContent>
    </Card>
  )
}

