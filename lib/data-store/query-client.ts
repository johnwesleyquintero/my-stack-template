import { QueryClient } from '@tanstack/react-query'
import { showToast } from '@/components/toast-utils'
import { getUploadedData, getMappings } from './data-fetcher' // Import the missing functions

/**
 * Centralized query client configuration
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: (failureCount, error) => {
        // Only retry network errors, up to 3 times
        if (error instanceof Error && error.message.includes('network')) {
          return failureCount < 3
        }
        return false
      },
      refetchOnWindowFocus: false,
    },
    mutations: {
      onError: error => {
        showToast('error', 'Operation failed', {
          description:
            error instanceof Error ? error.message : 'Please try again',
        })
      },
    },
  },
})

// Define query keys as constants
export const QUERY_KEYS = {
  uploadedData: 'uploadedData',
  processedData: 'processedData',
  mappings: 'mappings',
  validationResults: 'validationResults',
} as const

// Prefetch important queries
export async function prefetchQueries() {
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: [QUERY_KEYS.uploadedData],
      queryFn: () => getUploadedData(),
    }),
    queryClient.prefetchQuery({
      queryKey: [QUERY_KEYS.mappings],
      queryFn: () => getMappings(),
    }),
  ])
}
