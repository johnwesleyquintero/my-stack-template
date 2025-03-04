import type { Metadata } from 'next'
import { RegisterContent } from './register-content'
import { ClientPageWrapper } from '@/components/ClientPageWrapper'

// Register page
export const metadata: Metadata = {
  title: 'Register',
  description: 'Create a new account',
}

export default function RegisterPage() {
  return (
    <ClientPageWrapper>
      <RegisterContent />
    </ClientPageWrapper>
  )
}
