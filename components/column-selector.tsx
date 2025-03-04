'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { TableIcon } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Download, FileSpreadsheet, FileJson } from 'lucide-react'
import Papa from 'papaparse'

// Add export functions
const exportToCSV = (data: any[], columns: string[]) => {
  const filteredData = data.map(row =>
    columns.reduce((obj, col) => ({ ...obj, [col]: row[col] }), {})
  )
  const csv = Papa.unparse(filteredData)
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = `keyword-data-${new Date().toISOString().split('T')[0]}.csv`
  link.click()
}

const exportToJSON = (data: any[], columns: string[]) => {
  const filteredData = data.map(row =>
    columns.reduce((obj, col) => ({ ...obj, [col]: row[col] }), {})
  )
  const blob = new Blob([JSON.stringify(filteredData, null, 2)], {
    type: 'application/json',
  })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = `keyword-data-${new Date().toISOString().split('T')[0]}.json`
  link.click()
}

interface ColumnSelectorProps {
  processedData: any[]
  onColumnsSelected: (columns: string[]) => void
}

export function ColumnSelector({
  processedData,
  onColumnsSelected,
}: ColumnSelectorProps) {
  const [selectedColumns, setSelectedColumns] = useState<string[]>([])

  const { data: columns } = useQuery({
    queryKey: ['columns', processedData],
    queryFn: () => Object.keys(processedData[0] || {}),
    initialData: [],
  })

  const handleColumnToggle = (column: string) => {
    setSelectedColumns(prev =>
      prev.includes(column) ? prev.filter(c => c !== column) : [...prev, column]
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle>Select Columns to Map</CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
              disabled={selectedColumns.length === 0}
            >
              <Download className="h-4 w-4" />
              Export Data
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px]">
            <DropdownMenuItem
              onClick={() => exportToCSV(processedData, selectedColumns)}
              className="flex items-center gap-2"
            >
              <FileSpreadsheet className="h-4 w-4" />
              Export as CSV
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => exportToJSON(processedData, selectedColumns)}
              className="flex items-center gap-2"
            >
              <FileJson className="h-4 w-4" />
              Export as JSON
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent data-has-columns={columns.length > 0}>
        <ScrollArea className="h-[300px] rounded-md border p-4">
          <div className="space-y-4">
            {columns.map(column => (
              <div key={column} className="flex items-center space-x-3">
                <Checkbox
                  id={column}
                  checked={selectedColumns.includes(column)}
                  onCheckedChange={() => handleColumnToggle(column)}
                />
                <label
                  htmlFor={column}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {column}
                </label>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TableIcon className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Preview first 100 rows
            </span>
          </div>
          <Button
            onClick={() => onColumnsSelected(selectedColumns)}
            disabled={selectedColumns.length === 0}
          >
            Continue with Selected Columns
          </Button>
        </div>

        {/* Preview Table for Selected Columns */}
        {selectedColumns.length > 0 && (
          <div className="mt-4 overflow-hidden rounded-md border">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    {selectedColumns.map(column => (
                      <th key={column} className="p-2 text-left font-medium">
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {processedData.slice(0, 3).map((row, i) => (
                    <tr key={i} className="border-b">
                      {selectedColumns.map(column => (
                        <td key={column} className="p-2">
                          {row[column]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
