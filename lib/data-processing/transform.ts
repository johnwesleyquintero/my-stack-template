import { z } from 'zod'

// Define the base schema for uploaded data
export const DataSchema = z.object({
  _id: z.string(), // Composite key
  _timestamp: z.string(), // ISO timestamp
  _source: z.string(), // Source file/system
  _batch: z.string(), // Batch ID for grouped uploads
  raw: z.record(z.unknown()), // Original raw data
})

export type ProcessedData = z.infer<typeof DataSchema>

// Define supported field types for mapping
export const FieldTypes = {
  string: 'string',
  number: 'number',
  date: 'date',
  boolean: 'boolean',
  currency: 'currency',
  percentage: 'percentage',
} as const

export type FieldType = keyof typeof FieldTypes

// Interface for field mapping configuration
export interface FieldMapping {
  sourceField: string
  targetField: string
  type: FieldType
  format?: string // For dates, numbers, etc.
}

// Generate a composite key from multiple fields
export function generateCompositeKey(
  data: Record<string, unknown>,
  fields: string[]
): string {
  return fields
    .map(field => String(data[field] || ''))
    .filter(Boolean)
    .join('_')
}

// Transform raw data into processed format with composite keys
export function transformData(
  rawData: any[],
  mappings: FieldMapping[],
  options: {
    keyFields?: string[]
    batchId?: string
    source?: string
  } = {}
): ProcessedData[] {
  const {
    keyFields = [],
    batchId = new Date().toISOString(),
    source = 'file_upload',
  } = options

  return rawData.map((row, index) => {
    // Generate composite key or use index as fallback
    const compositeKey =
      keyFields.length > 0
        ? generateCompositeKey(row, keyFields)
        : `${batchId}_${index}`

    // Apply field mappings
    const transformedData: Record<string, unknown> = {}
    for (const mapping of mappings) {
      const value = row[mapping.sourceField]
      transformedData[mapping.targetField] = transformValue(value, mapping)
    }

    return {
      _id: compositeKey,
      _timestamp: new Date().toISOString(),
      _source: source,
      _batch: batchId,
      raw: row,
      ...transformedData,
    }
  })
}

// Transform a single value based on field type
function transformValue(value: unknown, mapping: FieldMapping): unknown {
  if (value === null || value === undefined) return null

  switch (mapping.type) {
    case 'number':
      return Number(value)
    case 'date':
      return new Date(String(value)).toISOString()
    case 'boolean':
      return Boolean(value)
    case 'currency':
      return Number(String(value).replace(/[^0-9.-]+/g, ''))
    case 'percentage':
      return Number(String(value).replace('%', '')) / 100
    default:
      return String(value)
  }
}
