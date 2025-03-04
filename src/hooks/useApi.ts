import { useState, useEffect } from 'react'
import { fetchApi } from '@/lib/api'
import type { ApiResponse } from '@/types'

export function useApi<T>(endpoint: string, options?: RequestInit) {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchApi<T>(endpoint, options)
        setData(response.data)
        setError(response.error)
      } catch (err) {
        setError((err as Error).message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [endpoint])

  return { data, error, loading }
}
