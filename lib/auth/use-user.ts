'use client'

import { useState, useEffect } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase/index'
import type { UserProfile, TrialInfo } from '@/lib/types/auth'

export function useUser() {
  const [user, setUser] = useState<any | null>(null)
  const [isInitializing, setIsInitializing] = useState(true)
  const queryClient = useQueryClient()

  // Initialize auth state with better error handling
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Get the current session
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession()

        if (sessionError) {
          console.error('Error getting session:', sessionError)
          setIsInitializing(false)
          return
        }

        if (session?.user) {
          setUser(session.user)
        }

        try {
          // Set up auth state change listener
          const {
            data: { subscription },
            error: subscriptionError,
          } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (session?.user) {
              setUser(session.user)
              queryClient.invalidateQueries({ queryKey: ['auth', 'profile'] })
            } else {
              setUser(null)
            }

            // Handle specific auth events
            if (event === 'SIGNED_OUT') {
              queryClient.clear()
            }
          })

          if (subscriptionError) {
            throw subscriptionError
          }

          setIsInitializing(false)

          // Clean up subscription on unmount
          return () => {
            subscription.unsubscribe()
          }
        } catch (error) {
          console.error('Failed to set up auth state change listener:', error)
          setIsInitializing(false)
        }
      } catch (error) {
        console.error('Failed to initialize auth:', error)
        setIsInitializing(false)
      }
    }

    initializeAuth()
  }, [queryClient])

  // Fetch user profile when user changes
  const { data: userProfile, isLoading: isProfileLoading } = useQuery({
    queryKey: ['auth', 'profile', user?.id],
    queryFn: async () => {
      if (!user?.id) return null

      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single()

      if (error) {
        console.error('Error fetching user profile:', error)
        throw error
      }

      return data as UserProfile
    },
    enabled: !!user?.id,
  })

  // Calculate trial info
  const trialInfo = userProfile ? calculateTrialInfo(userProfile) : null

  return {
    user,
    userProfile,
    trialInfo,
    isLoading: isProfileLoading,
    isInitializing,
  }
}

// Helper function to calculate trial info
function calculateTrialInfo(profile: UserProfile): TrialInfo | null {
  if (!profile.trial_end_date) {
    return null
  }

  const now = new Date()
  const endDate = new Date(profile.trial_end_date)
  const daysRemaining = Math.max(
    0,
    Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  )

  return {
    isActive: daysRemaining > 0 && !!profile.is_trial_active,
    daysRemaining,
    endDate: profile.trial_end_date,
  }
}
