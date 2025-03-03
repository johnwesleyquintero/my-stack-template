// Error logging types
export interface ErrorContext {
  componentStack?: string;
  boundaryName?: string;
  userId?: string;
  url?: string;
  additionalData?: Record<string, any>;
  errorType?: string;
  statusCode?: number;
  requestId?: string;
  timestamp?: string;
  environment?: string;
  version?: string;
}

// Simple in-memory error store for development
const errorStore: Array<{
  error: Error;
  context: ErrorContext;
  timestamp: Date;
}> = [];

// Function to capture and log errors
export function captureError(error: Error, context: ErrorContext = {}) {
  // Add current URL and timestamp to context
  const enrichedContext = {
    ...context,
    url: typeof window !== "undefined" ? window.location.href : "server",
    timestamp: new Date().toISOString(),
    environment: process.env.NEXT_PUBLIC_VERCEL_ENV || "development",
    version: process.env.NEXT_PUBLIC_APP_VERSION || "unknown",
  };

  // Log to console in development
  if (process.env.NODE_ENV === "development") {
    console.group("Error captured:");
    console.error(error);
    console.info("Context:", enrichedContext);
    console.groupEnd();

    // Store in memory for development debugging
    errorStore.push({
      error,
      context: enrichedContext,
      timestamp: new Date(),
    });
  }

  // In production, send to error tracking service
  if (process.env.NODE_ENV === "production") {
    try {
      const errorData = {
        name: error.name,
        message: error.message,
        stack: error.stack,
        context: enrichedContext,
      };

      // Send error to backend
      fetch("/api/log-error", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(typeof window !== "undefined" && window.__CSRF_TOKEN__
            ? { "x-csrf-token": window.__CSRF_TOKEN__ }
            : {}),
        },
        body: JSON.stringify(errorData),
        keepalive: true,
      }).catch((err) => {
        console.error("Failed to send error to logging service:", err);
      });
    } catch (loggingError) {
      // Fallback logging if the error tracking fails
      console.error("Failed to log error:", loggingError);
      console.error("Original error:", error);
    }
  }

  return error; // Return the error for chaining
}

// Function to get recent errors (for development debugging)
export function getRecentErrors() {
  return errorStore.slice(-20); // Return last 20 errors
}

// Function to clear error store (for development)
export function clearErrorStore() {
  errorStore.length = 0;
}

// Helper to create a context object with user info
export function createErrorContext(
  additionalData?: Record<string, any>
): ErrorContext {
  const context: ErrorContext = {
    url: typeof window !== "undefined" ? window.location.href : undefined,
    additionalData,
  };

  // In a real app, you would get the user ID from auth context
  // const { user } = useAuth()
  // if (user?.id) context.userId = user.id

  return context;
}

// Add a global type declaration for the CSRF token
declare global {
  interface Window {
    __CSRF_TOKEN__?: string;
  }
}
