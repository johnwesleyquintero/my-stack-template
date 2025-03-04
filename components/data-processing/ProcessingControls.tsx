/**
 * Component for data processing controls and actions
 */
import { Button } from '@/components/ui/button'
import { useDataProcessingContext } from './DataProcessingProvider'
import { Play, StopCircle, RotateCcw } from 'lucide-react'

interface ProcessingControlsProps {
  /** Callback when processing starts */
  onStart?: () => void
  /** Callback when processing is reset */
  onReset?: () => void
}

/**
 * Provides controls for managing data processing operations
 */
export function ProcessingControls({
  onStart,
  onReset,
}: ProcessingControlsProps) {
  const { isProcessing, processData, resetProcessing } =
    useDataProcessingContext()

  const handleStart = () => {
    onStart?.()
    processData([]) // Add data here
  }

  const handleReset = () => {
    onReset?.()
    resetProcessing()
  }

  return (
    <div className="flex items-center gap-4">
      <Button onClick={handleStart} disabled={isProcessing} className="w-32">
        <Play className="mr-2 h-4 w-4" />
        {isProcessing ? 'Processing...' : 'Start'}
      </Button>

      {isProcessing && (
        <Button variant="outline" onClick={resetProcessing} className="w-32">
          <StopCircle className="mr-2 h-4 w-4" />
          Stop
        </Button>
      )}

      <Button variant="ghost" onClick={handleReset} disabled={isProcessing}>
        <RotateCcw className="mr-2 h-4 w-4" />
        Reset
      </Button>
    </div>
  )
}
