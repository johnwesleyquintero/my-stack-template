import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { Mail, MessageCircle, Phone, FileText } from "lucide-react"

export default function SupportPage() {
  return (
    <div className="flex flex-col gap-4">
      <Breadcrumbs />
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Support</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Contact Support</CardTitle>
            <CardDescription>Get in touch with our support team for assistance.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>support@nebulasuite.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>1-800-NEBULA-1</span>
            </div>
            <Button className="w-full">
              <MessageCircle className="mr-2 h-4 w-4" />
              Start Live Chat
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Submit a Ticket</CardTitle>
            <CardDescription>Create a support ticket for detailed assistance.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Input placeholder="Subject" />
              <textarea
                className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Describe your issue..."
              />
            </div>
            <Button className="w-full">
              <FileText className="mr-2 h-4 w-4" />
              Submit Ticket
            </Button>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Support Resources</CardTitle>
            <CardDescription>Access helpful resources and documentation.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3">
            <Button variant="outline" className="h-auto flex-col items-center justify-center p-6 space-y-2">
              <FileText className="h-6 w-6" />
              <span>Documentation</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col items-center justify-center p-6 space-y-2">
              <MessageCircle className="h-6 w-6" />
              <span>Community Forum</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col items-center justify-center p-6 space-y-2">
              <Mail className="h-6 w-6" />
              <span>Newsletter</span>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

