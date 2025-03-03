"use client"

import { useMemo } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { QUERY_KEYS } from "@/lib/data-store/query-client"
import { processDataServerSide, validateDataBatch } from "@/lib/actions/data-processing"
import type { ProcessingResult, ValidationResult } from "@/lib/types/data"

/**
 * Custom hook for optimized data operations
 */
export function useOptimizedData(options = { batchSize: 100 }) {
  const queryClient = useQueryClient()

  // Query for uploaded data with caching
  const {
    data: uploadedData,
    isLoading: isLoadingData,
    error: dataError,
  } = useQuery({
    queryKey: [QUERY_KEYS.uploadedData],
    staleTime: Number.POSITIVE_INFINITY, // Data doesn't change once uploaded
  })

  // Memoized derived data
  const processedRows = useMemo(() => {
    if (!uploadedData?.data) return 0
    return uploadedData.data.length
  }, [uploadedData])

  // Batch processing mutation
  const { mutate: processData, isLoading: isProcessing } = useMutation({
    mutationFn: async (data: any[]): Promise<ProcessingResult> => {
      return processDataServerSide(data, {
        chunkSize: options.batchSize,
        validate: true,
      })
    },
    onSuccess: () => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.processedData] })
    },
  })

  // Batch validation mutation
  const { mutate: validateData, isLoading: isValidating } = useMutation({
    mutationFn: async ({
      data,
      mappings,
    }: {
      data: any[]
      mappings: Record<string, string>
    }): Promise<ValidationResult> => {
      return validateDataBatch(data, mappings, options.batchSize)
    },
    onSuccess: (result) => {
      // Update validation results in cache
      queryClient.setQueryData([QUERY_KEYS.validationResults], result)
    },
  })

  return {
    uploadedData,
    processedRows,
    isLoadingData,
    isProcessing,
    isValidating,
    dataError,
    processData,
    validateData,
  }
}

