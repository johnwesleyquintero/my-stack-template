import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Book, MessageCircle, PlayCircle, FileText } from 'lucide-react'
import Link from 'next/link'

const helpCategories = [
  {
    title: 'Getting Started',
    description: 'Learn the basics of using Nebula Suite',
    icon: Book,
    href: '/docs/getting-started',
  },
  {
    title: 'Video Tutorials',
    description: 'Watch step-by-step video guides',
    icon: PlayCircle,
    href: '/help/tutorials',
  },
  {
    title: 'FAQs',
    description: 'Find answers to common questions',
    icon: FileText,
    href: '/help/faqs',
  },
  {
    title: 'Contact Support',
    description: 'Get help from our support team',
    icon: MessageCircle,
    href: '/help/support',
  },
]

export default function HelpPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight">How can we help?</h1>
        <p className="text-xl text-muted-foreground">
          Search our documentation or browse help categories below
        </p>
        <div className="relative w-full max-w-2xl">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search documentation..." className="pl-8" />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {helpCategories.map(category => (
          <Card
            key={category.title}
            className="transition-colors hover:bg-muted/50"
          >
            <Link href={category.href}>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="rounded-lg bg-primary/10 p-2">
                    <category.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>{category.title}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Link>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Popular Articles</CardTitle>
          <CardDescription>Most frequently read help articles</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="divide-y rounded-md border">
              <Link
                href="/help/articles/getting-started"
                className="block p-4 hover:bg-muted/50"
              >
                <p className="font-medium">Getting Started with Nebula Suite</p>
                <p className="text-sm text-muted-foreground">
                  Learn the basics of using our platform
                </p>
              </Link>
              <Link
                href="/help/articles/data-mapping"
                className="block p-4 hover:bg-muted/50"
              >
                <p className="font-medium">Data Mapping Guide</p>
                <p className="text-sm text-muted-foreground">
                  How to map your data fields effectively
                </p>
              </Link>
              <Link
                href="/help/articles/export-options"
                className="block p-4 hover:bg-muted/50"
              >
                <p className="font-medium">Export Options Explained</p>
                <p className="text-sm text-muted-foreground">
                  Learn about different export formats and methods
                </p>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Need More Help?</CardTitle>
          <CardDescription>
            Contact our support team for personalized assistance
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Our support team is available 24/7 to help you with any questions
          </p>
          <Button>Contact Support</Button>
        </CardContent>
      </Card>
    </div>
  )
}
