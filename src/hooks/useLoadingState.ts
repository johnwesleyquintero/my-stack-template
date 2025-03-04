import { useState, useCallback } from 'react'

export const useLoadingState = (initialState = false) => {
  const [isLoading, setIsLoading] = useState(initialState)
  const [progress, setProgress] = useState(0)

  const startLoading = useCallback(() => {
    setIsLoading(true)
    setProgress(0)
  }, [])

  const updateProgress = useCallback((newProgress: number) => {
    setProgress(Math.min(100, Math.max(0, newProgress)))
  }, [])

  const stopLoading = useCallback(() => {
    setIsLoading(false)
    setProgress(0)
  }, [])

  return { isLoading, progress, startLoading, updateProgress, stopLoading }
}
