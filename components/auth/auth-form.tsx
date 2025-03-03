"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Icons } from "@/components/icons"
import { useAuth } from "@/lib/auth/auth-context"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { GoogleAuthButton } from "@/components/auth/google-auth-button"

const authSchema = z
  .object({
    email: z.string().email("Please enter a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number",
      ),
    confirmPassword: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.confirmPassword !== undefined) {
        return data.password === data.confirmPassword
      }
      return true
    },
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    },
  )

interface AuthFormProps {
  view: "sign-in" | "sign-up"
}

export function AuthForm({ view }: AuthFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { signIn, signUp } = useAuth()

  const form = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
      ...(view === "sign-up" ? { confirmPassword: "" } : {}),
    },
  })

  async function onSubmit(values: z.infer<typeof authSchema>) {
    setIsLoading(true)
    try {
      if (view === "sign-in") {
        await signIn(values.email, values.password)
      } else {
        await signUp(values.email, values.password)
      }
    } catch (error) {
      // Error handling is done in the auth context
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <GoogleAuthButton />

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="m@example.com" {...field} disabled={isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} disabled={isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {view === "sign-up" && (
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <Button className="w-full" type="submit" disabled={isLoading}>
            {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            {view === "sign-in" ? "Sign In" : "Sign Up"}
          </Button>
        </form>
      </Form>
    </div>
  )
}

