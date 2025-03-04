'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Info } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

export function VersionInfo() {
  const [isHealthy, setIsHealthy] = useState<boolean | null>(null)
  const version = process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0'

  // Check health status when hovering over version info
  const checkHealth = async () => {
    try {
      const response = await fetch('/api/health')
      const data = await response.json()
      setIsHealthy(data.status === 'ok')
    } catch (error) {
      setIsHealthy(false)
    }
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild onMouseEnter={checkHealth}>
          <Button
            variant="ghost"
            size="sm"
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            <Info className="mr-1 h-3 w-3" />v{version}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <div className="text-xs">
            <p>Nebula Suite {version}</p>
            {isHealthy !== null && (
              <p
                className={`mt-1 ${isHealthy ? 'text-green-500' : 'text-red-500'}`}
              >
                Status: {isHealthy ? 'Healthy' : 'Error'}
              </p>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
