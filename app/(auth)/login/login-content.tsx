"use client";

import Link from "next/link";
import { SignInForm } from "@/components/auth/SignInForm";
import { Button } from "@/components/ui/button";

export function LoginContent() {
  return (
    <div className="container max-w-screen-xl mx-auto px-4 py-8">
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold tracking-tight">
              Sign in to your account
            </h1>
            <p className="text-sm text-muted-foreground mt-2">
              Don't have an account?{" "}
              <Link href="/register">
                <Button variant="link" className="p-0 h-auto font-normal">
                  Create an account
                </Button>
              </Link>
            </p>
          </div>
          <SignInForm />
        </div>
      </div>
    </div>
  );
} 