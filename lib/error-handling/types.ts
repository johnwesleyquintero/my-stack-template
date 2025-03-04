/**
 * Defines the standard error types used throughout the application
 */
export enum ErrorType {
  VALIDATION = 'validation',
  DATA_PROCESSING = 'data_processing',
  AUTHENTICATION = 'authentication',
  NETWORK = 'network',
  FILE_OPERATION = 'file_operation',
  UNKNOWN = 'unknown',
}

/**
 * Standard error structure for consistent error handling
 */
export interface AppError {
  type: ErrorType
  message: string
  code?: string
  details?: Record<string, unknown>
  originalError?: unknown
}

/**
 * Error context for additional error information
 */
export interface ErrorContext {
  userId?: string
  component?: string
  action?: string
  metadata?: Record<string, unknown>
}

/**
 * Configuration for error handling behavior
 */
export interface ErrorHandlerConfig {
  showToast?: boolean
  logToServer?: boolean
  retryable?: boolean
}
