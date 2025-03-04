import { cookies } from 'next/headers'
import { v4 as uuidv4 } from 'uuid'

// This function should only be called from server components, API routes, or server actions
export function generateCsrfToken() {
  const token = uuidv4()

  // Only set cookies in server actions or API routes
  const cookieStore = cookies()
  cookieStore.set('csrf-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
  })

  return token
}

export function getCsrfToken() {
  const cookieStore = cookies()
  return cookieStore.get('csrf-token')?.value
}
