import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { Search, PlayCircle } from 'lucide-react'

interface Tutorial {
  id: string
  title: string
  description: string
  duration: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
}

const tutorials: Tutorial[] = [
  {
    id: '1',
    title: 'Getting Started with Nebula Suite',
    description:
      'Learn the basics of data pipeline management and how to set up your first project.',
    duration: '5 min',
    level: 'Beginner',
  },
  {
    id: '2',
    title: 'Advanced Data Mapping',
    description:
      'Master the art of mapping complex data structures and transformations.',
    duration: '10 min',
    level: 'Intermediate',
  },
  {
    id: '3',
    title: 'Automated Report Generation',
    description: 'Set up automated reports and customize them to your needs.',
    duration: '8 min',
    level: 'Beginner',
  },
  {
    id: '4',
    title: 'Custom Integration Development',
    description:
      'Learn how to build and deploy custom integrations for your specific needs.',
    duration: '15 min',
    level: 'Advanced',
  },
]

export default function TutorialsPage() {
  return (
    <div className="flex flex-col gap-4">
      <Breadcrumbs />
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Video Tutorials</h1>
        <div className="relative w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search tutorials..." className="pl-8" />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {tutorials.map(tutorial => (
          <Card key={tutorial.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {tutorial.title}
                <Button variant="ghost" size="icon">
                  <PlayCircle className="h-5 w-5" />
                </Button>
              </CardTitle>
              <CardDescription>{tutorial.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  Duration: {tutorial.duration}
                </span>
                <span
                  className={`rounded-full px-2 py-1 text-xs ${
                    tutorial.level === 'Beginner'
                      ? 'bg-green-100 text-green-700'
                      : tutorial.level === 'Intermediate'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-purple-100 text-purple-700'
                  }`}
                >
                  {tutorial.level}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
