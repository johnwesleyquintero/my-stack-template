import { type Session, type User } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/client'
import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface UseAuth {
  user: User | null
  session: Session | null
  loading: boolean
  error: Error | null
  signIn: (email: string, password: string) => Promise<void>
  signUp: (
    email: string,
    password: string,
    metadata?: { [key: string]: any }
  ) => Promise<void>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
}

export function useAuth(): UseAuth {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const signIn = useCallback(
    async (email: string, password: string) => {
      try {
        setLoading(true)
        setError(null)
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) throw error
        router.refresh()
        router.push('/dashboard')
      } catch (error) {
        setError(
          error instanceof Error ? error : new Error('An error occurred')
        )
        throw error
      } finally {
        setLoading(false)
      }
    },
    [router]
  )

  const signUp = useCallback(
    async (
      email: string,
      password: string,
      metadata?: { [key: string]: any }
    ) => {
      try {
        setLoading(true)
        setError(null)
        const { error, data } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: metadata,
          },
        })
        if (error) throw error

        // Create profile if user was created
        if (data.user) {
          const { error: profileError } = await supabase
            .from('profiles')
            .insert([
              {
                id: data.user.id,
                ...metadata,
              },
            ])
          if (profileError) throw profileError
        }

        router.refresh()
        router.push('/dashboard')
      } catch (error) {
        setError(
          error instanceof Error ? error : new Error('An error occurred')
        )
        throw error
      } finally {
        setLoading(false)
      }
    },
    [router]
  )

  const signOut = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      router.refresh()
      router.push('/login')
    } catch (error) {
      setError(error instanceof Error ? error : new Error('An error occurred'))
      throw error
    } finally {
      setLoading(false)
    }
  }, [router])

  const resetPassword = useCallback(async (email: string) => {
    try {
      setLoading(true)
      setError(null)
      const { error } = await supabase.auth.resetPasswordForEmail(email)
      if (error) throw error
    } catch (error) {
      setError(error instanceof Error ? error : new Error('An error occurred'))
      throw error
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    user,
    session,
    loading,
    error,
    signIn,
    signUp,
    signOut,
    resetPassword,
  }
}
