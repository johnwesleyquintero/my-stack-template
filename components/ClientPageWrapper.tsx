"use client";

import { ReactNode } from "react";

interface ClientPageWrapperProps {
  children: ReactNode;
}

export function ClientPageWrapper({ children }: ClientPageWrapperProps) {
  return <>{children}</>;
} 