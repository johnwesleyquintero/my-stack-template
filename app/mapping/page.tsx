import { DashboardLayout } from '@/components/dashboard-layout'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { DataMappingTabs } from '@/components/data-mapping-tabs'
import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

export default function MappingPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4">
        <Breadcrumbs />
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Data Mapping</h1>
          <Button>Save Mapping</Button>
        </div>

        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Map Your Data</AlertTitle>
          <AlertDescription>
            Map the columns from your uploaded file to our system fields. This
            helps us understand your data structure.
          </AlertDescription>
        </Alert>

        <DataMappingTabs />
      </div>
    </DashboardLayout>
  )
}
