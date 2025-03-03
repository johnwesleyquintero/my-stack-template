import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GoogleDriveConnect } from "@/components/google-drive-connect"
import { Switch } from "@/components/ui/switch"

export default function AccountSettingsPage() {
  return (
    <div className="flex flex-col gap-4">
      <Breadcrumbs />
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Account Settings</h1>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Manage your account preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Your name" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Your email" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="company">Company</Label>
                  <Input id="company" placeholder="Your company name" />
                </div>
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose what notifications you want to receive</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive email updates about your account</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Processing Alerts</Label>
                  <p className="text-sm text-muted-foreground">Get notified when your data is processed</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Marketing Updates</Label>
                  <p className="text-sm text-muted-foreground">Receive marketing and promotional emails</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations">
          <Card>
            <CardHeader>
              <CardTitle>Connected Services</CardTitle>
              <CardDescription>Manage your connected services and integrations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Google Drive</Label>
                    <p className="text-sm text-muted-foreground">Connect to export data directly to Google Drive</p>
                  </div>
                  <GoogleDriveConnect />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Amazon Seller Central</Label>
                    <p className="text-sm text-muted-foreground">Connect your Amazon Seller account</p>
                  </div>
                  <Button variant="outline">Connect</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing">
          <Card>
            <CardHeader>
              <CardTitle>Billing & Subscription</CardTitle>
              <CardDescription>Manage your subscription and billing information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <h3 className="font-medium">Current Plan</h3>
                  <p className="text-2xl font-bold mt-2">Free Trial</p>
                  <p className="text-sm text-muted-foreground mt-1">7 days remaining</p>
                  <Button className="mt-4">Upgrade Plan</Button>
                </div>
                <div className="rounded-lg border p-4">
                  <h3 className="font-medium">Payment Method</h3>
                  <p className="text-sm text-muted-foreground mt-1">No payment method added</p>
                  <Button variant="outline" className="mt-4">
                    Add Payment Method
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

