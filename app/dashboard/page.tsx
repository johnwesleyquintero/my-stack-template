import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { DashboardContent } from './dashboard-content'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Your Nebula Suite Dashboard',
}

export default async function DashboardPage() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session === null) {
    console.error('Failed to retrieve session')
    redirect('/login')
  }

  if (!session) {
    redirect('/login')
  }

  return <DashboardContent user={session.user} />
}
