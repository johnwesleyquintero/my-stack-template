'use client'

import Link from 'next/link'
import { SignUpForm } from '@/components/auth/SignUpForm'
import { Button } from '@/components/ui/button'

export function RegisterContent() {
  return (
    <div className="container mx-auto max-w-screen-xl px-4 py-8">
      <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold tracking-tight">
              Create an account
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link href="/login">
                <Button variant="link" className="h-auto p-0 font-normal">
                  Sign in
                </Button>
              </Link>
            </p>
          </div>
          <SignUpForm />
        </div>
      </div>
    </div>
  )
}
