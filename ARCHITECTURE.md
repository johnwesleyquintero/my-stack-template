# Nebula Architectural Constitution

## Eternal Stack
```ts
// Mandatory Dependencies
const nebulaStack = {
  core: "Next.js (Latest)",
  ui: ["shadcn/ui", "@nebula-ui (custom)"],
  data: ["Supabase", "React Query"],
  styling: ["Tailwind CSS", "Framer Motion"],
  quality: ["biome", "Sentry"]
}
```

## File Structure Law
```bash
# Violators will be spaced!
/src
  /app          # App Router ONLY
  /components   # Reusable components
  /lib          # Shared utilities
```

## Core Principles
- Server Components First
- TypeScript Always
- Brand Consistency Over Everything
