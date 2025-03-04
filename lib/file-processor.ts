import { parseCSV, type ParseResult } from './csv-parser'
import { parseExcel } from './excel-parser'
import { toast } from 'sonner'

export const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

export async function processFile(file: File): Promise<ParseResult | null> {
  try {
    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      toast.error('File too large', {
        description: 'Maximum file size is 10MB',
      })
      return null
    }

    // Process based on file type
    const fileType = file.type

    // Process CSV files
    if (fileType === 'text/csv') {
      return await processCSVFile(file)
    }

    // Process Excel files
    if (
      fileType === 'application/vnd.ms-excel' ||
      fileType ===
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ) {
      return await processExcelFile(file)
    }

    // Unsupported file type
    toast.error('Unsupported file type', {
      description: 'Please upload a CSV or Excel file',
    })
    return null
  } catch (error) {
    toast.error('Processing failed', {
      description:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    })
    return null
  }
}

async function processCSVFile(file: File): Promise<ParseResult | null> {
  try {
    const result = await parseCSV(file)

    if (result.errors.length > 0) {
      toast.warning('Some rows contain errors', {
        description: `${result.errors.length} rows could not be processed`,
      })
    }

    if (result.warnings.length > 0) {
      toast.info('Processing complete with warnings', {
        description: result.warnings[0],
      })
    }

    if (result.data.length > 0) {
      toast.success('File processed successfully', {
        description: `Processed ${result.data.length} rows of data`,
      })
    }

    return result
  } catch (error) {
    toast.error('CSV processing failed', {
      description:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    })
    return null
  }
}

async function processExcelFile(file: File): Promise<ParseResult | null> {
  try {
    const result = await parseExcel(file)

    if (result.errors.length > 0) {
      toast.warning('Some rows contain errors', {
        description: `${result.errors.length} rows could not be processed`,
      })
    }

    if (result.warnings.length > 0) {
      toast.info('Processing complete with warnings', {
        description: result.warnings[0],
      })
    }

    if (result.data.length > 0) {
      toast.success('File processed successfully', {
        description: `Processed ${result.data.length} rows of data`,
      })
    }

    return result
  } catch (error) {
    toast.error('Excel processing failed', {
      description:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    })
    return null
  }
}

export function downloadCSV(data: any[], filename: string) {
  try {
    const blob = new Blob([data], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob)
      link.setAttribute('href', url)
      link.setAttribute('download', filename)
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    }
  } catch (error) {
    toast.error('Download failed', {
      description:
        error instanceof Error ? error.message : 'Failed to download file',
    })
  }
}

export function downloadExcel(data: any[], filename: string) {
  try {
    const { generateExcel } = require('./excel-parser')
    const blob = generateExcel(data)
    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.download = filename
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  } catch (error) {
    toast.error('Download failed', {
      description:
        error instanceof Error
          ? error.message
          : 'Failed to download Excel file',
    })
  }
}
