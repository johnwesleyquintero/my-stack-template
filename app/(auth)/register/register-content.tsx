"use client";

import Link from "next/link";
import { SignUpForm } from "@/components/auth/SignUpForm";
import { Button } from "@/components/ui/button";

export function RegisterContent() {
  return (
    <div className="container max-w-screen-xl mx-auto px-4 py-8">
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold tracking-tight">
              Create an account
            </h1>
            <p className="text-sm text-muted-foreground mt-2">
              Already have an account?{" "}
              <Link href="/login">
                <Button variant="link" className="p-0 h-auto font-normal">
                  Sign in
                </Button>
              </Link>
            </p>
          </div>
          <SignUpForm />
        </div>
      </div>
    </div>
  );
} 