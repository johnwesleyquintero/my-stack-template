import { createClient } from "@supabase/supabase-js"

// Mock Supabase client for v0 environment if NEXT_PUBLIC_VERCEL_ENV is preview
export const supabase =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "preview"
    ? {
        auth: {
          getUser: async () => ({ data: { user: null }, error: null }),
          getSession: async () => ({ data: { session: null }, error: null }),
          signInWithPassword: async () => ({ data: { user: null }, error: null }),
          signUp: async () => ({ data: { user: null }, error: null }),
          signOut: async () => ({ error: null }),
        },
        from: () => ({
          select: () => ({
            eq: () => ({
              single: async () => ({ data: null, error: null }),
            }),
          }),
          insert: async () => ({ error: null }),
          update: async () => ({ error: null }),
        }),
      }
    : createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

