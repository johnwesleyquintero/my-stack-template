'use client'

import { useState, useEffect } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { DataMapper } from '@/components/data-mapper'
import { DataTable } from '@/components/data-table'
import { showToast } from '@/components/toast-utils'
import { captureError } from '@/lib/error-logger'
import { ArrowRight, Save } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'

interface DataMappingTabsProps {
  onComplete?: () => void
}

export function DataMappingTabs({ onComplete }: DataMappingTabsProps) {
  const [activeTab, setActiveTab] = useState('mapping')
  const [isDataMapped, setIsDataMapped] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Check if data is already mapped
  useEffect(() => {
    const checkMappingStatus = async () => {
      try {
        setIsLoading(true)
        const mappingComplete =
          sessionStorage.getItem('mappingComplete') === 'true'
        setIsDataMapped(mappingComplete)

        // If mapping is complete, we can show the preview tab
        if (mappingComplete) {
          setActiveTab('preview')
        }

        setIsLoading(false)
      } catch (err) {
        captureError(err instanceof Error ? err : new Error(String(err)))
        setError('Failed to check mapping status')
        setIsLoading(false)
      }
    }

    checkMappingStatus()
  }, [])

  const handleMappingComplete = async () => {
    try {
      // Mark mapping as complete
      sessionStorage.setItem('mappingComplete', 'true')
      setIsDataMapped(true)

      // Switch to preview tab
      setActiveTab('preview')

      showToast('success', 'Data mapping complete', {
        description:
          'Your data has been mapped successfully. You can now preview the results.',
      })

      // Notify parent component if needed
      if (onComplete) {
        onComplete()
      }
    } catch (err) {
      captureError(err instanceof Error ? err : new Error(String(err)))
      showToast('error', 'Failed to complete mapping', {
        description: 'An error occurred while completing the mapping process.',
      })
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">Loading...</div>
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Mapping & Preview</CardTitle>
        <CardDescription>
          Map your data fields and preview the results before processing
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="mapping">Field Mapping</TabsTrigger>
            <TabsTrigger value="preview" disabled={!isDataMapped}>
              Data Preview
            </TabsTrigger>
          </TabsList>

          <TabsContent value="mapping" className="space-y-4 pt-4">
            <DataMapper />

            <div className="mt-4 flex justify-end">
              <Button onClick={handleMappingComplete}>
                <Save className="mr-2 h-4 w-4" />
                Complete Mapping & Preview
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="preview" className="space-y-4 pt-4">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Mapped Data Preview</AlertTitle>
              <AlertDescription>
                This is a preview of your data after applying the field
                mappings. Verify that the data looks correct before proceeding.
              </AlertDescription>
            </Alert>

            <DataTable />

            <div className="mt-4 flex justify-end">
              <Button
                onClick={() => setActiveTab('mapping')}
                variant="outline"
                className="mr-2"
              >
                Back to Mapping
              </Button>
              <Button onClick={() => (window.location.href = '/export')}>
                Continue to Export
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
