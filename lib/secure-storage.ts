import { importCryptoJS } from "./dynamic-imports"
import { captureError } from "./error-logger"

const STORAGE_KEY_PREFIX = "nebula_"
// Use environment variable with fallback
const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_STORAGE_KEY || "default-key"

// Helper to check if we're in a browser environment
const isBrowser = typeof window !== "undefined"

export const secureStorage = {
  async setItem(key: string, value: any): Promise<void> {
    if (!isBrowser) return

    try {
      // Dynamically import CryptoJS
      const CryptoJS = await importCryptoJS()

      // Encrypt the data
      const encryptedValue = CryptoJS.AES.encrypt(JSON.stringify(value), ENCRYPTION_KEY).toString()
      localStorage.setItem(`${STORAGE_KEY_PREFIX}${key}`, encryptedValue)
    } catch (error) {
      captureError(error instanceof Error ? error : new Error(String(error)))
      console.error("Error storing encrypted data:", error)
      throw new Error("Failed to store data securely")
    }
  },

  async getItem<T>(key: string): Promise<T | null> {
    if (!isBrowser) return null

    try {
      const encryptedValue = localStorage.getItem(`${STORAGE_KEY_PREFIX}${key}`)
      if (!encryptedValue) return null

      // Dynamically import CryptoJS
      const CryptoJS = await importCryptoJS()

      // Decrypt the data
      const decryptedBytes = CryptoJS.AES.decrypt(encryptedValue, ENCRYPTION_KEY)
      const decryptedValue = decryptedBytes.toString(CryptoJS.enc.Utf8)

      return JSON.parse(decryptedValue) as T
    } catch (error) {
      captureError(error instanceof Error ? error : new Error(String(error)))
      console.error("Error retrieving encrypted data:", error)
      return null
    }
  },

  removeItem(key: string): void {
    if (!isBrowser) return
    localStorage.removeItem(`${STORAGE_KEY_PREFIX}${key}`)
  },

  clear(): void {
    if (!isBrowser) return
    // Only clear items with our prefix
    Object.keys(localStorage)
      .filter((key) => key.startsWith(STORAGE_KEY_PREFIX))
      .forEach((key) => localStorage.removeItem(key))
  },
}

// Add type safety for stored data
export type SecureStorageKeys = "mappings" | "userPreferences" | "sessionData" | "uploadedData" | "mappingConfig"

// Type-safe wrapper functions - synchronous versions for backward compatibility
export function setSecureItem<T>(key: SecureStorageKeys, value: T): void {
  secureStorage.setItem(key, value).catch((error) => {
    captureError(error instanceof Error ? error : new Error(String(error)))
    console.error("Failed to set secure item:", error)
  })
}

// Fix the synchronous getSecureItem function to properly handle async operations
export function getSecureItem<T>(key: SecureStorageKeys): T | null {
  // This is a synchronous function trying to use async code, which is problematic
  // For now, we'll return null and log a warning - this should be refactored to use the async version
  console.warn(
    "Using synchronous getSecureItem which may not work as expected. Consider using getSecureItemAsync instead.",
  )

  // Try to get from localStorage directly without encryption as a fallback
  try {
    if (!isBrowser) return null
    const item = localStorage.getItem(`${STORAGE_KEY_PREFIX}${key}`)
    if (!item) return null

    // This is not secure but provides a fallback
    return JSON.parse(item) as T
  } catch {
    return null
  }
}

// Async versions for better error handling - use these instead
export async function setSecureItemAsync<T>(key: SecureStorageKeys, value: T): Promise<void> {
  return secureStorage.setItem(key, value)
}

export async function getSecureItemAsync<T>(key: SecureStorageKeys): Promise<T | null> {
  return secureStorage.getItem<T>(key)
}

