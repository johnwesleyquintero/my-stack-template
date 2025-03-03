import { createServerComponentClient } from "@/lib/supabase/server"
import type { ColumnDefinition } from "./column-library"
import { ColumnDefinitionSchema } from "./column-library"
import { initialColumnLibrary } from "./column-library"

export class ColumnLibraryService {
  private static instance: ColumnLibraryService
  private columnCache: Map<string, ColumnDefinition>

  private constructor() {
    this.columnCache = new Map()
    this.initializeCache()
  }

  public static getInstance(): ColumnLibraryService {
    if (!ColumnLibraryService.instance) {
      ColumnLibraryService.instance = new ColumnLibraryService()
    }
    return ColumnLibraryService.instance
  }

  private async initializeCache() {
    const supabase = await createServerComponentClient()

    // Try to load from database
    const { data: columns, error } = await supabase.from("column_library").select("*")

    if (error || !columns.length) {
      // Initialize with seed data if no existing data
      this.seedInitialData()
    } else {
      // Populate cache with database data
      columns.forEach((column) => {
        this.columnCache.set(column.id, column)
      })
    }
  }

  private async seedInitialData() {
    const supabase = await createServerComponentClient()

    // Insert initial library data
    const { error } = await supabase.from("column_library").insert(initialColumnLibrary)

    if (!error) {
      // Populate cache with initial data
      initialColumnLibrary.forEach((column) => {
        this.columnCache.set(column.id, column)
      })
    }
  }

  // Find the best matching standard column for a given source column name
  public findMatchingColumn(sourceColumn: string): ColumnDefinition | null {
    const normalizedSource = this.normalizeColumnName(sourceColumn)
    let bestMatch: ColumnDefinition | null = null
    let highestConfidence = 0

    for (const column of this.columnCache.values()) {
      // Check exact matches first
      if (column.variations.some((v) => this.normalizeColumnName(v) === normalizedSource)) {
        return column
      }

      // Calculate similarity score
      const confidence = this.calculateSimilarity(normalizedSource, [column.name, ...column.variations])

      if (confidence > highestConfidence && confidence > 0.6) {
        highestConfidence = confidence
        bestMatch = column
      }
    }

    return bestMatch
  }

  // Learn from user mappings
  public async learnMapping(sourceColumn: string, targetColumn: ColumnDefinition, samples: string[]) {
    const normalizedSource = this.normalizeColumnName(sourceColumn)

    // Update existing column definition
    const column = this.columnCache.get(targetColumn.id)
    if (column) {
      // Add new variation if it doesn't exist
      if (!column.variations.includes(normalizedSource)) {
        column.variations.push(normalizedSource)
      }

      // Update usage statistics
      column.useCount++
      column.lastUsed = new Date().toISOString()

      // Update examples if provided
      if (samples && samples.length > 0) {
        column.examples = [...new Set([...(column.examples || []), ...samples])].slice(0, 5)
      }

      // Update in database
      const supabase = await createServerComponentClient()
      await supabase.from("column_library").update(column).eq("id", column.id)

      // Update cache
      this.columnCache.set(column.id, column)
    }
  }

  // Create a new column definition
  public async createColumn(
    name: string,
    category: string,
    type: string,
    variations: string[] = [],
  ): Promise<ColumnDefinition> {
    const newColumn: ColumnDefinition = {
      id: this.generateId(name),
      name,
      category,
      type: type as any,
      variations,
      confidence: 0.7, // Initial confidence
      lastUsed: new Date().toISOString(),
      useCount: 1,
    }

    // Validate
    ColumnDefinitionSchema.parse(newColumn)

    // Save to database
    const supabase = await createServerComponentClient()
    const { error } = await supabase.from("column_library").insert(newColumn)

    if (error) throw error

    // Update cache
    this.columnCache.set(newColumn.id, newColumn)

    return newColumn
  }

  // Helper methods
  private normalizeColumnName(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]/g, " ")
      .trim()
      .replace(/\s+/g, "_")
  }

  private generateId(name: string): string {
    return `${this.normalizeColumnName(name)}_${Date.now()}`
  }

  private calculateSimilarity(source: string, targets: string[]): number {
    // Simple Levenshtein distance-based similarity
    const maxDistance = Math.max(...targets.map((t) => t.length))

    return Math.max(
      ...targets.map((target) => {
        const distance = this.levenshteinDistance(source, this.normalizeColumnName(target))
        return 1 - distance / maxDistance
      }),
    )
  }

  private levenshteinDistance(a: string, b: string): number {
    if (a.length === 0) return b.length
    if (b.length === 0) return a.length

    const matrix = Array(b.length + 1)
      .fill(null)
      .map(() => Array(a.length + 1).fill(null))

    for (let i = 0; i <= a.length; i++) matrix[0][i] = i
    for (let j = 0; j <= b.length; j++) matrix[j][0] = j

    for (let j = 1; j <= b.length; j++) {
      for (let i = 1; i <= a.length; i++) {
        const substitutionCost = a[i - 1] === b[j - 1] ? 0 : 1
        matrix[j][i] = Math.min(matrix[j][i - 1] + 1, matrix[j - 1][i] + 1, matrix[j - 1][i - 1] + substitutionCost)
      }
    }

    return matrix[b.length][a.length]
  }
}

