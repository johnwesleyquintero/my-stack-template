import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { Search } from "lucide-react"

interface FAQ {
  question: string
  answer: string
  category: string
}

const faqs: FAQ[] = [
  {
    question: "What is Nebula Suite?",
    answer:
      "Nebula Suite is a comprehensive data pipeline management solution that helps businesses streamline their data processing, transformation, and reporting workflows.",
    category: "General",
  },
  {
    question: "How do I get started?",
    answer:
      "After signing up, you can start by watching our getting started tutorial and creating your first project. Our step-by-step guide will walk you through the basics.",
    category: "Getting Started",
  },
  {
    question: "What file formats are supported?",
    answer:
      "We support CSV, Excel (XLSX, XLS), JSON, and XML files. Additional format support can be added through custom integrations.",
    category: "Technical",
  },
  {
    question: "How secure is my data?",
    answer:
      "We use industry-standard encryption and security practices. All data is encrypted at rest and in transit, and we maintain strict access controls.",
    category: "Security",
  },
  {
    question: "Can I automate my workflows?",
    answer:
      "Yes, you can automate workflows using our scheduling feature. Set up recurring tasks and let Nebula Suite handle the rest.",
    category: "Features",
  },
]

export default function FAQsPage() {
  return (
    <div className="flex flex-col gap-4">
      <Breadcrumbs />
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Frequently Asked Questions</h1>
        <div className="relative w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search FAQs..." className="pl-8" />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Common Questions</CardTitle>
          <CardDescription>Find answers to frequently asked questions about Nebula Suite.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {faqs.map((faq, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-start gap-2">
                <span className="font-medium text-primary">{faq.question}</span>
                <span className="px-2 py-0.5 rounded-full bg-muted text-xs">{faq.category}</span>
              </div>
              <p className="text-sm text-muted-foreground">{faq.answer}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

