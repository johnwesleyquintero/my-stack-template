'use client'

import { useState, useEffect } from 'react'
import { validateField, type FieldType } from '@/lib/data-validation'
import { getSecureItemAsync, setSecureItemAsync } from '@/lib/secure-storage'
import { validateDataServerSide } from '@/lib/actions/file-actions'
import { showToast } from '@/components/toast-utils'
import { captureError } from '@/lib/error-logger'

export interface MappingState {
  sourceField: string
  targetField: FieldType
  isValid: boolean
}

export function useFieldMapping(uploadedData: any | null) {
  const [mappings, setMappings] = useState<MappingState[]>([])
  const [validationProgress, setValidationProgress] = useState(0)
  const [isValidating, setIsValidating] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  // Load saved mappings on mount and when uploadedData changes
  useEffect(() => {
    const loadMappings = async () => {
      try {
        // Only load mappings if we have data
        if (uploadedData?.data) {
          const savedMappings =
            await getSecureItemAsync<MappingState[]>('mappings')
          if (savedMappings) {
            // Validate that the saved mappings match the current data fields
            const currentFields = Object.keys(uploadedData.data[0])
            const validMappings = savedMappings.filter(mapping =>
              currentFields.includes(mapping.sourceField)
            )
            if (validMappings.length > 0) {
              setMappings(validMappings)
            }
          }

          // Check if mapping is already complete
          const mappingComplete =
            sessionStorage.getItem('mappingComplete') === 'true'
          setIsComplete(mappingComplete)
        }
      } catch (error) {
        captureError(error instanceof Error ? error : new Error(String(error)))
        console.error('Failed to load saved mappings:', error)
      }
    }

    loadMappings()
  }, [uploadedData])

  const handleMappingChange = async (
    sourceField: string,
    targetField: FieldType
  ) => {
    if (!uploadedData?.data) {
      showToast('error', 'No data available')
      return
    }

    const newMapping: MappingState = {
      sourceField,
      targetField,
      isValid: false,
    }

    try {
      // Validate the mapping with sample data
      const sampleValues = uploadedData.data
        .slice(0, 5)
        .map((row: any) => row[sourceField])
      let validCount = 0

      for (const value of sampleValues) {
        const validation = validateField(targetField, value)
        if (validation.isValid) validCount++
      }

      setValidationProgress((validCount / sampleValues.length) * 100)
      newMapping.isValid = validCount === sampleValues.length

      setMappings(prev => {
        const updated = prev.filter(m => m.sourceField !== sourceField)
        return [...updated, newMapping]
      })

      // Save mapping progress
      await setSecureItemAsync('mappings', mappings)
    } catch (error) {
      captureError(error instanceof Error ? error : new Error(String(error)))
      showToast('error', 'Failed to validate mapping')
    }
  }

  const validateAllMappings = async () => {
    if (!uploadedData?.data) {
      showToast('error', 'No data to validate')
      return false
    }

    try {
      setIsValidating(true)
      setIsSaving(true)

      const mappingsObject = mappings.reduce(
        (acc, m) => ({
          ...acc,
          [m.sourceField]: m.targetField,
        }),
        {}
      )

      // Validate on the server
      const validation = await validateDataServerSide(
        uploadedData.data,
        mappingsObject
      )

      if (validation.isValid) {
        // Save mappings using async methods
        await setSecureItemAsync('mappings', mappings)
        await setSecureItemAsync('mappingConfig', mappingsObject)

        // Set flags for completion
        sessionStorage.setItem('mappingComplete', 'true')
        setIsComplete(true)
        showToast('success', 'Mappings validated successfully')
        return true
      } else {
        showToast('error', 'Validation failed', {
          description: validation.errors[0],
        })
        return false
      }
    } catch (error) {
      captureError(error instanceof Error ? error : new Error(String(error)))
      showToast('error', 'Validation failed', {
        description: 'An unexpected error occurred',
      })
      return false
    } finally {
      setIsValidating(false)
      setIsSaving(false)
    }
  }

  const resetMappings = async () => {
    try {
      setMappings([])
      setValidationProgress(0)
      setIsComplete(false)
      await setSecureItemAsync('mappings', [])
      sessionStorage.removeItem('mappingComplete')
      showToast('success', 'Mappings reset successfully')
    } catch (error) {
      captureError(error instanceof Error ? error : new Error(String(error)))
      showToast('error', 'Failed to reset mappings')
    }
  }

  return {
    mappings,
    validationProgress,
    isValidating,
    isSaving,
    isComplete,
    handleMappingChange,
    validateAllMappings,
    resetMappings,
  }
}
