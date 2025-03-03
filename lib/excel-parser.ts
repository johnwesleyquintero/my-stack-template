import type { ParseResult } from "./csv-parser"
import { importXLSX } from "./dynamic-imports"
import { captureError } from "./error-logger"

export async function parseExcel(file: File): Promise<ParseResult> {
  return new Promise(async (resolve, reject) => {
    const result: ParseResult = {
      data: [],
      errors: [],
      warnings: [],
    }

    const reader = new FileReader()

    reader.onload = async (e) => {
      try {
        const data = e.target?.result
        if (!data) {
          reject(new Error("Failed to read file"))
          return
        }

        // Dynamically import XLSX
        const XLSX = await importXLSX()

        // Parse Excel data
        const workbook = XLSX.read(data, { type: "binary" })
        const firstSheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[firstSheetName]

        // Convert to JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet)

        // Dynamically import zod
        const { z } = await import("zod")

        // Import the schema
        const { AmazonReportSchema } = await import("./csv-parser")

        // Process each row
        jsonData.forEach((row: any, index: number) => {
          try {
            // Normalize field names (convert to lowercase)
            const normalizedRow = Object.keys(row).reduce(
              (acc, key) => {
                acc[key.toLowerCase()] = row[key]
                return acc
              },
              {} as Record<string, any>,
            )

            // Attempt to validate the row against our schema
            const validatedRow = AmazonReportSchema.parse(normalizedRow)
            result.data.push(validatedRow)
          } catch (error) {
            if (error instanceof z.ZodError) {
              error.errors.forEach((err) => {
                result.errors.push(`Row ${index + 1}: ${err.path.join(".")} - ${err.message}`)
              })
            }
          }
        })

        // Add warnings for potential data issues
        if (jsonData.length === 0) {
          result.warnings.push("The file appears to be empty")
        }

        if (result.errors.length > 0) {
          result.warnings.push(`Found ${result.errors.length} validation errors`)
        }

        if (workbook.SheetNames.length > 1) {
          result.warnings.push(`File contains multiple sheets. Only data from '${firstSheetName}' was processed.`)
        }

        resolve(result)
      } catch (error) {
        captureError(error instanceof Error ? error : new Error(String(error)))
        reject(new Error(`Failed to parse Excel file: ${error instanceof Error ? error.message : String(error)}`))
      }
    }

    reader.onerror = () => {
      reject(new Error("Failed to read file"))
    }

    // Read the file as binary
    reader.readAsBinaryString(file)
  })
}

export async function generateExcel(data: any[]): Promise<Blob> {
  try {
    // Dynamically import XLSX
    const XLSX = await importXLSX()

    // Create a new workbook
    const workbook = XLSX.utils.book_new()

    // Convert data to worksheet
    const worksheet = XLSX.utils.json_to_sheet(data)

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data")

    // Generate Excel file
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" })

    // Convert to Blob
    return new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" })
  } catch (error) {
    captureError(error instanceof Error ? error : new Error(String(error)))
    throw new Error("Failed to generate Excel file")
  }
}

