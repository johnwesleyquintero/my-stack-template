'use client'

import { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { FileDown, Upload, Copy, AlertCircle } from 'lucide-react'
import { toast } from 'sonner'
import { getSecureItemAsync } from '@/lib/secure-storage'
import { downloadExcel } from '@/lib/file-processor'
import { captureError } from '@/lib/error-logger'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { LoadingState } from '@/components/loading-state'

export function ExportOptions() {
  const [processedData, setProcessedData] = useState<any[] | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true)

        // Check if mapping is complete
        const isMappingComplete =
          sessionStorage.getItem('mappingComplete') === 'true'

        if (!isMappingComplete) {
          setError('Please complete the data mapping step before exporting')
          setIsLoading(false)
          return
        }

        // Get uploaded data using the async version
        const uploadedData = await getSecureItemAsync<any>('uploadedData')

        if (!uploadedData) {
          setError(
            'No data available for export. Please upload and map your data first.'
          )
          setIsLoading(false)
          return
        }

        // Get mapping configuration using the async version
        const mappingConfig =
          await getSecureItemAsync<Record<string, string>>('mappingConfig')

        if (!mappingConfig) {
          setError(
            'No mapping configuration found. Please complete the mapping step.'
          )
          setIsLoading(false)
          return
        }

        // Transform data based on mapping
        const transformedData = transformData(uploadedData, mappingConfig)
        setProcessedData(transformedData)
        setIsLoading(false)
      } catch (err) {
        captureError(err instanceof Error ? err : new Error(String(err)))
        setError('Failed to load processed data')
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  // Transform data based on mapping configuration
  const transformData = (
    uploadedData: any,
    mappingConfig: Record<string, string>
  ) => {
    if (
      !uploadedData ||
      !uploadedData.data ||
      !Array.isArray(uploadedData.data)
    ) {
      return []
    }

    return uploadedData.data.map((row: Record<string, any>) => {
      const transformedRow: Record<string, any> = {}

      // Apply mapping
      Object.entries(mappingConfig).forEach(([sourceField, targetField]) => {
        transformedRow[targetField] = row[sourceField]
      })

      return transformedRow
    })
  }

  const handleCSVDownload = () => {
    if (!processedData) return

    try {
      const csvContent = convertToCSV(processedData)
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute(
        'download',
        `export_${new Date().toISOString().split('T')[0]}.csv`
      )
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      toast.success('CSV downloaded successfully')
    } catch (err) {
      captureError(err instanceof Error ? err : new Error(String(err)))
      toast.error('Failed to download CSV')
    }
  }

  const handleExcelDownload = () => {
    if (!processedData) return

    try {
      downloadExcel(
        processedData,
        `export_${new Date().toISOString().split('T')[0]}.xlsx`
      )
      toast.success('Excel file downloaded successfully')
    } catch (err) {
      captureError(err instanceof Error ? err : new Error(String(err)))
      toast.error('Failed to download Excel file')
    }
  }

  const handleGoogleDriveUpload = () => {
    toast.info('Google Drive integration', {
      description: 'This feature is coming soon',
    })
  }

  const handleCopyAPIKey = () => {
    navigator.clipboard.writeText('demo-api-key-12345')
    toast.success('API key copied to clipboard')
  }

  // Helper function to convert data to CSV
  const convertToCSV = (data: any[]) => {
    if (data.length === 0) return ''

    const headers = Object.keys(data[0])
    const csvRows = []

    // Add headers
    csvRows.push(headers.join(','))

    // Add rows
    for (const row of data) {
      const values = headers.map(header => {
        const value = row[header]
        // Handle values with commas, quotes, etc.
        const escaped = String(value).replace(/"/g, '""')
        return `"${escaped}"`
      })
      csvRows.push(values.join(','))
    }

    return csvRows.join('\n')
  }

  if (isLoading) {
    return (
      <LoadingState text="Loading your processed data..." className="p-4" />
    )
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  if (!processedData || processedData.length === 0) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>No Data Available</AlertTitle>
        <AlertDescription>
          There is no processed data available for export. Please upload and map
          your data first.
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <Tabs defaultValue="csv" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="csv">CSV Export</TabsTrigger>
        <TabsTrigger value="google-drive">Google Drive</TabsTrigger>
        <TabsTrigger value="api">API Access</TabsTrigger>
      </TabsList>
      <TabsContent value="csv" className="pt-4">
        <div className="flex flex-col space-y-4">
          <p className="text-sm text-muted-foreground">
            Export your data as a CSV or Excel file that you can download and
            use in other applications.
          </p>
          <div className="flex items-center gap-4">
            <Button onClick={handleCSVDownload}>
              <FileDown className="mr-2 h-4 w-4" />
              Download CSV
            </Button>
            <Button variant="outline" onClick={handleExcelDownload}>
              <FileDown className="mr-2 h-4 w-4" />
              Download Excel
            </Button>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="google-drive" className="pt-4">
        <div className="flex flex-col space-y-4">
          <p className="text-sm text-muted-foreground">
            Upload your processed data directly to your Google Drive account.
          </p>
          <Button onClick={handleGoogleDriveUpload}>
            <Upload className="mr-2 h-4 w-4" />
            Upload to Google Drive
          </Button>
        </div>
      </TabsContent>
      <TabsContent value="api" className="pt-4">
        <div className="flex flex-col space-y-4">
          <p className="text-sm text-muted-foreground">
            Access your data programmatically through our API.
          </p>
          <div className="overflow-x-auto rounded-md bg-muted p-4 font-mono text-sm">
            <code>
              GET
              https://api.nebulasuite.com/v1/data/export?file=monthly_sales_report
            </code>
          </div>
          <Button variant="outline" onClick={handleCopyAPIKey}>
            <Copy className="mr-2 h-4 w-4" />
            Copy API Key
          </Button>
        </div>
      </TabsContent>
    </Tabs>
  )
}
