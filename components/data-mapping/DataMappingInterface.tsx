'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowRight, Save, Undo } from 'lucide-react'
import {
  type FieldMapping,
  type FieldType,
  FieldTypes,
} from '@/lib/data-processing/transform'
import { getSecureItemAsync, setSecureItemAsync } from '@/lib/secure-storage'
import { useColumnLibrary } from '@/lib/hooks/use-column-library'
import type { ColumnDefinition } from '@/lib/data-mapping/column-library'
import { showToast } from '@/components/toast-utils'

interface DataMappingInterfaceProps {
  data: any[]
  onMappingComplete: (mappings: FieldMapping[]) => void
}

export function DataMappingInterface({
  data,
  onMappingComplete,
}: DataMappingInterfaceProps) {
  const [sourceFields, setSourceFields] = useState<string[]>([])
  const [mappings, setMappings] = useState<FieldMapping[]>([])
  const [previewData, setPreviewData] = useState<any[]>([])
  const {
    isLoading: isLoadingLibrary,
    suggestions,
    getSuggestions,
    learnMapping,
    createColumn,
  } = useColumnLibrary()

  // Load source fields from data
  useEffect(() => {
    if (data && data.length > 0) {
      const fields = Object.keys(data[0])
      setSourceFields(fields)
      setPreviewData(data.slice(0, 5)) // Show first 5 rows for preview
      getSuggestions(fields)
    }
  }, [data, getSuggestions])

  // Load saved mappings
  useEffect(() => {
    const loadSavedMappings = async () => {
      const saved = await getSecureItemAsync<FieldMapping[]>('fieldMappings')
      if (saved) {
        setMappings(saved)
      }
    }
    loadSavedMappings()
  }, [])

  // Update mapping for a field
  const updateMapping = (
    sourceField: string,
    targetField: string,
    type: FieldType
  ) => {
    setMappings(prev => {
      const existing = prev.findIndex(m => m.sourceField === sourceField)
      const newMapping: FieldMapping = { sourceField, targetField, type }

      if (existing >= 0) {
        const updated = [...prev]
        updated[existing] = newMapping
        return updated
      }
      return [...prev, newMapping]
    })
  }

  // Update mapping with suggestion
  const updateMappingWithSuggestion = async (
    sourceField: string,
    suggestion: ColumnDefinition
  ) => {
    // Update mapping
    updateMapping(sourceField, suggestion.name, suggestion.type)

    // Learn from this mapping
    const samples = previewData
      .map(row => String(row[sourceField]))
      .filter(Boolean)
    await learnMapping(sourceField, suggestion, samples)
  }

  // Create new column definition
  const handleCreateColumn = async (
    sourceField: string,
    name: string,
    category: string,
    type: string
  ) => {
    try {
      const newColumn = await createColumn(name, category, type, [sourceField])
      updateMapping(sourceField, newColumn.name, newColumn.type)
    } catch (error) {
      showToast('error', 'Failed to create column definition')
    }
  }

  // Save mappings
  const saveMappings = async () => {
    await setSecureItemAsync('fieldMappings', mappings)
    onMappingComplete(mappings)
  }

  // Reset mappings
  const resetMappings = () => {
    setMappings([])
  }

  const handleNotification = ({
    variant,
    message,
  }: {
    variant: 'success' | 'error' | 'warning'
    message: string
  }) => {
    showToast(variant, message)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Data Mapping</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sourceFields.map(field => {
              const suggestion = suggestions.get(field)

              return (
                <div
                  key={field}
                  className="grid grid-cols-8 items-center gap-4"
                >
                  <div className="col-span-3">
                    <Label>{field}</Label>
                    <div className="mt-1 text-sm text-muted-foreground">
                      Sample: {String(previewData[0]?.[field])}
                    </div>
                    {suggestion && (
                      <div className="mt-1">
                        <Button
                          variant="link"
                          size="sm"
                          className="h-auto p-0 text-blue-500"
                          onClick={() =>
                            updateMappingWithSuggestion(field, suggestion)
                          }
                        >
                          Suggested: {suggestion.name}
                        </Button>
                      </div>
                    )}
                  </div>

                  <ArrowRight className="col-span-1 mx-auto text-muted-foreground" />

                  <div className="col-span-2">
                    <Input
                      placeholder="Target Field Name"
                      value={
                        mappings.find(m => m.sourceField === field)
                          ?.targetField || ''
                      }
                      onChange={e =>
                        updateMapping(
                          field,
                          e.target.value,
                          mappings.find(m => m.sourceField === field)?.type ||
                            'string'
                        )
                      }
                    />
                  </div>

                  <div className="col-span-2">
                    <Select
                      value={
                        mappings.find(m => m.sourceField === field)?.type ||
                        'string'
                      }
                      onValueChange={value =>
                        updateMapping(
                          field,
                          mappings.find(m => m.sourceField === field)
                            ?.targetField || field,
                          value as FieldType
                        )
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(FieldTypes).map(type => (
                          <SelectItem key={type} value={type}>
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-6 flex justify-end space-x-4">
            <Button variant="outline" onClick={resetMappings}>
              <Undo className="mr-2 h-4 w-4" />
              Reset
            </Button>
            <Button onClick={saveMappings}>
              <Save className="mr-2 h-4 w-4" />
              Save Mappings
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Preview Card */}
      <Card>
        <CardHeader>
          <CardTitle>Data Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  {sourceFields.map(field => (
                    <th key={field} className="border bg-muted p-2 text-left">
                      {field}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {previewData.map((row, i) => (
                  <tr key={i}>
                    {sourceFields.map(field => (
                      <td key={field} className="border p-2">
                        {String(row[field])}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
