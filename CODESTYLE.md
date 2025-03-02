# Nebula Code Commandments

## Component Rules
```tsx
// Required prop structure
type ComponentProps = {
  className?: string
  variant?: 'primary' | 'secondary'
  // Add custom props below
}

// Mandatory utility
import { cn } from "@/lib/utils"

// Forbidden!
❌ Any use of `!important` in CSS
❌ Class components
❌ Prop drilling beyond 2 levels
```

## API Response Standard
```ts
interface NebulaResponse<T> {
  data?: T
  error?: {
    code: string
    message: string
  }
  timestamp: string
}
```

## Git Hygiene
```bash
# Commit message format
[feat|fix|docs]/scope: description
# Example
git commit -m "feat/ui: add cosmic card component"
