"use server"

import { revalidatePath } from "next/cache"
import { createServerAction } from "@/lib/supabase/server-actions"
import { validateDataSet, type FieldType } from "@/lib/data-validation"
import { processChunk } from "@/lib/data-processing/processor"
import type { ProcessingResult, ValidationResult } from "@/lib/types/data"

/**
 * Server action to process data in chunks
 */
export async function processDataServerSide(
  data: any[],
  options: {
    chunkSize?: number
    mappings: Record<string, FieldType>
    validate?: boolean
  },
): Promise<ProcessingResult> {
  const { chunkSize = 1000, mappings, validate = true } = options

  try {
    // Validate data if required
    if (validate) {
      const validation = await validateDataSet(data, mappings)
      if (!validation.isValid) {
        return {
          success: false,
          errors: validation.errors,
        }
      }
    }

    // Process data in chunks
    const chunks = Math.ceil(data.length / chunkSize)
    const results = []

    for (let i = 0; i < chunks; i++) {
      const chunk = data.slice(i * chunkSize, (i + 1) * chunkSize)
      const processedChunk = await processChunk(chunk, mappings)
      results.push(...processedChunk)
    }

    // Store results in Supabase
    const supabase = createServerAction()
    const { error } = await supabase.from("processed_data").insert({
      data: results,
      processed_at: new Date().toISOString(),
    })

    if (error) throw error

    // Revalidate relevant paths
    revalidatePath("/dashboard")
    revalidatePath("/export")

    return {
      success: true,
      data: results,
    }
  } catch (error) {
    console.error("Data processing error:", error)
    return {
      success: false,
      errors: [error instanceof Error ? error.message : "Processing failed"],
    }
  }
}

/**
 * Server action to validate data in batches
 */
export async function validateDataBatch(
  data: any[],
  mappings: Record<string, FieldType>,
  batchSize = 100,
): Promise<ValidationResult> {
  try {
    const batches = Math.ceil(data.length / batchSize)
    const errors: string[] = []
    let validCount = 0

    for (let i = 0; i < batches; i++) {
      const batch = data.slice(i * batchSize, (i + 1) * batchSize)
      const validation = await validateDataSet(batch, mappings)

      if (!validation.isValid) {
        errors.push(...validation.errors)
      } else {
        validCount += batch.length
      }
    }

    return {
      isValid: errors.length === 0,
      validCount,
      totalCount: data.length,
      errors,
    }
  } catch (error) {
    console.error("Batch validation error:", error)
    return {
      isValid: false,
      validCount: 0,
      totalCount: data.length,
      errors: [error instanceof Error ? error.message : "Validation failed"],
    }
  }
}

