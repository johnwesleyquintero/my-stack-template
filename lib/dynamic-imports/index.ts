/**
 * Centralized dynamic imports with retry logic
 */

interface ImportConfig {
  retries?: number
  timeout?: number
}

/**
 * Helper function to retry failed imports
 */
async function retryImport<T>(
  importFn: () => Promise<T>,
  { retries = 3, timeout = 1000 }: ImportConfig = {},
): Promise<T> {
  try {
    return await importFn()
  } catch (error) {
    if (retries > 0) {
      await new Promise((resolve) => setTimeout(resolve, timeout))
      return retryImport(importFn, { retries: retries - 1, timeout })
    }
    throw error
  }
}

/**
 * Dynamic import for XLSX with chunking
 */
export async function importXLSX() {
  const chunk = await retryImport(() => import("xlsx"))
  return chunk.default
}

/**
 * Dynamic import for Papa Parse
 */
export async function importPapaParse() {
  const chunk = await retryImport(() => import("papaparse"))
  return chunk.default
}

/**
 * Dynamic import for Mermaid
 */
export async function importMermaid() {
  const chunk = await retryImport(() => import("mermaid"))
  return chunk.default
}

/**
 * Preload important chunks
 */
export function preloadChunks() {
  // Preload XLSX for data processing pages
  if (typeof window !== "undefined" && window.location.pathname.includes("/data")) {
    importXLSX()
  }
}

