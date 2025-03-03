"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Filter } from "lucide-react"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [category, setCategory] = useState("all")

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumbs />
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Search</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Advanced Search</CardTitle>
          <CardDescription>Search through your data using advanced filters.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search products, orders, or customers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="products">Products</SelectItem>
                  <SelectItem value="orders">Orders</SelectItem>
                  <SelectItem value="customers">Customers</SelectItem>
                </SelectContent>
              </Select>
              <Button>
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </div>

            <div className="rounded-md border">
              <div className="p-4 text-center text-sm text-muted-foreground">Enter a search term to see results</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Searches</CardTitle>
          <CardDescription>Your recent search history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-md border divide-y">
              <div className="p-4">
                <p className="font-medium">Product Search: "wireless headphones"</p>
                <p className="text-sm text-muted-foreground">2 hours ago</p>
              </div>
              <div className="p-4">
                <p className="font-medium">Order Search: "#ORD-12345"</p>
                <p className="text-sm text-muted-foreground">Yesterday</p>
              </div>
              <div className="p-4">
                <p className="font-medium">Customer Search: "john.doe@example.com"</p>
                <p className="text-sm text-muted-foreground">3 days ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

