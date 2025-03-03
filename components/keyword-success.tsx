"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, TrendingUp, Calendar, Target } from "lucide-react"

export function KeywordSuccessCard() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold">Keyword Monitoring Active</CardTitle>
          <CheckCircle2 className="h-5 w-5 text-green-500" />
        </div>
      </CardHeader>
      <CardContent data-success={true} className="space-y-4">
        <div className="flex items-center justify-between border rounded-lg p-4 bg-muted/50">
          <div className="space-y-1">
            <p className="text-sm font-medium">Weekly Tracking</p>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Updates every Monday</span>
            </div>
          </div>
          <Badge variant="secondary">Active</Badge>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2 rounded-lg border p-3">
            <Target className="h-4 w-4 text-primary" />
            <div>
              <p className="text-sm font-medium">Keywords</p>
              <p className="text-2xl font-bold">24</p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-lg border p-3">
            <TrendingUp className="h-4 w-4 text-primary" />
            <div>
              <p className="text-sm font-medium">Positions</p>
              <p className="text-2xl font-bold">186</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

