'use client'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ArrowRight, Check, AlertCircle } from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import { getSecureItemAsync } from '@/lib/secure-storage'
import { useQuery } from '@tanstack/react-query'
import { captureError } from '@/lib/error-logger'
import { ErrorBoundary } from '@/components/error-boundary'
import { useFieldMapping } from '@/lib/hooks/use-field-mapping'
import { type FieldType, fieldValidators } from '@/lib/data-validation'
import { LoadingState } from '@/components/loading-state'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import Link from 'next/link'
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card" //Removed as not used in updated code

export function DataMapper() {
  // Fetch uploaded data from secure storage with proper error handling
  const {
    data: uploadedData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['uploadedData'],
    queryFn: async () => {
      try {
        // First check sessionStorage for quick validation
        const hasData = sessionStorage.getItem('hasUploadedData')
        if (!hasData) {
          return null
        }

        // Get from secure storage using the async version
        const data = await getSecureItemAsync<any>('uploadedData')
        if (!data || !data.data || data.data.length === 0) {
          return null
        }

        return data
      } catch (err) {
        captureError(err instanceof Error ? err : new Error(String(err)))
        throw new Error('Could not retrieve uploaded data')
      }
    },
    retry: 1, // Only retry once
    retryDelay: 1000,
  })

  // Use our custom hook for field mapping
  const {
    mappings,
    validationProgress,
    isValidating,
    isSaving,
    handleMappingChange,
    validateAllMappings,
    resetMappings,
  } = useFieldMapping(uploadedData)

  if (isLoading) {
    return <LoadingState text="Loading your data..." className="p-8" />
  }

  // If no data is available, show a helpful message with actions
  if (!uploadedData || error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>No Data Available</AlertTitle>
        <AlertDescription>
          {error instanceof Error
            ? error.message
            : 'Please upload your data files before proceeding with mapping.'}
          <div className="mt-4">
            <Button asChild>
              <Link href="/upload">Go to Upload</Link>
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    )
  }

  // Check if we have actual data to map
  if (!uploadedData.data || uploadedData.data.length === 0) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Invalid Data</AlertTitle>
        <AlertDescription>
          The uploaded file appears to be empty or invalid. Please upload a
          valid file with data.
          <div className="mt-4">
            <Button asChild variant="outline">
              <Link href="/upload">Return to Upload</Link>
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <ErrorBoundary errorBoundaryName="data-mapper">
      <div className="space-y-6">
        {/* Mapping UI */}
        <div className="space-y-4">
          {Object.keys(uploadedData.data[0]).map(sourceField => (
            <div
              key={sourceField}
              className="grid grid-cols-7 items-center gap-4"
            >
              <div className="col-span-3">
                <div className="rounded-md border p-2">
                  <div className="text-sm font-medium">{sourceField}</div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    Sample: {String(uploadedData.data[0][sourceField])}
                  </div>
                </div>
              </div>

              <div className="col-span-1 flex justify-center">
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </div>

              <div className="col-span-2">
                <Select
                  value={
                    mappings.find(m => m.sourceField === sourceField)
                      ?.targetField
                  }
                  onValueChange={value =>
                    handleMappingChange(sourceField, value as FieldType)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select field" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(fieldValidators).map(field => (
                      <SelectItem key={field} value={field}>
                        {field.charAt(0).toUpperCase() + field.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="col-span-1">
                {mappings.find(m => m.sourceField === sourceField)?.isValid ? (
                  <div className="flex items-center text-green-600">
                    <Check className="mr-1 h-4 w-4" />
                    <span className="text-xs">Valid</span>
                  </div>
                ) : mappings.some(m => m.sourceField === sourceField) ? (
                  <div className="flex items-center text-red-600">
                    <AlertCircle className="mr-1 h-4 w-4" />
                    <span className="text-xs">Invalid</span>
                  </div>
                ) : (
                  <span className="text-xs text-muted-foreground">
                    Not mapped
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Validation Progress */}
        {validationProgress > 0 && validationProgress < 100 && (
          <div className="space-y-2">
            <div className="text-sm">Validating mappings...</div>
            <Progress value={validationProgress} />
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-between space-x-4">
          <Button
            variant="outline"
            onClick={resetMappings}
            disabled={mappings.length === 0 || isValidating}
          >
            Reset Mappings
          </Button>
          <Button
            onClick={validateAllMappings}
            disabled={mappings.length === 0 || isValidating || isSaving}
          >
            {isSaving ? 'Saving...' : 'Validate Mappings'}
          </Button>
        </div>
      </div>
    </ErrorBoundary>
  )
}
