"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/icons";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const supabase = createClientComponentClient();

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${location.origin}/auth/callback?next=/reset-password`,
      });

      if (error) {
        throw error;
      }

      toast.success("Check your email for a password reset link");
      router.push("/login?message=Check your email to reset your password");
    } catch (error) {
      toast.error("Error sending reset email");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Forgot password
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your email to reset your password
          </p>
        </div>
        <div className="grid gap-6">
          <form onSubmit={onSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="name@example.com"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  disabled={isLoading}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <Button disabled={isLoading}>
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Send reset link
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
