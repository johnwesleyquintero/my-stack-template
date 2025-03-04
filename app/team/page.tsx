import { Metadata } from 'next'
import TeamContent from './team-content'

// Team management page
export const metadata: Metadata = {
  title: 'Team Management',
  description: 'Manage your team members and their roles.',
}

export default function TeamPage() {
  return <TeamContent />
}
