"use client"

import { useRef } from "react"

import { useMemo, useCallback } from "react"
import { useDataStore } from "@/lib/hooks/use-data-store"
import { validateFieldsServerSide } from "@/lib/actions/data-processing"
import type { FieldType } from "@/lib/data-validation"
import { LoadingState } from "@/components/loading-state"

export function OptimizedDataMapper() {
  const { uploadedData, mappings, isLoading, processData } = useDataStore()

  // Memoize source fields
  const sourceFields = useMemo(() => {
    if (!uploadedData?.data?.[0]) return []
    return Object.keys(uploadedData.data[0])
  }, [uploadedData])

  // Memoize field validation handler
  const handleFieldValidation = useCallback(
    async (sourceField: string, targetField: FieldType) => {
      if (!uploadedData?.data) return false

      const result = await validateFieldsServerSide(uploadedData.data, sourceField, targetField)

      return result.isValid
    },
    [uploadedData],
  )

  // Memoize mapping handler with debounced validation
  const handleMapping = useDebouncedCallback(async (sourceField: string, targetField: FieldType) => {
    const isValid = await handleFieldValidation(sourceField, targetField)
    // Update mapping state...
  }, 500)

  if (isLoading) {
    return <LoadingState />
  }

  // Rest of the component rendering...
}

// Custom hook for debouncing
function useDebouncedCallback<T extends (...args: any[]) => any>(callback: T, delay: number) {
  const timeoutRef = useRef<NodeJS.Timeout>()

  return useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      timeoutRef.current = setTimeout(() => {
        callback(...args)
      }, delay)
    },
    [callback, delay],
  )
}

