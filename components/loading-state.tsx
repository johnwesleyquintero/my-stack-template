import { Loader2 } from 'lucide-react'

interface LoadingStateProps {
  text?: string
  className?: string
}

export function LoadingState({
  text = 'Loading...',
  className,
}: LoadingStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 ${className}`}
    >
      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      <p className="text-sm text-muted-foreground">{text}</p>
    </div>
  )
}
