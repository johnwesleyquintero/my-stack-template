'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Upload, File, AlertCircle, Database } from 'lucide-react'
import { uploadToBlob } from '@/lib/blob-storage'
import { setSecureItemAsync } from '@/lib/secure-storage'
import { captureError } from '@/lib/error-logger'
import { showToast } from '@/components/toast-utils'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { DataMappingInterface } from './data-mapping/DataMappingInterface'
import type { FieldMapping } from '@/lib/data-processing/transform'
import { transformData } from '@/lib/data-processing/transform'
import { Check, ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Loader2, ArrowLeft } from 'lucide-react'
import { DataPreview } from './data-preview'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ManualDataEntry } from './manual-data-entry'
import { SampleDataSelector } from './sample-data-selector'

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

interface UploadedFile {
  name: string
  size: number
  url: string
  type: string
}

export function FileUploader() {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [error, setError] = useState<string | null>(null)
  const [uploadedData, setUploadedData] = useState<any[] | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [currentStep, setCurrentStep] = useState<
    'upload' | 'mapping' | 'preview'
  >('upload')
  const [activeTab, setActiveTab] = useState<'file' | 'manual' | 'sample'>(
    'file'
  )
  const [isOfflineMode, setIsOfflineMode] = useState(false)

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return

      setIsUploading(true)
      setUploadProgress(0)
      setError(null)

      try {
        // Process each file
        for (let i = 0; i < acceptedFiles.length; i++) {
          const file = acceptedFiles[i]

          // Update progress for upload start
          setUploadProgress(Math.round((i / acceptedFiles.length) * 33))

          // Check if we're in offline mode
          if (isOfflineMode) {
            // Process file locally without uploading
            const reader = new FileReader()

            reader.onload = async e => {
              try {
                const fileContent = e.target?.result as string
                let parsedData

                if (file.type === 'text/csv') {
                  // Simple CSV parsing
                  const lines = fileContent
                    .split('\n')
                    .filter(line => line.trim())
                  const headers = lines[0].split(',').map(h => h.trim())

                  parsedData = lines.slice(1).map(line => {
                    const values = line.split(',').map(v => v.trim())
                    return headers.reduce(
                      (obj, header, index) => {
                        obj[header] = values[index] || ''
                        return obj
                      },
                      {} as Record<string, string>
                    )
                  })
                } else if (file.type.includes('json')) {
                  parsedData = JSON.parse(fileContent)
                } else {
                  // For Excel files, show a message that they need to be online
                  throw new Error(
                    'Excel files require online processing. Please switch to online mode.'
                  )
                }

                // Store the parsed data
                await setSecureItemAsync('uploadedData', { data: parsedData })

                // Set flags for data availability
                sessionStorage.setItem('hasUploadedData', 'true')

                setUploadedFiles([
                  {
                    name: file.name,
                    size: file.size,
                    url: URL.createObjectURL(file), // Create a local URL
                    type: file.type,
                  },
                ])

                setUploadProgress(100)

                showToast('success', 'File processed locally', {
                  description: `${file.name} has been processed in offline mode`,
                })
              } catch (err) {
                captureError(
                  err instanceof Error ? err : new Error(String(err))
                )
                setError(
                  err instanceof Error
                    ? err.message
                    : 'Failed to process file locally'
                )
                showToast('error', 'Local processing failed', {
                  description:
                    err instanceof Error
                      ? err.message
                      : 'An unexpected error occurred',
                })
              }
            }

            reader.onerror = () => {
              setError('Failed to read file')
              showToast('error', 'File reading failed', {
                description: 'Could not read the file contents',
              })
            }

            reader.readAsText(file)
          } else {
            // Online mode - Upload to Blob Storage
            const blobData = await uploadToBlob(file)

            // Update progress for upload complete
            setUploadProgress(Math.round((i / acceptedFiles.length) * 66))

            // Add to uploaded files
            setUploadedFiles(prev => [
              ...prev,
              {
                name: file.name,
                size: file.size,
                url: blobData.url,
                type: file.type,
              },
            ])

            // Update progress complete
            setUploadProgress(100)

            showToast('success', 'File uploaded successfully', {
              description: `${file.name} has been uploaded and is ready for processing`,
            })
          }
        }
      } catch (err) {
        captureError(err instanceof Error ? err : new Error(String(err)))
        setError(err instanceof Error ? err.message : 'Failed to upload files')
        showToast('error', 'Upload failed', {
          description:
            err instanceof Error ? err.message : 'An unexpected error occurred',
        })
      } finally {
        setIsUploading(false)
      }
    },
    [isOfflineMode]
  )

  const handleMappingComplete = async (mappings: FieldMapping[]) => {
    if (!uploadedData) return

    try {
      // Transform data with mappings
      const transformedData = transformData(uploadedData, mappings, {
        batchId: new Date().toISOString(),
        source: uploadedFiles[0]?.name || 'upload',
      })

      // Store processed data
      await setSecureItemAsync('processedData', transformedData)

      // Set flags for data availability
      sessionStorage.setItem('hasProcessedData', 'true')

      showToast('success', 'Data mapping complete', {
        description: 'Your data has been processed and is ready for analysis',
      })
    } catch (err) {
      captureError(err instanceof Error ? err : new Error(String(err)))
      showToast('error', 'Processing failed', {
        description:
          err instanceof Error ? err.message : 'Failed to process data',
      })
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [
        '.xlsx',
      ],
      'application/json': ['.json'],
    },
    maxSize: MAX_FILE_SIZE,
    multiple: false,
  })

  const toggleOfflineMode = () => {
    setIsOfflineMode(!isOfflineMode)
    showToast(
      !isOfflineMode ? 'info' : 'success',
      !isOfflineMode ? 'Offline mode enabled' : 'Online mode enabled',
      {
        description: !isOfflineMode
          ? 'Files will be processed locally without uploading'
          : 'Files will be uploaded for processing',
      }
    )
  }

  return (
    <div className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="flex justify-end">
        <Button
          variant="outline"
          onClick={toggleOfflineMode}
          className={
            isOfflineMode
              ? 'bg-amber-100 hover:bg-amber-200 dark:bg-amber-900/30 dark:hover:bg-amber-900/50'
              : ''
          }
        >
          <Database className="mr-2 h-4 w-4" />
          {isOfflineMode ? 'Offline Mode (Local Processing)' : 'Online Mode'}
        </Button>
      </div>

      {uploadedFiles.length === 0 ? (
        <Tabs
          value={activeTab}
          onValueChange={value =>
            setActiveTab(value as 'file' | 'manual' | 'sample')
          }
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="file">File Upload</TabsTrigger>
            <TabsTrigger value="manual">Manual Entry</TabsTrigger>
            <TabsTrigger value="sample">Sample Data</TabsTrigger>
          </TabsList>

          <TabsContent value="file">
            <div
              {...getRootProps()}
              className={`cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
                isDragActive
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <input {...getInputProps()} />
              <div className="flex flex-col items-center justify-center space-y-4">
                <Upload className="h-10 w-10 text-muted-foreground" />
                <div>
                  <p className="text-lg font-medium">Drag & drop files here</p>
                  <p className="text-sm text-muted-foreground">
                    or click to browse (CSV, Excel, JSON)
                  </p>
                  {isOfflineMode && (
                    <p className="mt-2 text-sm text-amber-600 dark:text-amber-400">
                      Offline mode: Files will be processed locally
                    </p>
                  )}
                </div>
                <Button disabled={isUploading}>
                  {isUploading ? 'Uploading...' : 'Select Files'}
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="manual">
            <ManualDataEntry />
          </TabsContent>

          <TabsContent value="sample">
            <SampleDataSelector />
          </TabsContent>
        </Tabs>
      ) : (
        <>
          <div className="space-y-2">
            <p className="text-sm font-medium">Uploaded Files</p>
            <div className="space-y-4">
              {uploadedFiles.map((file, index) => (
                <div key={index} className="flex flex-col space-y-4">
                  <div className="flex items-center rounded-md border bg-muted/50 p-3">
                    <File className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{file.name}</span>
                    <span className="ml-auto text-xs text-muted-foreground">
                      {(file.size / 1024).toFixed(1)} KB
                    </span>
                    <Badge variant="secondary" className="ml-2">
                      {currentStep === 'upload'
                        ? 'Ready to Process'
                        : 'Processing...'}
                    </Badge>
                    {isOfflineMode && (
                      <Badge
                        variant="outline"
                        className="ml-2 bg-amber-100 dark:bg-amber-900/30"
                      >
                        Offline
                      </Badge>
                    )}
                  </div>

                  {/* Data Preview */}
                  <DataPreview blobUrl={file.url} maxRows={5} />

                  {currentStep === 'upload' && (
                    <div className="rounded-md border p-4">
                      <h4 className="mb-3 text-sm font-medium">Next Steps:</h4>
                      <div className="space-y-3">
                        <div className="flex items-center text-sm">
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          <span>
                            File {isOfflineMode ? 'processed' : 'uploaded'}{' '}
                            successfully
                          </span>
                        </div>
                        <div className="flex items-center text-sm">
                          <ArrowRight className="mr-2 h-4 w-4 text-primary" />
                          <span>Click below to process and map your data</span>
                        </div>
                      </div>

                      <div className="mt-4">
                        <Button
                          onClick={() => {
                            setIsProcessing(true)
                            setCurrentStep('mapping')
                          }}
                          disabled={isProcessing}
                        >
                          {isProcessing ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Processing Data...
                            </>
                          ) : (
                            <>
                              Process & Map Data
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {currentStep === 'mapping' && uploadedData && (
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Map Your Data</h3>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setCurrentStep('upload')
                    setIsProcessing(false)
                  }}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Upload
                </Button>
              </div>
              <DataMappingInterface
                data={uploadedData}
                onMappingComplete={async mappings => {
                  await handleMappingComplete(mappings)
                  // After mapping is complete, you can proceed to analysis
                  window.location.href = '/analysis'
                }}
              />
            </div>
          )}
        </>
      )}

      {isUploading && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Uploading...</span>
            <span>{uploadProgress}%</span>
          </div>
          <Progress value={uploadProgress} />
        </div>
      )}
    </div>
  )
}
