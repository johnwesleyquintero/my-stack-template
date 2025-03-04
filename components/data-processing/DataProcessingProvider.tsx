'use client'

import type React from 'react'

/**
 * Provider component for data processing context
 * Manages the global state and operations for data processing
 */
import { createContext, useContext, useMemo } from 'react'
import { useDataProcessing } from '@/lib/hooks/use-data-processing'
import type { ProcessingOptions, ProcessingResult } from '@/lib/types/data'

interface DataProcessingContextType {
  processedData: ProcessingResult[] | undefined
  isLoading: boolean
  isProcessing: boolean
  processingProgress: number
  error: Error | null
  processData: (data: any[]) => void
  resetProcessing: () => void
}

const DataProcessingContext = createContext<
  DataProcessingContextType | undefined
>(undefined)

interface DataProcessingProviderProps {
  children: React.ReactNode
  initialData?: any[]
  options?: ProcessingOptions
}

/**
 * Provider component that wraps the application with data processing context
 */
export function DataProcessingProvider({
  children,
  initialData,
  options,
}: DataProcessingProviderProps) {
  const {
    processedData,
    isLoading,
    isProcessing,
    processingProgress,
    error,
    processData,
    resetProcessing,
  } = useDataProcessing({ initialData, options })

  const value = useMemo(
    () => ({
      processedData,
      isLoading,
      isProcessing,
      processingProgress,
      error,
      processData,
      resetProcessing,
    }),
    [
      processedData,
      isLoading,
      isProcessing,
      processingProgress,
      error,
      processData,
      resetProcessing,
    ]
  )

  return (
    <DataProcessingContext.Provider value={value}>
      {children}
    </DataProcessingContext.Provider>
  )
}

/**
 * Hook to use data processing context
 * @throws {Error} If used outside of DataProcessingProvider
 */
export function useDataProcessingContext() {
  const context = useContext(DataProcessingContext)
  if (context === undefined) {
    throw new Error(
      'useDataProcessingContext must be used within a DataProcessingProvider'
    )
  }
  return context
}
