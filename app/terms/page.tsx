import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Breadcrumbs } from "@/components/breadcrumbs"

export default function TermsPage() {
  return (
    <div className="flex flex-col gap-4">
      <Breadcrumbs />
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Terms of Service</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Terms and Conditions</CardTitle>
          <CardDescription>Last updated: February 28, 2024</CardDescription>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using Nebula Suite, you accept and agree to be bound by the terms and provision of this
            agreement.
          </p>

          <h2>2. Use License</h2>
          <p>
            Permission is granted to temporarily download one copy of Nebula Suite for personal, non-commercial
            transitory viewing only.
          </p>

          <h2>3. Data Processing</h2>
          <p>
            We process data in accordance with our Privacy Policy and applicable data protection laws. You retain all
            rights to your data.
          </p>

          <h2>4. Service Availability</h2>
          <p>We strive to maintain 99.9% uptime, but we cannot guarantee uninterrupted access to our services.</p>

          <h2>5. User Obligations</h2>
          <p>
            Users must maintain the security of their account credentials and immediately notify us of any unauthorized
            use.
          </p>

          <h2>6. Intellectual Property</h2>
          <p>
            The Service and its original content, features, and functionality are owned by Nebula Suite and are
            protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
          </p>

          <h2>7. Termination</h2>
          <p>
            We may terminate or suspend your account and bar access to the Service immediately, without prior notice or
            liability, under our sole discretion.
          </p>

          <h2>8. Limitation of Liability</h2>
          <p>
            In no event shall Nebula Suite be liable for any indirect, incidental, special, consequential or punitive
            damages.
          </p>

          <h2>9. Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. We will notify users of any changes by updating the
            date at the top of this page.
          </p>

          <h2>10. Contact Information</h2>
          <p>For any questions about these Terms, please contact us at legal@nebulasuite.com.</p>
        </CardContent>
      </Card>
    </div>
  )
}

