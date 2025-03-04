"use client"

import { useState, useCallback } from 'react'
import { useFileProcessing } from '@/hooks/useFileProcessing'
import { useFileValidation } from '@/hooks/useFileValidation'
import { useErrorHandler } from '@/hooks/useErrorHandler'
import { useLoadingState } from '@/hooks/useLoadingState'
import { QueueManager } from '@/lib/utils/queue-manager'

interface FileUploaderProps {
  onUploadComplete: (result: any) => void
  acceptedTypes: string[]
  maxConcurrent?: number
}

export function FileUploader({ 
  onUploadComplete, 
  acceptedTypes,
  maxConcurrent = 3 
}: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const { processFile } = useFileProcessing()
  const validator = useFileValidation(acceptedTypes)
  const { error, handleError, clearError } = useErrorHandler()
  const { isLoading, progress, startLoading, updateProgress, stopLoading } = useLoadingState()

  const queueManager = useCallback(
    () => new QueueManager(async (file: File) => {
      try {
        const result = await processFile(file)
        onUploadComplete(result)
      } catch (err) {
        handleError(err)
      }
    }, maxConcurrent),
    [maxConcurrent, onUploadComplete, handleError]
  )

  const handleDragEvents = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(e.type === 'dragenter' || e.type === 'dragover')
  }

  const handleDrop = (e: React.DragEvent) => {
    handleDragEvents(e)
    const files = Array.from(e.dataTransfer.files)
    handleFiles(files)
  }

  const handleFiles = async (files: File[]) => {
    const validFiles = files.filter(validator.isValid)
    if (validFiles.length === 0) return

    try {
      const results = await Promise.all(
        validFiles.map(processFile)
      )
      onUploadComplete(results)
    } catch (error) {
      console.error('File processing failed:', error)
    }
  }

  return (
    <div
      onDragEnter={handleDragEvents}
      onDragOver={handleDragEvents}
      onDragLeave={handleDragEvents}
      onDrop={handleDrop}
      className={`upload-zone ${isDragging ? 'dragging' : ''}`}
    >
      {isLoading ? 'Processing...' : 'Drop files here'}
    </div>
  )
}
