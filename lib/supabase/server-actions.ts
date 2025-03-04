'use server'

import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/auth-helpers-nextjs'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import type { UserProfile } from '@/lib/types/auth'

// Create a Supabase client for server actions
export function createServerAction() {
  const cookieStore = cookies()
  return createServerClient({ cookies: () => cookieStore })
}

// Server action to sign out
export async function signOut() {
  const supabase = createServerAction()
  await supabase.auth.signOut()
  revalidatePath('/')
  redirect('/login')
}

// Server action to get the current user
export async function getCurrentUser() {
  const supabase = createServerAction()
  const { data } = await supabase.auth.getUser()
  return data.user
}

// Server action to get the user profile
export async function getUserProfile(userId: string) {
  const supabase = createServerAction()
  const { data } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('user_id', userId)
    .single()
  return data as UserProfile | null
}

// Server action to update the user profile
export async function updateUserProfile(
  userId: string,
  profile: Partial<UserProfile>
) {
  const supabase = createServerAction()
  const { error } = await supabase
    .from('user_profiles')
    .update(profile)
    .eq('user_id', userId)

  if (error) {
    throw new Error(`Failed to update profile: ${error.message}`)
  }

  revalidatePath('/dashboard')
  revalidatePath('/settings')
}
