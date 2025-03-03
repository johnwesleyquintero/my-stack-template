import { put } from "@vercel/blob"
import { nanoid } from "nanoid"

export async function uploadToBlob(file: File) {
  try {
    // Generate a unique filename
    const filename = `${nanoid()}-${file.name}`

    // Upload to Vercel Blob Storage
    const { url } = await put(filename, file, {
      access: "public",
      token: process.env.BLOB_READ_WRITE_TOKEN,
    })

    return {
      url,
      filename,
      size: file.size,
      type: file.type,
    }
  } catch (error) {
    console.error("Error uploading to blob storage:", error)
    throw new Error("Failed to upload file to storage")
  }
}

