"use client"

import { Component, type ErrorInfo, type ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { captureError } from "@/lib/error-logger"

interface Props {
  children: ReactNode
  fallback?: ReactNode
  onReset?: () => void
  errorBoundaryName?: string // For identifying which boundary caught the error
}

interface State {
  hasError: boolean
  error?: Error
  errorInfo?: ErrorInfo
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log the error to our error tracking system
    captureError(error, {
      componentStack: errorInfo.componentStack,
      boundaryName: this.props.errorBoundaryName || "unnamed",
      // Add additional context for middleware errors
      errorType: error.message.includes("Cookies can only be modified") ? "middleware" : "component",
    })

    this.setState({ error, errorInfo })
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined })
    this.props.onReset?.()
  }

  private handleReload = () => {
    window.location.reload()
  }

  private isMiddlewareError() {
    return this.state.error?.message.includes("Cookies can only be modified")
  }

  public render() {
    if (this.state.hasError) {
      // Special handling for middleware errors
      if (this.isMiddlewareError()) {
        return (
          <div className="flex min-h-[400px] items-center justify-center p-4">
            <Card className="w-full max-w-md">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <AlertCircle className="h-6 w-6 text-destructive" />
                  <CardTitle>Middleware Error</CardTitle>
                </div>
                <CardDescription>
                  There was an issue with the application middleware. This is likely a configuration problem.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mt-4 rounded-md bg-muted p-4 text-xs overflow-auto">
                  <code>{this.state.error?.message}</code>
                </div>
                <div className="mt-6 flex justify-end space-x-4">
                  <Button variant="outline" onClick={this.handleReload}>
                    Reload Page
                  </Button>
                  <Button onClick={() => (window.location.href = "/")}>Go to Homepage</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )
      }

      return (
        this.props.fallback || (
          <div className="flex min-h-[400px] items-center justify-center p-4">
            <Card className="w-full max-w-md">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <AlertCircle className="h-6 w-6 text-destructive" />
                  <CardTitle>Something went wrong</CardTitle>
                </div>
                <CardDescription>
                  {this.state.error?.message || "An unexpected error occurred. Please try again."}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {process.env.NODE_ENV === "development" && this.state.errorInfo && (
                  <pre className="mt-4 max-h-48 overflow-auto rounded-md bg-muted p-4 text-xs">
                    {this.state.errorInfo.componentStack}
                  </pre>
                )}
                <div className="mt-6 flex justify-end space-x-4">
                  <Button variant="outline" onClick={this.handleReload}>
                    Reload Page
                  </Button>
                  <Button onClick={this.handleReset}>Try Again</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )
      )
    }

    return this.props.children
  }
}

