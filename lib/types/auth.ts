export interface UserProfile {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  trial_end_date?: string
  is_trial_active?: boolean
  google_drive_connected?: boolean
}

export interface TrialInfo {
  isActive: boolean
  daysRemaining: number
  endDate: string
}

