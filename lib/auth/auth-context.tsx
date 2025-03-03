"use client"

import type React from "react"
import { createContext, useContext } from "react"
import { useUser } from "./use-user"
import { useAuthMethods } from "./use-auth-methods"
import type { UserProfile, TrialInfo } from "@/lib/types/auth"
// Replace the incorrect import with the correct one
import { supabase } from "@/lib/supabase/config"

interface AuthContextType {
  user: any | null
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
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user, userProfile, trialInfo, isLoading: isUserLoading, isInitializing } = useUser()
  const {
    isLoading: isAuthLoading,
    signIn,
    signUp,
    signInWithGoogle,
    signOut,
    resetPassword,
    updatePassword,
  } = useAuthMethods()

  // Add improved session refresh functionality
  const refreshSession = async () => {
    try {
      const { error } = await supabase.auth.refreshSession()
      if (error) {
        console.error("Session refresh error:", error.message)

        // Only redirect to login if not already on a public route
        const isPublicRoute = ["/login", "/register", "/auth", "/"].some((route) =>
          window.location.pathname.startsWith(route),
        )

        if (!isPublicRoute) {
          window.location.href = "/login"
        }

        throw error
      }
    } catch (error) {
      console.error("Failed to refresh session:", error)
    }
  }

  // Show loading state while initializing
  if (isInitializing) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" />
          <p className="mt-2 text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  const value = {
    user,
    userProfile: userProfile || null,
    trialInfo,
    isLoading: isUserLoading || isAuthLoading,
    isError: false,
    signIn,
    signUp,
    signInWithGoogle,
    signOut,
    resetPassword,
    updatePassword,
    refreshSession,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

