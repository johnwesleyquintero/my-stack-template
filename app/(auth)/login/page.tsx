import type { Metadata } from "next";
import { LoginContent } from "./login-content";
import { ClientPageWrapper } from "@/components/ClientPageWrapper";

// Login page
export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};

export default function LoginPage() {
  return (
    <ClientPageWrapper>
      <LoginContent />
    </ClientPageWrapper>
  );
}
