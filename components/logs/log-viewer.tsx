'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'

interface Log {
  id: string
  timestamp: string
  level: 'error' | 'warning' | 'info'
  message: string
  source: string
  details?: string
}

const mockLogs: Log[] = [
  {
    id: '1',
    timestamp: '2024-02-28 14:23:45',
    level: 'error',
    message: 'Failed to process order #12345',
    source: 'OrderProcessor',
    details: 'Connection timeout while connecting to payment gateway',
  },
  {
    id: '2',
    timestamp: '2024-02-28 14:22:30',
    level: 'warning',
    message: 'High memory usage detected',
    source: 'SystemMonitor',
    details: 'Memory usage exceeded 80% threshold',
  },
  {
    id: '3',
    timestamp: '2024-02-28 14:21:15',
    level: 'info',
    message: 'User authentication successful',
    source: 'AuthService',
    details: 'User logged in from new device',
  },
  {
    id: '4',
    timestamp: '2024-02-28 14:20:00',
    level: 'error',
    message: 'Database query failed',
    source: 'DataService',
    details: 'Syntax error in SQL query',
  },
  {
    id: '5',
    timestamp: '2024-02-28 14:19:30',
    level: 'info',
    message: 'Backup completed successfully',
    source: 'BackupService',
    details: 'All files backed up to cloud storage',
  },
]

interface LogViewerProps {
  level?: 'error' | 'warning' | 'info'
}

export function LogViewer({ level }: LogViewerProps) {
  const [expandedLogs, setExpandedLogs] = useState<string[]>([])

  const filteredLogs = level
    ? mockLogs.filter(log => log.level === level)
    : mockLogs

  const toggleLogExpansion = (logId: string) => {
    setExpandedLogs(current =>
      current.includes(logId)
        ? current.filter(id => id !== logId)
        : [...current, logId]
    )
  }

  return (
    <ScrollArea className="h-[600px] rounded-md border">
      <div className="divide-y">
        {filteredLogs.map(log => (
          <div
            key={log.id}
            className="cursor-pointer p-4 hover:bg-muted/50"
            onClick={() => toggleLogExpansion(log.id)}
          >
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      log.level === 'error'
                        ? 'destructive'
                        : log.level === 'warning'
                          ? 'secondary'
                          : 'default'
                    }
                  >
                    {log.level}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {log.timestamp}
                  </span>
                </div>
                <p className="font-medium">{log.message}</p>
                <p className="text-sm text-muted-foreground">
                  Source: {log.source}
                </p>
              </div>
            </div>
            {expandedLogs.includes(log.id) && log.details && (
              <div className="mt-2 rounded-md bg-muted p-2">
                <pre className="whitespace-pre-wrap text-sm">{log.details}</pre>
              </div>
            )}
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}
