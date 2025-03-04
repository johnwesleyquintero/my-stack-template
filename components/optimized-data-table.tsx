'use client'

import { useMemo, useCallback, useState, memo } from 'react'
import { useDataStore } from '@/lib/hooks/use-data-store'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'

interface DataTableProps {
  pageSize?: number
}

const LoadingState = () => <div>Loading...</div>

export function OptimizedDataTable({ pageSize = 10 }: DataTableProps) {
  const { uploadedData, isLoading } = useDataStore()
  const [page, setPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')

  // Memoize filtered data
  const filteredData = useMemo(() => {
    if (!uploadedData?.data) return []

    return uploadedData.data.filter(row =>
      Object.values(row).some(value =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
  }, [uploadedData, searchTerm])

  // Memoize paginated data
  const paginatedData = useMemo(() => {
    const start = (page - 1) * pageSize
    return filteredData.slice(start, start + pageSize)
  }, [filteredData, page, pageSize])

  // Memoize headers
  const headers = useMemo(() => {
    if (!uploadedData?.data?.[0]) return []
    return Object.keys(uploadedData.data[0])
  }, [uploadedData])

  // Memoize handlers
  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term)
    setPage(1) // Reset to first page on search
  }, [])

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage)
  }, [])

  if (isLoading) {
    return <LoadingState />
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <SearchInput value={searchTerm} onChange={handleSearch} />
        {/* Pagination component would go here */}
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            {headers.map(header => (
              <TableHead key={header}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {headers.map(header => (
                <TableCell key={`${rowIndex}-${header}`}>
                  {row[header]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

// Memoized search input component
const SearchInput = memo(function SearchInput({
  value,
  onChange,
}: {
  value: string
  onChange: (value: string) => void
}) {
  return (
    <Input
      type="search"
      placeholder="Search..."
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  )
})
