'use server'

import { parseCSV, type ParseResult } from '../csv-parser'
import { parseExcel } from '../excel-parser'
import { revalidatePath } from 'next/cache'

export async function processFileServerSide(
  fileContent: string,
  fileName: string,
  fileType: string,
  fileSize: number
): Promise<ParseResult | null> {
  try {
    // Create a File-like object from the content
    const fileBlob = new Blob([fileContent], { type: fileType })
    const file = new File([fileBlob], fileName, { type: fileType })

    // Process based on file type
    let result: ParseResult | null = null

    if (fileType === 'text/csv') {
      result = await parseCSV(file)
    } else if (
      fileType === 'application/vnd.ms-excel' ||
      fileType ===
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ) {
      result = await parseExcel(file)
    }

    // Revalidate the upload path to refresh the UI
    revalidatePath('/upload')

    return result
  } catch (error) {
    console.error('Server-side file processing error:', error)
    throw new Error(
      error instanceof Error ? error.message : 'Failed to process file'
    )
  }
}

export async function validateDataServerSide(
  data: any[],
  mappings: Record<string, string>
): Promise<{
  isValid: boolean
  errors: string[]
}> {
  try {
    // Import validation functions dynamically to reduce server bundle
    const { validateDataSet, validateMappingConfig } = await import(
      '../data-validation'
    )

    // First validate the mapping configuration
    const configValidation = validateMappingConfig(mappings)
    if (!configValidation.isValid) {
      return configValidation
    }

    // Then validate the dataset with the mappings
    return validateDataSet(data, mappings)
  } catch (error) {
    console.error('Server-side validation error:', error)
    return {
      isValid: false,
      errors: [error instanceof Error ? error.message : 'Validation failed'],
    }
  }
}
