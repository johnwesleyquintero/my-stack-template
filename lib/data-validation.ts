import { z } from 'zod'

// Define schemas for different field types
export const fieldValidators = {
  asin: z
    .string()
    .length(10)
    .regex(/^[A-Z0-9]{10}$/),
  title: z.string().min(1).max(500),
  category: z.string().min(1),
  price: z.number().positive().max(999999.99),
  units: z.number().int().nonnegative(),
  revenue: z.number().positive().max(9999999.99),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
}

export type FieldType = keyof typeof fieldValidators

export interface ValidationResult {
  isValid: boolean
  errors: string[]
}

export function validateField(
  fieldType: FieldType,
  value: any
): ValidationResult {
  try {
    // Handle undefined or null values
    if (value === undefined || value === null) {
      return {
        isValid: false,
        errors: [`Value for ${fieldType} is missing`],
      }
    }

    fieldValidators[fieldType].parse(value)
    return { isValid: true, errors: [] }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        isValid: false,
        errors: error.errors.map(err => err.message),
      }
    }
    return {
      isValid: false,
      errors: ['Invalid value'],
    }
  }
}

export function validateDataSet(
  data: Record<string, any>[],
  mappings: Record<string, FieldType>
): ValidationResult {
  const errors: string[] = []

  // Check if data is empty
  if (!data || data.length === 0) {
    return {
      isValid: false,
      errors: ['No data to validate'],
    }
  }

  // Check if mappings are empty
  if (!mappings || Object.keys(mappings).length === 0) {
    return {
      isValid: false,
      errors: ['No field mappings defined'],
    }
  }

  // Validate each row
  data.forEach((row, index) => {
    // Skip empty rows
    if (!row || Object.keys(row).length === 0) {
      errors.push(`Row ${index + 1} is empty`)
      return
    }

    Object.entries(mappings).forEach(([sourceField, targetField]) => {
      // Check if the source field exists in the row
      if (!(sourceField in row)) {
        errors.push(`Row ${index + 1}: Source field "${sourceField}" not found`)
        return
      }

      const value = row[sourceField]
      const validation = validateField(targetField, value)

      if (!validation.isValid) {
        errors.push(
          `Row ${index + 1}, field "${sourceField}": ${validation.errors.join(', ')}`
        )
      }
    })
  })

  return {
    isValid: errors.length === 0,
    errors,
  }
}

export function validateMappingConfig(
  mappings: Record<string, FieldType>,
  requiredFields: FieldType[] = ['asin', 'title']
): ValidationResult {
  const errors: string[] = []
  const mappedTargetFields = new Set(Object.values(mappings))

  // Check for required fields
  for (const field of requiredFields) {
    if (!mappedTargetFields.has(field)) {
      errors.push(`Required field "${field}" is not mapped`)
    }
  }

  // Check for duplicate mappings
  const sourceFields = Object.keys(mappings)
  const targetFields = Object.values(mappings)

  if (new Set(sourceFields).size !== sourceFields.length) {
    errors.push('Duplicate source fields detected in mapping')
  }

  if (new Set(targetFields).size !== targetFields.length) {
    errors.push('Multiple source fields are mapped to the same target field')
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}
