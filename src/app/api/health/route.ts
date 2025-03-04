import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase/client'

export async function GET() {
  try {
    const { data, error } = await supabase.from('healthcheck').select('*').limit(1)
    
    if (error) throw error

    return NextResponse.json({
      status: 'healthy',
      supabase: 'connected',
      environment: process.env.NEXT_PUBLIC_ENVIRONMENT,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Health check failed:', error)
    return NextResponse.json({
      status: 'unhealthy',
      error: 'Database connection failed',
      timestamp: new Date().toISOString(),
    }, { status: 500 })
  }
}
