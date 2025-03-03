import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Breadcrumbs } from "@/components/breadcrumbs"

export default function PrivacyPage() {
  return (
    <div className="flex flex-col gap-4">
      <Breadcrumbs />
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Privacy Policy</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Privacy Policy</CardTitle>
          <CardDescription>Last updated: February 28, 2024</CardDescription>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <h2>1. Information We Collect</h2>
          <p>We collect information that you provide directly to us, including but not limited to:</p>
          <ul>
            <li>Account information (name, email, company)</li>
            <li>Usage data and analytics</li>
            <li>Communication preferences</li>
            <li>Technical information about your device and connection</li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Provide and maintain our services</li>
            <li>Improve and personalize your experience</li>
            <li>Process your transactions</li>
            <li>Send you technical notices and updates</li>
            <li>Respond to your comments and questions</li>
          </ul>

          <h2>3. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to maintain the security of your personal
            information.
          </p>

          <h2>4. Data Retention</h2>
          <p>
            We retain personal information for as long as necessary to provide our services and fulfill the purposes
            outlined in this policy.
          </p>

          <h2>5. Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access your personal information</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Object to data processing</li>
            <li>Export your data</li>
          </ul>

          <h2>6. Third-Party Services</h2>
          <p>
            We may use third-party services to process your information. These services are contractually obligated to
            protect your data.
          </p>

          <h2>7. Cookies and Tracking</h2>
          <p>We use cookies and similar tracking technologies to collect usage data and maintain our services.</p>

          <h2>8. Children's Privacy</h2>
          <p>
            Our services are not intended for children under 13. We do not knowingly collect information from children
            under 13.
          </p>

          <h2>9. Changes to This Policy</h2>
          <p>
            We may update this policy from time to time. We will notify you of any changes by posting the new policy on
            this page.
          </p>

          <h2>10. Contact Us</h2>
          <p>If you have questions about this Privacy Policy, please contact us at privacy@nebulasuite.com.</p>
        </CardContent>
      </Card>
    </div>
  )
}

