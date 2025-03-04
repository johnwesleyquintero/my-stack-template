type DataRecord = Record<string, unknown>

interface ProcessingResult<T = unknown> {
  success: boolean
  data: T
  errors?: string[]
}

interface ApiResponse<T = unknown> {
  data: T | null
  error: string | null
}

// Add more global types here as needed
