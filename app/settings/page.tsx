import { SettingsContent } from "./settings-content"
import { Metadata } from "next"

// Settings page
export const metadata: Metadata = {
  title: "Settings",
  description: "Manage your account settings and preferences",
}

export default function SettingsPage() {
  return <SettingsContent />
}
