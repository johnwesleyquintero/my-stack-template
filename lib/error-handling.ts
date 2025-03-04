import { captureError } from './error-logger'
import { showToast } from '@/components/toast-utils'

// Error types for better categorization
export enum ErrorType {
  VALIDATION = 'validation',
  AUTHENTICATION = 'authentication',
  AUTHORIZATION = 'authorization',
  SERVER = 'server',
  NETWORK = 'network',
  STORAGE = 'storage',
  UNKNOWN = 'unknown',
}

// Standardized error structure
export interface AppError {
  type: ErrorType
  message: string
  originalError?: unknown
  context?: Record<string, any>
}

// Function to handle errors consistently
export function handleError(
  error: unknown,
  defaultMessage = 'An unexpected error occurred',
  context?: Record<string, any>
): AppError {
  let appError: AppError

  if (error instanceof Error) {
    // Determine error type based on message or instance
    let type = ErrorType.UNKNOWN

    if (
      error.message.includes('validation') ||
      error.message.includes('invalid')
    ) {
      type = ErrorType.VALIDATION
    } else if (
      error.message.includes('authentication') ||
      error.message.includes('login')
    ) {
      type = ErrorType.AUTHENTICATION
    } else if (
      error.message.includes('permission') ||
      error.message.includes('access')
    ) {
      type = ErrorType.AUTHORIZATION
    } else if (
      error.message.includes('network') ||
      error.message.includes('fetch')
    ) {
      type = ErrorType.NETWORK
    } else if (
      error.message.includes('storage') ||
      error.message.includes('database')
    ) {
      type = ErrorType.STORAGE
    }

    appError = {
      type,
      message: error.message,
      originalError: error,
      context,
    }
  } else {
    appError = {
      type: ErrorType.UNKNOWN,
      message: defaultMessage,
      originalError: error,
      context,
    }
  }

  // Log the error
  captureError(
    appError.originalError instanceof Error
      ? appError.originalError
      : new Error(appError.message),
    appError.context
  )

  return appError
}

// Function to display error to user
export function displayError(
  error: unknown,
  defaultMessage = 'An unexpected error occurred'
): void {
  const appError = handleError(error, defaultMessage)

  // Show appropriate toast based on error type
  switch (appError.type) {
    case ErrorType.VALIDATION:
      showToast('warning', 'Validation Error', {
        description: appError.message,
      })
      break
    case ErrorType.AUTHENTICATION:
      showToast('error', 'Authentication Error', {
        description: appError.message,
      })
      break
    case ErrorType.AUTHORIZATION:
      showToast('error', 'Authorization Error', {
        description: appError.message,
      })
      break
    case ErrorType.NETWORK:
      showToast('error', 'Network Error', { description: appError.message })
      break
    case ErrorType.STORAGE:
      showToast('error', 'Storage Error', { description: appError.message })
      break
    default:
      showToast('error', 'Error', { description: appError.message })
  }
}

// Async function wrapper with standardized error handling
export async function withErrorHandling<T>(
  fn: () => Promise<T>,
  errorMessage = 'An unexpected error occurred',
  context?: Record<string, any>
): Promise<T> {
  try {
    return await fn()
  } catch (error) {
    displayError(error, errorMessage)
    throw error
  }
}
