"use client";

import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Icons } from "@/components/icons";

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const supabase = createClientComponentClient();

  async function handlePasswordUpdate(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setMessage(null);

    try {
      const { error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) {
        setError(error.message);
      } else {
        setMessage("Password updated successfully!");
        setPassword("");
      }
    } catch (err) {
      setError("An unexpected error occurred");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container py-8">
      <div className="grid gap-8">
        <div>
          <h1 className="text-3xl font-bold md:text-4xl">Settings</h1>
          <p className="text-lg text-muted-foreground">
            Manage your account settings
          </p>
        </div>

        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>
                Update your password to keep your account secure
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordUpdate} className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input
                    id="new-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter new password"
                    required
                  />
                </div>
                {error && (
                  <div className="rounded bg-destructive/15 p-3 text-sm text-destructive">
                    {error}
                  </div>
                )}
                {message && (
                  <div className="rounded bg-primary/10 p-3 text-sm text-primary">
                    {message}
                  </div>
                )}
                <Button type="submit" disabled={isLoading}>
                  {isLoading && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Update Password
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
