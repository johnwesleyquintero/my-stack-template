import { createClient } from "@/lib/supabase/server"

const TRIAL_DURATION_DAYS = 14

interface TrialInfo {
  isActive: boolean
  daysRemaining: number
  endDate: string
}

export async function initializeTrial(userId: string) {
  const supabase = createClient()
  const trialEndDate = new Date()
  trialEndDate.setDate(trialEndDate.getDate() + TRIAL_DURATION_DAYS)

  const { error } = await supabase.from("user_profiles").upsert({
    user_id: userId,
    trial_end_date: trialEndDate.toISOString(),
    is_trial_active: true,
  })

  if (error) throw error
  return trialEndDate
}

export async function getTrialInfo(userId: string): Promise<TrialInfo> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("user_profiles")
    .select("trial_end_date, is_trial_active")
    .eq("user_id", userId)
    .single()

  if (error) throw error

  if (!data?.trial_end_date) {
    return {
      isActive: false,
      daysRemaining: 0,
      endDate: new Date().toISOString(),
    }
  }

  const now = new Date()
  const endDate = new Date(data.trial_end_date)
  const daysRemaining = Math.max(0, Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)))
  const isActive = daysRemaining > 0 && data.is_trial_active

  return {
    isActive,
    daysRemaining,
    endDate: data.trial_end_date,
  }
}

