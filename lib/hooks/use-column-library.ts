"use client"

import { useState, useCallback } from "react"
import { ColumnLibraryService } from "@/lib/data-mapping/column-library-service"
import type { ColumnDefinition } from "@/lib/data-mapping/column-library"

export function useColumnLibrary() {
  const [isLoading, setIsLoading] = useState(true)
  const [suggestions, setSuggestions] = useState<Map<string, ColumnDefinition>>(new Map())

  // Get suggestions for source columns
  const getSuggestions = useCallback(async (sourceColumns: string[]) => {
    const library = ColumnLibraryService.getInstance()
    const newSuggestions = new Map<string, ColumnDefinition>()

    for (const column of sourceColumns) {
      const match = library.findMatchingColumn(column)
      if (match) {
        newSuggestions.set(column, match)
      }
    }

    setSuggestions(newSuggestions)
    setIsLoading(false)
  }, [])

  // Learn from user mapping
  const learnMapping = useCallback(
    async (sourceColumn: string, targetColumn: ColumnDefinition, samples: string[] = []) => {
      const library = ColumnLibraryService.getInstance()
      await library.learnMapping(sourceColumn, targetColumn, samples)
    },
    [],
  )

  // Create new column definition
  const createColumn = useCallback(async (name: string, category: string, type: string, variations: string[] = []) => {
    const library = ColumnLibraryService.getInstance()
    return await library.createColumn(name, category, type, variations)
  }, [])

  return {
    isLoading,
    suggestions,
    getSuggestions,
    learnMapping,
    createColumn,
  }
}

