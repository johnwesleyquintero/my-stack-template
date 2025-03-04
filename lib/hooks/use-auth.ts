'use client'

import { useSupabase } from '@/components/providers/supabase-provider'
import { useRouter } from 'next/navigation'

export function useAuth() {
  const { supabase, user } = useSupabase()
  const router = useRouter()

  const signOut = async () => {
    await supabase.auth.signOut()
    router.push('/auth/login')
  }

  return {
    user,
    signOut,
    isAuthenticated: !!user,
  }
}
