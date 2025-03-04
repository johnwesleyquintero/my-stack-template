/**
 * Component for displaying data processing status and progress
 */
import { Progress } from '@/components/ui/progress'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { useDataProcessingContext } from './DataProcessingProvider'
import { AlertCircle, CheckCircle } from 'lucide-react'

interface ProcessingStatusProps {
  /** Optional title for the status display */
  title?: string
  /** Optional description for the status display */
  description?: string
}

/**
 * Displays the current status of data processing operations
 */
export function ProcessingStatus({
  title,
  description,
}: ProcessingStatusProps) {
  const { isProcessing, processingProgress, error } = useDataProcessingContext()

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Processing Error</AlertTitle>
        <AlertDescription>{error.message}</AlertDescription>
      </Alert>
    )
  }

  if (isProcessing) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">{title || 'Processing Data'}</h4>
            <p className="text-sm text-muted-foreground">
              {description || 'Please wait while we process your data...'}
            </p>
          </div>
          <span className="text-sm font-medium">
            {Math.round(processingProgress)}%
          </span>
        </div>
        <Progress value={processingProgress} />
      </div>
    )
  }

  if (processingProgress === 100) {
    return (
      <Alert>
        <CheckCircle className="h-4 w-4 text-green-500" />
        <AlertTitle>Processing Complete</AlertTitle>
        <AlertDescription>
          Your data has been processed successfully.
        </AlertDescription>
      </Alert>
    )
  }

  return null
}
