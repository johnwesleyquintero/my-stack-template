export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          created_at: string
          email: string | null
          name: string | null
        }
        Insert: {
          id: string
          created_at?: string
          email?: string | null
          name?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          email?: string | null
          name?: string | null
        }
      }
      // Add other tables as needed
    }
    Views: {
      // Add your Supabase views here
    }
    Functions: {
      // Add your Supabase functions here
    }
    Enums: {
      // Add your Supabase enums here
    }
  }
}

