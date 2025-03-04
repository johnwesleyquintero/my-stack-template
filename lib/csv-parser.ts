import { z } from 'zod'
import { importPapaParse } from './dynamic-imports'
import { captureError } from './error-logger'

// Define the schema for Amazon report data
export const AmazonReportSchema = z.object({
  asin: z.string().length(10),
  title: z.string().min(1),
  category: z.string().min(1),
  price: z.number().positive(),
  units: z.number().int().min(0),
  revenue: z.number().positive(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
})

export type AmazonReport = z.infer<typeof AmazonReportSchema>

export interface ParseResult {
  data: AmazonReport[]
  errors: string[]
  warnings: string[]
}

export async function parseCSV(file: File): Promise<ParseResult> {
  return new Promise(async (resolve, reject) => {
    try {
      // Dynamically import Papa Parse
      const Papa = await importPapaParse()

      const result: ParseResult = {
        data: [],
        errors: [],
        warnings: [],
      }

      Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: results => {
          // Process each row
          results.data.forEach((row: any, index: number) => {
            try {
              // Attempt to validate the row against our schema
              const validatedRow = AmazonReportSchema.parse(row)
              result.data.push(validatedRow)
            } catch (error) {
              if (error instanceof z.ZodError) {
                error.errors.forEach(err => {
                  result.errors.push(
                    `Row ${index + 1}: ${err.path.join('.')} - ${err.message}`
                  )
                })
              }
            }
          })

          // Add warnings for potential data issues
          if (results.data.length === 0) {
            result.warnings.push('The file appears to be empty')
          }
          if (results.errors.length > 0) {
            result.warnings.push(
              `Found ${results.errors.length} parsing errors`
            )
          }

          resolve(result)
        },
        error: (error: any) => {
          captureError(
            error instanceof Error ? error : new Error(String(error))
          )
          reject(new Error(`Failed to parse CSV: ${error.message}`))
        },
      })
    } catch (error) {
      captureError(error instanceof Error ? error : new Error(String(error)))
      reject(
        new Error(
          `Failed to parse CSV: ${
            error instanceof Error ? error.message : String(error)
          }`
        )
      )
    }
  })
}

export async function generateCSV<T extends Record<string, any>>(
  data: T[]
): Promise<string> {
  try {
    // Dynamically import Papa Parse
    const Papa = await importPapaParse()
    return Papa.unparse(data)
  } catch (error) {
    captureError(error instanceof Error ? error : new Error(String(error)))
    throw new Error('Failed to generate CSV')
  }
}

export async function validateFields(headers: string[]): Promise<{
  valid: boolean
  missingFields: string[]
  extraFields: string[]
}> {
  const requiredFields = [
    'asin',
    'title',
    'category',
    'price',
    'units',
    'revenue',
    'date',
  ]
  const missingFields = requiredFields.filter(field => !headers.includes(field))
  const extraFields = headers.filter(field => !requiredFields.includes(field))

  return {
    valid: missingFields.length === 0,
    missingFields,
    extraFields,
  }
}
