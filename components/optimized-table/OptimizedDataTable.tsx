"use client"

import { useMemo, useCallback, memo } from "react"
import { useVirtualizer } from "@tanstack/react-virtual"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useOptimizedData } from "@/lib/hooks/use-optimized-data"
import { LoadingState } from "@/components/loading-state"

interface OptimizedDataTableProps {
  pageSize?: number
  rowHeight?: number
}

/**
 * Optimized data table component with virtualization
 */
export const OptimizedDataTable = memo(function OptimizedDataTable({
  pageSize = 50,
  rowHeight = 35,
}: OptimizedDataTableProps) {
  const { uploadedData, isLoadingData } = useOptimizedData()

  // Memoize table data
  const tableData = useMemo(() => {
    if (!uploadedData?.data) return []
    return uploadedData.data
  }, [uploadedData])

  // Memoize headers
  const headers = useMemo(() => {
    if (tableData.length === 0) return []
    return Object.keys(tableData[0])
  }, [tableData])

  // Virtual rows for performance
  const parentRef = useCallback((node: HTMLDivElement) => {
    if (node !== null) {
      virtualizer.scrollToIndex(0)
    }
  }, [])

  const virtualizer = useVirtualizer({
    count: tableData.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => rowHeight,
    overscan: 5,
  })

  if (isLoadingData) {
    return <LoadingState />
  }

  return (
    <div ref={parentRef} className="h-[600px] overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            {headers.map((header) => (
              <TableHead key={header}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {virtualizer.getVirtualItems().map((virtualRow) => (
            <TableRow
              key={virtualRow.key}
              data-index={virtualRow.index}
              style={{
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              {headers.map((header) => (
                <TableCell key={`${virtualRow.index}-${header}`}>{tableData[virtualRow.index][header]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
})

/**
 * Memoized table cell component
 */
const MemoizedTableCell = memo(function MemoizedTableCell({
  value,
}: {
  value: string | number
}) {
  return <TableCell>{value}</TableCell>
})

