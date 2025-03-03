import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"
import Link from "next/link"

export default function ErrorPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <AlertCircle className="h-6 w-6 text-destructive" />
            <CardTitle>Application Error</CardTitle>
          </div>
          <CardDescription>
            We encountered an error while processing your request. This might be due to:
            <ul className="list-disc list-inside mt-2">
              <li>Configuration issues</li>
              <li>Connection problems</li>
              <li>Temporary service disruption</li>
            </ul>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-end space-x-4">
            <Button variant="outline" onClick={() => window.location.reload()}>
              Try Again
            </Button>
            <Button asChild>
              <Link href="/">Return Home</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

