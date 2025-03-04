import { createClient } from '@supabase/supabase-js'
import type { SupabaseClient } from '@supabase/supabase-js'

// Create a more complete mock client that matches the Supabase interface
const createMockClient = () =>
  ({
    auth: {
      getUser: async () => ({ data: { user: null }, error: null }),
      getSession: async () => ({ data: { session: null }, error: null }),
      signInWithPassword: async () => ({ data: { user: null }, error: null }),
      signUp: async () => ({ data: { user: null }, error: null }),
      signOut: async () => ({ error: null }),
      onAuthStateChange: () => {
        return {
          data: { subscription: { unsubscribe: () => {} } },
          error: null,
        }
      },
      refreshSession: async () => ({ data: { session: null }, error: null }),
      updateUser: async () => ({ data: { user: null }, error: null }),
    },
    from: (table: string) => ({
      select: () => ({
        eq: () => ({
          single: async () => ({ data: null, error: null }),
        }),
      }),
      insert: async () => ({ error: null }),
      update: async () => ({ error: null }),
    }),
  }) as unknown as SupabaseClient

// Initialize Supabase client with better error handling
function initializeSupabase(): SupabaseClient {
  // Check if we're in a preview environment
  if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview') {
    console.warn('Using mock Supabase client in preview environment')
    return createMockClient()
  }

  // Get environment variables
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Check for required environment variables
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Missing Supabase environment variables, using mock client')
    return createMockClient()
  }

  // Validate URL format
  try {
    // Only attempt URL construction if the URL looks like it might be valid
    if (
      supabaseUrl.startsWith('http://') ||
      supabaseUrl.startsWith('https://')
    ) {
      new URL(supabaseUrl)

      // If URL is valid, create the real client
      return createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true,
        },
      })
    } else {
      throw new Error('Invalid URL format')
    }
  } catch (error) {
    console.warn('Invalid Supabase URL, using mock client:', error)
    return createMockClient()
  }
}

// Export the initialized client
export const supabase = initializeSupabase()
