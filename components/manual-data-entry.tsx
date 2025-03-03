"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, FileText, Table, Download } from "lucide-react"
import { setSecureItemAsync } from "@/lib/secure-storage"
import { showToast } from "@/components/toast-utils"
import { captureError } from "@/lib/error-logger"
import { sampleData } from "@/lib/sample-data"

export function ManualDataEntry() {
  const [jsonData, setJsonData] = useState("")
  const [csvData, setCsvData] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [activeTab, setActiveTab] = useState<"json" | "csv">("json")

  const handleJsonSampleLoad = () => {
    setJsonData(JSON.stringify(sampleData.products, null, 2))
  }

  const handleCsvSampleLoad = () => {
    // Convert sample data to CSV format
    const headers = Object.keys(sampleData.products[0]).join(",")
    const rows = sampleData.products.map((product) =>
      Object.values(product)
        .map((value) => (typeof value === "string" && value.includes(",") ? `"${value}"` : value))
        .join(","),
    )
    setCsvData([headers, ...rows].join("\n"))
  }

  const processData = async () => {
    try {
      setIsProcessing(true)

      let parsedData

      if (activeTab === "json") {
        if (!jsonData.trim()) {
          showToast("error", "Please enter JSON data")
          return
        }

        try {
          parsedData = JSON.parse(jsonData)
          if (!Array.isArray(parsedData)) {
            parsedData = [parsedData] // Convert single object to array
          }
        } catch (error) {
          showToast("error", "Invalid JSON format", {
            description: "Please check your JSON syntax and try again",
          })
          return
        }
      } else {
        if (!csvData.trim()) {
          showToast("error", "Please enter CSV data")
          return
        }

        try {
          // Simple CSV parsing (for more complex needs, use a library like PapaParse)
          const lines = csvData.split("\n").filter((line) => line.trim())
          const headers = lines[0].split(",").map((h) => h.trim())

          parsedData = lines.slice(1).map((line) => {
            const values = line.split(",").map((v) => v.trim())
            return headers.reduce(
              (obj, header, index) => {
                obj[header] = values[index] || ""
                return obj
              },
              {} as Record<string, string>,
            )
          })
        } catch (error) {
          showToast("error", "Invalid CSV format", {
            description: "Please check your CSV format and try again",
          })
          return
        }
      }

      // Store the parsed data
      await setSecureItemAsync("uploadedData", { data: parsedData })

      // Set flags for data availability
      sessionStorage.setItem("hasUploadedData", "true")

      showToast("success", "Data processed successfully", {
        description: "Your data is ready for mapping",
      })

      // Redirect to mapping page
      window.location.href = "/mapping"
    } catch (error) {
      captureError(error instanceof Error ? error : new Error(String(error)))
      showToast("error", "Failed to process data", {
        description: "An unexpected error occurred",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const downloadSampleData = (type: "json" | "csv") => {
    try {
      let content: string
      let filename: string
      let mimeType: string

      if (type === "json") {
        content = JSON.stringify(sampleData.products, null, 2)
        filename = "sample-data.json"
        mimeType = "application/json"
      } else {
        const headers = Object.keys(sampleData.products[0]).join(",")
        const rows = sampleData.products.map((product) =>
          Object.values(product)
            .map((value) => (typeof value === "string" && value.includes(",") ? `"${value}"` : value))
            .join(","),
        )
        content = [headers, ...rows].join("\n")
        filename = "sample-data.csv"
        mimeType = "text/csv"
      }

      const blob = new Blob([content], { type: mimeType })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      showToast("success", `Sample ${type.toUpperCase()} downloaded`)
    } catch (error) {
      captureError(error instanceof Error ? error : new Error(String(error)))
      showToast("error", "Failed to download sample data")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manual Data Entry</CardTitle>
        <CardDescription>Enter your data manually or paste from another source</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "json" | "csv")}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="json">JSON Format</TabsTrigger>
            <TabsTrigger value="csv">CSV Format</TabsTrigger>
          </TabsList>

          <TabsContent value="json" className="space-y-4 pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Enter JSON array or object</span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleJsonSampleLoad}>
                  Load Sample
                </Button>
                <Button variant="outline" size="sm" onClick={() => downloadSampleData("json")}>
                  <Download className="h-4 w-4 mr-2" />
                  Download Template
                </Button>
              </div>
            </div>

            <Textarea
              placeholder='[{"id": "1", "name": "Product 1", "price": 19.99}, {"id": "2", "name": "Product 2", "price": 29.99}]'
              className="min-h-[300px] font-mono text-sm"
              value={jsonData}
              onChange={(e) => setJsonData(e.target.value)}
            />

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>JSON Format Tips</AlertTitle>
              <AlertDescription>
                <ul className="list-disc list-inside text-sm">
                  <li>Use an array of objects with consistent properties</li>
                  <li>Ensure all property names are in quotes</li>
                  <li>Validate your JSON with a tool like JSONLint if you encounter errors</li>
                </ul>
              </AlertDescription>
            </Alert>
          </TabsContent>

          <TabsContent value="csv" className="space-y-4 pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Table className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Enter CSV data with headers in the first row</span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleCsvSampleLoad}>
                  Load Sample
                </Button>
                <Button variant="outline" size="sm" onClick={() => downloadSampleData("csv")}>
                  <Download className="h-4 w-4 mr-2" />
                  Download Template
                </Button>
              </div>
            </div>

            <Textarea
              placeholder="id,name,price,category,stock
1,Product 1,19.99,Electronics,100
2,Product 2,29.99,Clothing,50"
              className="min-h-[300px] font-mono text-sm"
              value={csvData}
              onChange={(e) => setCsvData(e.target.value)}
            />

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>CSV Format Tips</AlertTitle>
              <AlertDescription>
                <ul className="list-disc list-inside text-sm">
                  <li>First row must contain column headers</li>
                  <li>Use commas to separate values</li>
                  <li>Enclose values with commas in double quotes</li>
                  <li>Each row should have the same number of columns</li>
                </ul>
              </AlertDescription>
            </Alert>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={processData} disabled={isProcessing}>
          {isProcessing ? "Processing..." : "Process Data"}
        </Button>
      </CardFooter>
    </Card>
  )
}

