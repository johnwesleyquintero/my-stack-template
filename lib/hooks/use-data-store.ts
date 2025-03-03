"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getSecureItemAsync } from "@/lib/secure-storage"
import { processDataServerSide } from "@/lib/actions/data-processing"
import { showToast } from "@/components/toast-utils"

// Define query keys as constants
export const QUERY_KEYS = {
  uploadedData: "uploadedData",
  mappings: "mappings",
  processedData: "processedData",
} as const

export function useDataStore() {
  const queryClient = useQueryClient()

  // Fetch uploaded data
  const {
    data: uploadedData,
    isLoading: isLoadingData,
    error: dataError,
  } = useQuery({
    queryKey: [QUERY_KEYS.uploadedData],
    queryFn: () => getSecureItemAsync("uploadedData"),
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
  })

  // Fetch mappings
  const {
    data: mappings,
    isLoading: isLoadingMappings,
    error: mappingsError,
  } = useQuery({
    queryKey: [QUERY_KEYS.mappings],
    queryFn: () => getSecureItemAsync("mappings"),
    staleTime: 5 * 60 * 1000,
  })

  // Process data mutation
  const { mutate: processData, isLoading: isProcessing } = useMutation({
    mutationFn: async (data: { rawData: any[]; mappings: Record<string, string> }) => {
      const result = await processDataServerSide(data.rawData, data.mappings)
      if (!result.success) {
        throw new Error(result.errors[0])
      }
      return result.data
    },
    onSuccess: (processedData) => {
      // Update processed data in cache
      queryClient.setQueryData([QUERY_KEYS.processedData], processedData)
      showToast("success", "Data processed successfully")
    },
    onError: (error) => {
      showToast("error", "Processing failed", {
        description: error instanceof Error ? error.message : "An unexpected error occurred",
      })
    },
  })

  return {
    uploadedData,
    mappings,
    isLoading: isLoadingData || isLoadingMappings,
    isProcessing,
    error: dataError || mappingsError,
    processData,
  }
}

