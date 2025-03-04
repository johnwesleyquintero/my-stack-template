import type { DeploymentConfig } from './types'

export const config: DeploymentConfig = {
  project: 'next-nebula-starter',
  regions: ['sfo1', 'iad1'],
  minInstances: 1,
  maxInstances: 10,
  buildCommand: 'npm run build',
  environment: process.env.NODE_ENV,
  checks: {
    cpuUsage: 80,
    memoryUsage: 70,
    healthCheck: '/api/health',
  }
}
