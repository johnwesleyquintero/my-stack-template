import { useState, useCallback } from 'react'
import { FileProcessingError, ValidationError } from '@/types/errors'

interface ErrorState {
  message: string
  code?: string
  field?: string
}

export const useErrorHandler = () => {
  const [error, setError] = useState<ErrorState | null>(null)

  const handleError = useCallback((error: unknown) => {
    if (error instanceof FileProcessingError) {
      setError({ message: error.message, code: error.code })
    } else if (error instanceof ValidationError) {
      setError({ message: error.message, field: error.field })
    } else if (error instanceof Error) {
      setError({ message: error.message })
    } else {
      setError({ message: 'An unknown error occurred' })
    }
  }, [])

  const clearError = useCallback(() => setError(null), [])

  return { error, handleError, clearError }
}
