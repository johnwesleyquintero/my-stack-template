import { captureError } from './error-logger'

interface ErrorEvent {
  message: string
  stack?: string
  timestamp: Date
  userId?: string
  metadata?: Record<string, any>
}

class ErrorTrackingSystem {
  private static instance: ErrorTrackingSystem
  private errors: ErrorEvent[] = []
  private readonly MAX_ERRORS = 100

  private constructor() {
    // Initialize error tracking
    window.addEventListener(
      'unhandledrejection',
      this.handleUnhandledRejection.bind(this)
    )
    window.addEventListener('error', this.handleError.bind(this))
  }

  public static getInstance(): ErrorTrackingSystem {
    if (!ErrorTrackingSystem.instance) {
      ErrorTrackingSystem.instance = new ErrorTrackingSystem()
    }
    return ErrorTrackingSystem.instance
  }

  public trackError(error: Error, metadata?: Record<string, any>) {
    const errorEvent: ErrorEvent = {
      message: error.message,
      stack: error.stack,
      timestamp: new Date(),
      metadata,
    }

    this.addError(errorEvent)
    this.sendToServer(errorEvent)
  }

  private handleUnhandledRejection(event: PromiseRejectionEvent) {
    this.trackError(new Error(`Unhandled Promise Rejection: ${event.reason}`), {
      type: 'unhandledRejection',
    })
  }

  private handleError(event: ErrorEvent) {
    this.trackError(new Error(`Runtime Error: ${event.message}`), {
      type: 'runtime',
      lineNo: event.lineno,
      colNo: event.colno,
    })
  }

  private addError(error: ErrorEvent) {
    this.errors.unshift(error)
    if (this.errors.length > this.MAX_ERRORS) {
      this.errors.pop()
    }
  }

  private async sendToServer(error: ErrorEvent) {
    try {
      const response = await fetch('/api/log-error', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(error),
      })

      if (!response.ok) {
        throw new Error('Failed to send error to server')
      }
    } catch (err) {
      captureError(err instanceof Error ? err : new Error(String(err)))
      console.error('Failed to send error to tracking service:', err)
    }
  }

  public getRecentErrors(): ErrorEvent[] {
    return [...this.errors]
  }

  public clearErrors(): void {
    this.errors = []
  }
}

export const errorTracker = ErrorTrackingSystem.getInstance()
