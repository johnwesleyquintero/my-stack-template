// Environment variables type
interface Env {
  NEXT_PUBLIC_SUPABASE_URL: string;
  NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
  NEXT_PUBLIC_STORAGE_KEY: string;
  NEXT_PUBLIC_VERCEL_ENV: string;
  NEXT_PUBLIC_APP_VERSION: string;
  NEXT_PUBLIC_BASE_PATH: string;
  NODE_ENV: string;
}

// Get environment value with fallback
function getEnvValue(key: string, fallback: string): string {
  return process.env[key] || fallback;
}

// Client-side environment variables
export const env: Env = {
  NEXT_PUBLIC_SUPABASE_URL: getEnvValue(
    "NEXT_PUBLIC_SUPABASE_URL",
    "http://localhost:54321"
  ),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: getEnvValue(
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    "your-anon-key"
  ),
  NEXT_PUBLIC_STORAGE_KEY: getEnvValue(
    "NEXT_PUBLIC_STORAGE_KEY",
    "your-storage-key"
  ),
  NEXT_PUBLIC_VERCEL_ENV: getEnvValue("NEXT_PUBLIC_VERCEL_ENV", "development"),
  NEXT_PUBLIC_APP_VERSION: getEnvValue("NEXT_PUBLIC_APP_VERSION", "1.0.0-dev"),
  NEXT_PUBLIC_BASE_PATH: getEnvValue("NEXT_PUBLIC_BASE_PATH", ""),
  NODE_ENV: getEnvValue("NODE_ENV", "development"),
};

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
export function validateEnv(): Record<string, string> {
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

  return {
    supabaseUrl: env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseAnonKey: env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    storageKey: env.NEXT_PUBLIC_STORAGE_KEY,
    vercelEnv: env.NEXT_PUBLIC_VERCEL_ENV,
    appVersion: env.NEXT_PUBLIC_APP_VERSION,
    basePath: env.NEXT_PUBLIC_BASE_PATH,
  };
}

// Get environment variables with validation
export function getEnvVars(): Record<string, string> {
  return validateEnv();
}
