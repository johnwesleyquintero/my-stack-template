'use client'

import { useEffect, useRef, useState } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

interface MermaidDiagramProps {
  chart: string
}

export function MermaidDiagram({ chart }: MermaidDiagramProps) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const initMermaid = async () => {
      try {
        setLoading(true)
        const mermaid = (await import('mermaid')).default
        mermaid.initialize({
          startOnLoad: true,
          theme: 'default',
          securityLevel: 'loose',
        })
        if (containerRef.current) {
          containerRef.current.innerHTML = chart
          await mermaid.run()
        }
      } catch (err) {
        console.error('Error loading mermaid:', err)
        setError('Failed to load diagram')
      } finally {
        setLoading(false)
      }
    }

    initMermaid()
  }, [chart])

  if (loading) {
    return <Skeleton className="h-[200px] w-full" />
  }

  if (error) {
    return (
      <div className="rounded-md border border-destructive p-4 text-destructive">
        {error}
      </div>
    )
  }

  return <div ref={containerRef} className="mermaid" />
}
