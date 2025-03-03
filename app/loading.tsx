import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container mx-auto p-4">
      <Skeleton className="h-8 w-[200px] mb-4" />
      <div className="grid gap-4">
        <Skeleton className="h-[125px] w-full" />
        <Skeleton className="h-[125px] w-full" />
        <Skeleton className="h-[125px] w-full" />
      </div>
    </div>
  )
}

