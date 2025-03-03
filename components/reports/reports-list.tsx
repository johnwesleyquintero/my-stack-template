"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Download, Eye, Trash } from "lucide-react"

interface Report {
  id: string
  name: string
  type: string
  status: "completed" | "processing" | "failed"
  createdAt: string
  size: string
}

const mockReports: Report[] = [
  {
    id: "1",
    name: "Monthly Sales Report",
    type: "Sales Analysis",
    status: "completed",
    createdAt: "2024-02-28",
    size: "2.4 MB",
  },
  {
    id: "2",
    name: "Inventory Status",
    type: "Inventory",
    status: "completed",
    createdAt: "2024-02-27",
    size: "1.8 MB",
  },
  {
    id: "3",
    name: "Performance Metrics",
    type: "Analytics",
    status: "processing",
    createdAt: "2024-02-26",
    size: "3.1 MB",
  },
  {
    id: "4",
    name: "Customer Feedback",
    type: "Customer Analysis",
    status: "failed",
    createdAt: "2024-02-25",
    size: "1.5 MB",
  },
]

export function ReportsList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Generated Reports</CardTitle>
        <CardDescription>View and download your generated reports.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="divide-y rounded-md border">
          {mockReports.map((report) => (
            <div key={report.id} className="flex items-center justify-between p-4">
              <div className="space-y-1">
                <h4 className="font-medium">{report.name}</h4>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{report.type}</span>
                  <span>•</span>
                  <span>{report.createdAt}</span>
                  <span>•</span>
                  <span>{report.size}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant={
                    report.status === "completed"
                      ? "default"
                      : report.status === "processing"
                        ? "secondary"
                        : "destructive"
                  }
                >
                  {report.status}
                </Badge>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Actions</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Trash className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

