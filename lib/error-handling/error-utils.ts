import { captureError } from "@/lib/error-logger"
import { showToast } from "@/components/toast-utils"
import type { AppError, ErrorContext, ErrorHandlerConfig } from "./types"
import { ErrorType } from "./types"

/**
 * Creates a standardized AppError from various error types
 * @param error - The original error
 * @param context - Additional context for the error
 * @returns Standardized AppError object
 */
export function createAppError(error: unknown, context?: ErrorContext): AppError {
  if (error instanceof Error) {
    // Map known error types
    const type = determineErrorType(error)
    return {
      type,
      message: error.message,
      code: context?.action,
      details: context?.metadata,
      originalError: error,
    }
  }

  // Handle non-Error objects
  return {
    type: ErrorType.UNKNOWN,
    message: typeof error === "string" ? error : "An unknown error occurred",
    code: context?.action,
    details: context?.metadata,
    originalError: error,
  }
}

/**
 * Determines the error type based on the error message or instance
 */
function determineErrorType(error: Error): ErrorType {
  if (error.message.includes("validation")) return ErrorType.VALIDATION
  if (error.message.includes("network")) return ErrorType.NETWORK
  if (error.message.includes("auth")) return ErrorType.AUTHENTICATION
  if (error.message.includes("file")) return ErrorType.FILE_OPERATION
  if (error.message.includes("process")) return ErrorType.DATA_PROCESSING
  return ErrorType.UNKNOWN
}

/**
 * Handles errors with consistent behavior across the application
 * @param error - The error to handle
 * @param context - Additional context for error handling
 * @param config - Configuration for error handling behavior
 */
export function handleError(
  error: unknown,
  context?: ErrorContext,
  config: ErrorHandlerConfig = { showToast: true, logToServer: true },
): AppError {
  const appError = createAppError(error, context)

  // Log error
  if (config.logToServer) {
    captureError(appError.originalError || new Error(appError.message), {
      errorType: appError.type,
      ...context,
    })
  }

  // Show user-friendly message
  if (config.showToast) {
    const toastMessage = getErrorMessage(appError)
    showToast("error", toastMessage.title, {
      description: toastMessage.description,
    })
  }

  return appError
}

/**
 * Gets user-friendly error messages based on error type
 */
function getErrorMessage(error: AppError): { title: string; description: string } {
  switch (error.type) {
    case ErrorType.VALIDATION:
      return {
        title: "Validation Error",
        description: error.message || "Please check your input and try again",
      }
    case ErrorType.AUTHENTICATION:
      return {
        title: "Authentication Error",
        description: error.message || "Please sign in to continue",
      }
    case ErrorType.NETWORK:
      return {
        title: "Network Error",
        description: error.message || "Please check your connection and try again",
      }
    case ErrorType.FILE_OPERATION:
      return {
        title: "File Operation Error",
        description: error.message || "There was a problem with the file operation",
      }
    case ErrorType.DATA_PROCESSING:
      return {
        title: "Processing Error",
        description: error.message || "There was a problem processing your data",
      }
    default:
      return {
        title: "Error",
        description: error.message || "An unexpected error occurred",
      }
  }
}

/**
 * Wraps an async function with standardized error handling
 * @param fn - The async function to wrap
 * @param context - Error context
 * @param config - Error handling configuration
 */
export async function withErrorHandling<T>(
  fn: () => Promise<T>,
  context?: ErrorContext,
  config?: ErrorHandlerConfig,
): Promise<T> {
  try {
    return await fn()
  } catch (error) {
    handleError(error, context, config)
    throw error
  }
}

