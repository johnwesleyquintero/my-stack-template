"use client";

import { isDevelopment, env } from "@/lib/env";
import { cn } from "@/lib/utils";

export function EnvironmentIndicator() {
  if (!isDevelopment()) {
    return null;
  }

  return (
    <div
      className={cn(
        "fixed bottom-2 right-2 z-50 rounded-full px-3 py-1 text-xs font-medium",
        "bg-yellow-500/20 text-yellow-600 dark:bg-yellow-500/10 dark:text-yellow-400"
      )}
    >
      {env.NODE_ENV}
    </div>
  );
}
