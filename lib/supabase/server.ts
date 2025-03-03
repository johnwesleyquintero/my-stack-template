// Re-export everything from the app directory server file
export { createServerClient } from "@/app/supabase-server"

// Re-export the createServerComponentClient for compatibility
export { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

// Re-export createClient for compatibility
export { createClient } from "./index"

