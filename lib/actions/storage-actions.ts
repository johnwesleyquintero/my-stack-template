"use server"

import { cookies } from "next/headers"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { v4 as uuidv4 } from "uuid"

// Store data securely on the server
export async function storeDataSecurely(data: any, dataType: string): Promise<{ id: string }> {
  try {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

    // Get current user
    const {
      data: { session },
    } = await supabase.auth.getSession()
    if (!session) {
      throw new Error("Authentication required")
    }

    const userId = session.user.id
    const dataId = uuidv4()

    // Store in Supabase
    const { error } = await supabase.from("user_data").insert({
      id: dataId,
      user_id: userId,
      data_type: dataType,
      data: data,
      created_at: new Date().toISOString(),
    })

    if (error) {
      console.error("Error storing data:", error)
      throw new Error("Failed to store data securely")
    }

    return { id: dataId }
  } catch (error) {
    console.error("Error in storeDataSecurely:", error)
    throw new Error("Failed to store data securely")
  }
}

// Retrieve data securely from the server
export async function retrieveDataSecurely(dataId: string): Promise<any> {
  try {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

    // Get current user
    const {
      data: { session },
    } = await supabase.auth.getSession()
    if (!session) {
      throw new Error("Authentication required")
    }

    const userId = session.user.id

    // Retrieve from Supabase with user check for security
    const { data, error } = await supabase
      .from("user_data")
      .select("data")
      .eq("id", dataId)
      .eq("user_id", userId)
      .single()

    if (error) {
      console.error("Error retrieving data:", error)
      throw new Error("Failed to retrieve data")
    }

    return data.data
  } catch (error) {
    console.error("Error in retrieveDataSecurely:", error)
    throw new Error("Failed to retrieve data")
  }
}

