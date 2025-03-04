'use client'

import { useState, useEffect, useMemo } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react'
import { getSecureItemAsync } from '@/lib/secure-storage'
import { captureError } from '@/lib/error-logger'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { withErrorHandling } from '@/lib/error-handling'
import { LoadingState } from '@/components/loading-state'

export function DataTable() {
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [data, setData] = useState<any[] | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const rowsPerPage = 5

  // Load data from secure storage
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true)

        // Get uploaded data using the async version
        const uploadedData = await getSecureItemAsync<any>('uploadedData')

        if (!uploadedData) {
          setError('No data available. Please upload your files first.')
          setIsLoading(false)
          return
        }

        // Get mapping configuration using the async version
        const mappingConfig =
          await getSecureItemAsync<Record<string, string>>('mappingConfig')

        if (!mappingConfig) {
          // If no mapping config, just show the raw data
          setData(uploadedData.data || [])
        } else {
          // Transform data based on mapping
          const transformedData = transformData(uploadedData, mappingConfig)
          setData(transformedData)
        }

        setIsLoading(false)
      } catch (err) {
        captureError(err instanceof Error ? err : new Error(String(err)))
        setError('Failed to load data')
        setIsLoading(false)
      }
    }

    withErrorHandling(loadData, 'Failed to load data')
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

  // Memoized filtered data
  const filteredData = useMemo(() => {
    if (!data) return []

    return data.filter(row =>
      Object.values(row).some(value =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
  }, [data, searchTerm])

  // Calculate pagination
  const totalPages = Math.ceil((filteredData?.length || 0) / rowsPerPage)
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage
    return filteredData.slice(startIndex, startIndex + rowsPerPage)
  }, [filteredData, currentPage])

  // Handle loading state
  if (isLoading) {
    return <LoadingState text="Loading data..." className="py-8" />
  }

  // Handle error state
  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  // Handle empty data
  if (!data || data.length === 0) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>No Data Available</AlertTitle>
        <AlertDescription>
          There is no data available to display. Please upload and map your data
          first.
        </AlertDescription>
      </Alert>
    )
  }

  // Get headers from the first row
  const headers = Object.keys(data[0])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="pl-8"
            value={searchTerm}
            onChange={e => {
              setSearchTerm(e.target.value)
              setCurrentPage(1) // Reset to first page on search
            }}
          />
        </div>
        <div className="text-sm text-muted-foreground">
          Showing{' '}
          {filteredData.length > 0 ? (currentPage - 1) * rowsPerPage + 1 : 0} to{' '}
          {Math.min(currentPage * rowsPerPage, filteredData.length)} of{' '}
          {filteredData.length} entries
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {headers.map((header, index) => (
                <TableHead key={index}>{header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {headers.map((header, cellIndex) => (
                    <TableCell key={cellIndex}>{String(row[header])}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={headers.length}
                  className="py-4 text-center"
                >
                  No data found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Previous
          </Button>

          <div className="text-sm">
            Page {currentPage} of {totalPages}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setCurrentPage(prev => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
