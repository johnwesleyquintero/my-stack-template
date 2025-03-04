'use client'

import type React from 'react'

import { toast } from 'sonner'
import { Check, AlertCircle, Info, AlertTriangle } from 'lucide-react'

type ToastType = 'success' | 'error' | 'info' | 'warning'

interface ToastOptions {
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
}

const icons: Record<ToastType, React.ReactNode> = {
  success: <Check className="h-4 w-4" />,
  error: <AlertCircle className="h-4 w-4" />,
  info: <Info className="h-4 w-4" />,
  warning: <AlertTriangle className="h-4 w-4" />,
}

export function showToast(
  type: ToastType,
  title: string,
  options?: ToastOptions
) {
  toast[type](title, {
    icon: icons[type],
    description: options?.description,
    action: options?.action && {
      label: options.action.label,
      onClick: options.action.onClick,
    },
  })
}
