'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth/auth-context'
import { showToast } from '@/components/toast-utils'

export function GoogleDriveConnect() {
  const { userProfile, signInWithGoogle } = useAuth()
  const [isConnecting, setIsConnecting] = useState(false)

  const handleConnect = async () => {
    if (!userProfile?.google_drive_connected) {
      setIsConnecting(true)
      try {
        await signInWithGoogle()
      } catch (error) {
        showToast('error', 'Failed to connect to Google Drive', {
          description: 'Please try again',
        })
      } finally {
        setIsConnecting(false)
      }
    }
  }

  if (userProfile?.google_drive_connected) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">
          Connected to Google Drive
        </span>
        <Button variant="outline" size="sm">
          Disconnect
        </Button>
      </div>
    )
  }

  return (
    <Button onClick={handleConnect} disabled={isConnecting}>
      {isConnecting ? 'Connecting...' : 'Connect Google Drive'}
    </Button>
  )
}
