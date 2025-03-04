'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Database, ArrowRight } from 'lucide-react'
import { setSecureItemAsync } from '@/lib/secure-storage'
import { showToast } from '@/components/toast-utils'
import { captureError } from '@/lib/error-logger'
import { sampleData, generateSampleData } from '@/lib/sample-data'

export function SampleDataSelector() {
  const [dataType, setDataType] = useState<'products' | 'keywords' | 'sales'>(
    'products'
  )
  const [dataSize, setDataSize] = useState<number>(10)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleLoadSampleData = async () => {
    try {
      setIsProcessing(true)

      // Generate sample data based on selected type and size
      const data = generateSampleData(dataType, dataSize)

      // Store the data
      await setSecureItemAsync('uploadedData', { data })

      // Set flags for data availability
      sessionStorage.setItem('hasUploadedData', 'true')

      showToast('success', 'Sample data loaded', {
        description: `${dataSize} ${dataType} records have been loaded and are ready for mapping`,
      })

      // Redirect to mapping page
      window.location.href = '/mapping'
    } catch (error) {
      captureError(error instanceof Error ? error : new Error(String(error)))
      showToast('error', 'Failed to load sample data', {
        description: 'An unexpected error occurred',
      })
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sample Data</CardTitle>
        <CardDescription>
          Use pre-configured sample data to explore Nebula Suite's features
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Data Type</label>
            <Select
              value={dataType}
              onValueChange={value =>
                setDataType(value as 'products' | 'keywords' | 'sales')
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select data type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="products">Product Data</SelectItem>
                <SelectItem value="keywords">Keyword Rankings</SelectItem>
                <SelectItem value="sales">Sales Data</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Number of Records</label>
            <Select
              value={dataSize.toString()}
              onValueChange={value => setDataSize(Number.parseInt(value))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select number of records" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5 records</SelectItem>
                <SelectItem value="10">10 records</SelectItem>
                <SelectItem value="25">25 records</SelectItem>
                <SelectItem value="50">50 records</SelectItem>
                <SelectItem value="100">100 records</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="rounded-md border p-4">
          <h4 className="mb-2 text-sm font-medium">Sample Data Preview</h4>
          <div className="max-h-[200px] overflow-auto rounded-md bg-muted p-3">
            <pre className="text-xs">
              {JSON.stringify(sampleData[dataType].slice(0, 3), null, 2)}
            </pre>
          </div>
        </div>

        <Alert>
          <Database className="h-4 w-4" />
          <AlertTitle>About Sample Data</AlertTitle>
          <AlertDescription>
            Sample data is generated locally and can be used without an internet
            connection. It's perfect for testing and exploring Nebula Suite's
            features without connecting to an API.
          </AlertDescription>
        </Alert>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={handleLoadSampleData} disabled={isProcessing}>
          {isProcessing ? 'Loading...' : 'Load Sample Data'}
          {!isProcessing && <ArrowRight className="ml-2 h-4 w-4" />}
        </Button>
      </CardFooter>
    </Card>
  )
}
