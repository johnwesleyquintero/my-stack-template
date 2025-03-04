'use client'

import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface DataPreviewProps {
  data: string
  type: string
}

export function DataPreview({ data, type }: DataPreviewProps) {
  const [previewData, setPreviewData] = useState<string[][]>([])

  // Simple CSV parser
  const parseCSV = (csv: string) => {
    const rows = csv.split('\n')
    return rows.map(row => row.split(',').map(cell => cell.trim()))
  }

  // Parse data based on type
  const parseData = () => {
    if (type === 'csv') {
      return parseCSV(data)
    }
    try {
      return JSON.parse(data)
    } catch {
      return []
    }
  }

  const displayData = parseData()
  const headers =
    Array.isArray(displayData) && displayData.length > 0
      ? Object.keys(displayData[0])
      : []

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {headers.map((header, i) => (
              <TableHead key={i}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.isArray(displayData) &&
            displayData.slice(0, 5).map((row, i) => (
              <TableRow key={i}>
                {headers.map((header, j) => (
                  <TableCell key={j}>
                    {typeof row[header] === 'object'
                      ? JSON.stringify(row[header])
                      : row[header]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  )
}
