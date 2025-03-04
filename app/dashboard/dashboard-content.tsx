'use client'

import { User } from '@supabase/supabase-js'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

interface DashboardContentProps {
  user: User
}

export function DashboardContent({ user }: DashboardContentProps) {
  const email = user.email
  const lastSignIn = new Date(user.last_sign_in_at || '').toLocaleDateString()
  const userCreated = new Date(user.created_at).toLocaleDateString()

  return (
    <div className="container py-8">
      <div className="grid gap-8">
        <div>
          <h1 className="text-3xl font-bold md:text-4xl">Dashboard</h1>
          <p className="text-lg text-muted-foreground">
            Welcome back, {email?.split('@')[0]}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Your account details</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-2">
              <div>
                <div className="text-sm font-medium text-muted-foreground">
                  Email
                </div>
                <div>{email}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">
                  Last Sign In
                </div>
                <div>{lastSignIn}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">
                  Account Created
                </div>
                <div>{userCreated}</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks and settings</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-2">
              <Button asChild className="w-full" variant="outline">
                <a href="/dashboard/settings">Update Profile</a>
              </Button>
              <Button asChild className="w-full" variant="outline">
                <a href="/dashboard/security">Security Settings</a>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
              <CardDescription>
                Support resources and documentation
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-2">
              <Button asChild className="w-full" variant="outline">
                <a href="/docs" target="_blank" rel="noopener noreferrer">
                  Documentation
                </a>
              </Button>
              <Button asChild className="w-full" variant="outline">
                <a href="/help" target="_blank" rel="noopener noreferrer">
                  Support Center
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
