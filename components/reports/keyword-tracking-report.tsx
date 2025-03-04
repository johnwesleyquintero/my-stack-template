'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useKeywordTracking } from '@/lib/hooks/use-keyword-tracking'
import { Button } from '@/components/ui/button'
import { ArrowUpDown, Download } from 'lucide-react'
import { handleError } from '@/lib/error-handling'
import { generateCSV } from '@/lib/csv-parser'

export function KeywordTrackingReport() {
  const [timeframe, setTimeframe] = useState<'weekly' | 'monthly'>('weekly')
  const [drilldown, setDrilldown] = useState<
    'asin' | 'keyword' | 'brand' | undefined
  >()

  const { data, isLoading } = useKeywordTracking({
    timeframe,
    drilldown,
  })

  const handleExport = async () => {
    try {
      if (!data || data.length === 0) {
        throw new Error('No data available to export')
      }
      // Export data to CSV
      const csvData = data.map(row => ({
        keyword: row.keyword,
        rank: row.rank,
        url: row.url,
        date: row.date,
      }))
      const csvString = await generateCSV(csvData)
      const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = `keyword-tracking-${
        new Date().toISOString().split('T')[0]
      }.csv`
      link.click()
    } catch (error) {
      handleError(error, 'Failed to export data')
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Keyword Performance</CardTitle>
          <div className="flex items-center gap-4">
            <Select
              value={timeframe}
              onValueChange={(value: 'weekly' | 'monthly') =>
                setTimeframe(value)
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekly">Weekly Aggregation</SelectItem>
                <SelectItem value="monthly">Monthly Aggregation</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={drilldown || ''}
              onValueChange={(value: 'asin' | 'keyword' | 'brand' | '') =>
                setDrilldown(value || undefined)
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select view" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="noDrilldown">No Drilldown</SelectItem>
                <SelectItem value="asin">By ASIN</SelectItem>
                <SelectItem value="keyword">By Keyword</SelectItem>
                <SelectItem value="brand">By Brand</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={handleExport}>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                {!drilldown && <TableHead>ASIN</TableHead>}
                {!drilldown && <TableHead>Brand</TableHead>}
                <TableHead>
                  {drilldown ? drilldown.toUpperCase() : 'Keyword'}
                </TableHead>
                <TableHead>
                  <div className="flex items-center gap-2">
                    Organic Rank
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <ArrowUpDown className="h-4 w-4" />
                    </Button>
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center gap-2">
                    Sponsored Rank
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <ArrowUpDown className="h-4 w-4" />
                    </Button>
                  </div>
                </TableHead>
                {drilldown && (
                  <TableHead>
                    <div className="flex items-center gap-2">
                      Count
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <ArrowUpDown className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : (
                data?.map((item: any) => (
                  <TableRow key={item.id || item[drilldown || 'id']}>
                    {!drilldown && <TableCell>{item.asin}</TableCell>}
                    {!drilldown && <TableCell>{item.brand}</TableCell>}
                    <TableCell>{item[drilldown || 'keyword']}</TableCell>
                    <TableCell>
                      {drilldown
                        ? item.avgOrganicRank.toFixed(1)
                        : item.organicRank}
                    </TableCell>
                    <TableCell>
                      {drilldown
                        ? item.avgSponsoredRank.toFixed(1)
                        : item.sponsoredRank || 'N/A'}
                    </TableCell>
                    {drilldown && <TableCell>{item.count}</TableCell>}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
