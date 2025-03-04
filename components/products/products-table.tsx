'use client'

import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal, ArrowUpDown } from 'lucide-react'

interface Product {
  id: string
  asin: string
  name: string
  category: string
  price: number
  stock: number
  status: 'active' | 'outOfStock' | 'archived'
  lastUpdated: string
}

// Mock data
const mockProducts: Product[] = [
  {
    id: '1',
    asin: 'B08N5KWB9H',
    name: 'Wireless Earbuds',
    category: 'Electronics',
    price: 49.99,
    stock: 156,
    status: 'active',
    lastUpdated: '2024-02-28',
  },
  {
    id: '2',
    asin: 'B09B8WX3QN',
    name: 'Smart Watch',
    category: 'Electronics',
    price: 199.99,
    stock: 0,
    status: 'outOfStock',
    lastUpdated: '2024-02-27',
  },
  {
    id: '3',
    asin: 'B07PQNHM5F',
    name: 'Yoga Mat',
    category: 'Sports',
    price: 29.99,
    stock: 89,
    status: 'active',
    lastUpdated: '2024-02-26',
  },
  {
    id: '4',
    asin: 'B01LYCLS24',
    name: 'Phone Case',
    category: 'Accessories',
    price: 19.99,
    stock: 45,
    status: 'active',
    lastUpdated: '2024-02-25',
  },
  {
    id: '5',
    asin: 'B083FD6Y5R',
    name: 'Bluetooth Speaker',
    category: 'Electronics',
    price: 79.99,
    stock: 0,
    status: 'archived',
    lastUpdated: '2024-02-24',
  },
]

interface ProductsTableProps {
  filter?: 'active' | 'outOfStock' | 'archived'
}

export function ProductsTable({ filter }: ProductsTableProps) {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Product
    direction: 'asc' | 'desc'
  }>({ key: 'lastUpdated', direction: 'desc' })

  // Filter products based on status
  const filteredProducts = filter
    ? mockProducts.filter(product => product.status === filter)
    : mockProducts

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortConfig.direction === 'asc') {
      return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1
    }
    return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1
  })

  const toggleSort = (key: keyof Product) => {
    setSortConfig(current => ({
      key,
      direction:
        current.key === key && current.direction === 'asc' ? 'desc' : 'asc',
    }))
  }

  const toggleSelectAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([])
    } else {
      setSelectedProducts(filteredProducts.map(p => p.id))
    }
  }

  const toggleSelectProduct = (productId: string) => {
    setSelectedProducts(current =>
      current.includes(productId)
        ? current.filter(id => id !== productId)
        : [...current, productId]
    )
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedProducts.length === filteredProducts.length}
                  onCheckedChange={toggleSelectAll}
                />
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-2">
                  Product
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => toggleSort('name')}
                  >
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </div>
              </TableHead>
              <TableHead>ASIN</TableHead>
              <TableHead>
                <div className="flex items-center gap-2">
                  Category
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => toggleSort('category')}
                  >
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-2">
                  Price
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => toggleSort('price')}
                  >
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-2">
                  Stock
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => toggleSort('stock')}
                  >
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </div>
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedProducts.map(product => (
              <TableRow key={product.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedProducts.includes(product.id)}
                    onCheckedChange={() => toggleSelectProduct(product.id)}
                  />
                </TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.asin}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>${product.price.toFixed(2)}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      product.status === 'active'
                        ? 'default'
                        : product.status === 'outOfStock'
                          ? 'destructive'
                          : 'secondary'
                    }
                  >
                    {product.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Update Stock</DropdownMenuItem>
                      {product.status !== 'archived' ? (
                        <DropdownMenuItem className="text-destructive">
                          Archive
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem>Restore</DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
