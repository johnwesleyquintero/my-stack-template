import type React from "react";
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-[350px] mx-auto space-y-6">{children}</div>
    </div>
  );
}
