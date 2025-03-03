import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { ProductsTable } from "@/components/products/products-table"
import { ProductMetrics } from "@/components/products/product-metrics"
import { Search, Filter, Plus, Download, Upload } from "lucide-react"

export default function ProductsPage() {
  return (
    <div className="flex flex-col gap-4">
      <Breadcrumbs />
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Products</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Import
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>
      </div>

      <ProductMetrics />

      <Card>
        <CardHeader>
          <CardTitle>Product Inventory</CardTitle>
          <CardDescription>Manage your Amazon product listings and inventory.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-4">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="all">All Products</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="outOfStock">Out of Stock</TabsTrigger>
                <TabsTrigger value="archived">Archived</TabsTrigger>
              </TabsList>
              <div className="flex items-center gap-2">
                <div className="relative w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search products..." className="pl-8" />
                </div>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                </Button>
              </div>
            </div>
            <TabsContent value="all">
              <ProductsTable />
            </TabsContent>
            <TabsContent value="active">
              <ProductsTable filter="active" />
            </TabsContent>
            <TabsContent value="outOfStock">
              <ProductsTable filter="outOfStock" />
            </TabsContent>
            <TabsContent value="archived">
              <ProductsTable filter="archived" />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

