'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { User } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/client'
import type { UserProfile, TrialInfo } from '@/lib/types/auth'

interface AuthContextType {
  user: User | null
  userProfile: UserProfile | null
  trialInfo: TrialInfo | null
  isLoading: boolean
  isError: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
  updatePassword: (password: string) => Promise<void>
  refreshSession: () => Promise<void>
  loading: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userProfile: null,
  trialInfo: null,
  isLoading: true,
  isError: false,
  signIn: async () => {},
  signUp: async () => {},
  signInWithGoogle: async () => {},
  signOut: async () => {},
  resetPassword: async () => {},
  updatePassword: async () => {},
  refreshSession: async () => {},
  loading: true,
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [trialInfo, setTrialInfo] = useState<TrialInfo | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setUser(session.user)
        setUserProfile(session.user.user_metadata as UserProfile)
        setTrialInfo(session.user.user_metadata as TrialInfo)
      } else {
        setUser(null)
        setUserProfile(null)
        setTrialInfo(null)
      }
      setIsLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const signIn = async (email: string, password: string) => {
    // Implementation of signIn
  }

  const signUp = async (email: string, password: string) => {
    // Implementation of signUp
  }

  const signInWithGoogle = async () => {
    // Implementation of signInWithGoogle
  }

  const signOut = async () => {
    // Implementation of signOut
  }

  const resetPassword = async (email: string) => {
    // Implementation of resetPassword
  }

  const updatePassword = async (password: string) => {
    // Implementation of updatePassword
  }

  const refreshSession = async () => {
    // Implementation of refreshSession
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        userProfile,
        trialInfo,
        isLoading,
        isError,
        signIn,
        signUp,
        signInWithGoogle,
        signOut,
        resetPassword,
        updatePassword,
        refreshSession,
        loading: isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
