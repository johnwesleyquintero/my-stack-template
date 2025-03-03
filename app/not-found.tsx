import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[80vh] gap-4">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p className="text-muted-foreground text-center max-w-md">
        Sorry, we couldn't find the page you're looking for. Please check the URL or return to the homepage.
      </p>
      <Button asChild>
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  )
}

