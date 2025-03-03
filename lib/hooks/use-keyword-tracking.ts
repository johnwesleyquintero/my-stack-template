import { useQuery } from "@tanstack/react-query"

interface KeywordRanking {
  id: string
  asin: string
  keyword: string
  brand: string
  organicRank: number
  sponsoredRank: number | null
  timestamp: string
}

interface KeywordTrackingParams {
  timeframe: "weekly" | "monthly"
  drilldown?: "asin" | "keyword" | "brand"
  filter?: {
    asin?: string
    keyword?: string
    brand?: string
  }
}

export function useKeywordTracking({ timeframe, drilldown, filter }: KeywordTrackingParams) {
  return useQuery({
    queryKey: ["keyword-tracking", timeframe, drilldown, filter],
    queryFn: async () => {
      // In a real implementation, this would fetch from your API
      // For now, we'll return mock data
      const mockData: KeywordRanking[] = [
        {
          id: "1",
          asin: "B08N5KWB9H",
          keyword: "wireless earbuds",
          brand: "TechBrand",
          organicRank: 5,
          sponsoredRank: 2,
          timestamp: "2024-02-28T00:00:00Z",
        },
        // Add more mock data as needed
      ]

      // Process data based on timeframe and drilldown
      const processedData = mockData.filter((item) => {
        if (filter?.asin && item.asin !== filter.asin) return false
        if (filter?.keyword && item.keyword !== filter.keyword) return false
        if (filter?.brand && item.brand !== filter.brand) return false
        return true
      })

      // Group and aggregate data based on drilldown
      if (drilldown) {
        const groupedData = processedData.reduce(
          (acc, item) => {
            const key = item[drilldown]
            if (!acc[key]) {
              acc[key] = {
                [drilldown]: key,
                avgOrganicRank: 0,
                avgSponsoredRank: 0,
                count: 0,
              }
            }
            acc[key].count++
            acc[key].avgOrganicRank += item.organicRank
            if (item.sponsoredRank) {
              acc[key].avgSponsoredRank += item.sponsoredRank
            }
            return acc
          },
          {} as Record<string, any>,
        )

        // Calculate averages
        Object.values(groupedData).forEach((group) => {
          group.avgOrganicRank = group.avgOrganicRank / group.count
          group.avgSponsoredRank = group.avgSponsoredRank / group.count
        })

        return Object.values(groupedData)
      }

      return processedData
    },
    staleTime: 5 * 60 * 1000, // Consider data stale after 5 minutes
  })
}

