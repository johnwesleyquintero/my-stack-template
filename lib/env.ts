import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),
  NEXT_PUBLIC_APP_URL: z.string().default('http://localhost:3000'),
  NEXT_PUBLIC_APP_NAME: z.string().default('Next Nebula Starter'),
  NEXT_PUBLIC_APP_DESCRIPTION: z.string().default('A modern, production-ready Next.js starter template'),
  NEXT_PUBLIC_APP_AUTHOR: z.string().default('John Wesley Quintero'),
  NEXT_PUBLIC_ENVIRONMENT: z.string().default('development'),
  NEXT_PUBLIC_STORAGE_KEY: z.string().optional(),
  NEXT_PUBLIC_VERCEL_ENV: z.string().optional(),
  NEXT_PUBLIC_APP_VERSION: z.string().optional(),
  NEXT_PUBLIC_BASE_PATH: z.string().optional(),
  NODE_ENV: z.string().default('development'),
});

export type Env = z.infer<typeof envSchema>;

// Get environment value with fallback
function getEnvValue(key: string, fallback: string): string {
  return process.env[key] || fallback;
}

// Validate and export environment variables
export const env = envSchema.parse({
  NEXT_PUBLIC_SUPABASE_URL: getEnvValue(
    'NEXT_PUBLIC_SUPABASE_URL',
    'http://localhost:54321'
  ),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: getEnvValue(
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'your-anon-key'
  ),
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
  NEXT_PUBLIC_APP_DESCRIPTION: process.env.NEXT_PUBLIC_APP_DESCRIPTION,
  NEXT_PUBLIC_APP_AUTHOR: process.env.NEXT_PUBLIC_APP_AUTHOR,
  NEXT_PUBLIC_ENVIRONMENT: process.env.NEXT_PUBLIC_ENVIRONMENT,
  NEXT_PUBLIC_STORAGE_KEY: process.env.NEXT_PUBLIC_STORAGE_KEY,
  NEXT_PUBLIC_VERCEL_ENV: process.env.NEXT_PUBLIC_VERCEL_ENV,
  NEXT_PUBLIC_APP_VERSION: process.env.NEXT_PUBLIC_APP_VERSION,
  NEXT_PUBLIC_BASE_PATH: process.env.NEXT_PUBLIC_BASE_PATH,
  NODE_ENV: process.env.NODE_ENV,
});

// Environment check helper functions
export function isProduction(): boolean {
  return env.NODE_ENV === "production";
}

export function isDevelopment(): boolean {
  return env.NODE_ENV === "development";
}

export function isTest(): boolean {
  return env.NODE_ENV === "test";
}

// Validate environment variables
export function validateEnv(): void {
  const requiredEnvVars = [
    "NEXT_PUBLIC_SUPABASE_URL",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  ];

  const missingEnvVars = requiredEnvVars.filter(
    (envVar) => !env[envVar as keyof Env]
  );

  if (missingEnvVars.length > 0) {
    console.warn(
      `Missing required environment variables: ${missingEnvVars.join(", ")}`
    );
  }

  // Validate Supabase URL format if provided
  if (env.NEXT_PUBLIC_SUPABASE_URL) {
    try {
      new URL(env.NEXT_PUBLIC_SUPABASE_URL);
    } catch (error) {
      console.warn(
        `Invalid NEXT_PUBLIC_SUPABASE_URL: ${env.NEXT_PUBLIC_SUPABASE_URL}`
      );
    }
  }
}
