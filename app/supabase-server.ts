"use server";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import type { Database } from "@/types/supabase";

// Create server-side Supabase client
export async function createServerSupabaseClient() {
  return createServerComponentClient<Database>({ cookies });
}

export async function getSession() {
  const supabase = await createServerSupabaseClient();
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    return session;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

export async function getUserDetails() {
  const supabase = await createServerSupabaseClient();
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

// Export the createServerComponentClient directly for cases where it's needed
export { createServerComponentClient };
