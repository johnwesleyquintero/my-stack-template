import { z } from 'zod'

// Define the schema for a column definition
export const ColumnDefinitionSchema = z.object({
  id: z.string(), // Unique identifier for the standard column
  name: z.string(), // Standard name for the column
  category: z.string(), // Category (e.g., "keywords", "metrics", "dates")
  type: z.enum([
    'string',
    'number',
    'date',
    'boolean',
    'currency',
    'percentage',
  ]),
  variations: z.array(z.string()), // Known variations of this column name
  description: z.string().optional(),
  format: z.string().optional(), // Optional format specification
  examples: z.array(z.string()).optional(), // Example values
  confidence: z.number().min(0).max(1), // Confidence score for auto-mapping
  lastUsed: z.string(), // ISO date string
  useCount: z.number(), // Number of times this mapping was used
})

export type ColumnDefinition = z.infer<typeof ColumnDefinitionSchema>

// Define categories for better organization
export const ColumnCategories = {
  KEYWORDS: 'keywords',
  METRICS: 'metrics',
  DATES: 'dates',
  IDENTIFIERS: 'identifiers',
  PRODUCTS: 'products',
  FINANCIALS: 'financials',
  PERFORMANCE: 'performance',
} as const

// Initial seed data for common columns
export const initialColumnLibrary: ColumnDefinition[] = [
  {
    id: 'keywords',
    name: 'Keywords',
    category: ColumnCategories.KEYWORDS,
    type: 'string',
    variations: [
      'Search Query',
      'Search Terms',
      'Key Phrases',
      'Keyword',
      'Search Keyword',
      'Customer Search Term',
    ],
    description: 'Terms used by customers to find products',
    examples: ['bluetooth headphones', 'wireless charger'],
    confidence: 0.9,
    lastUsed: new Date().toISOString(),
    useCount: 1,
  },
  {
    id: 'product_name',
    name: 'Product Name',
    category: ColumnCategories.PRODUCTS,
    type: 'string',
    variations: [
      'Item Name',
      'Product Title',
      'Title',
      'Item Title',
      'Product Description',
    ],
    confidence: 0.85,
    lastUsed: new Date().toISOString(),
    useCount: 1,
  },
  {
    id: 'revenue',
    name: 'Revenue',
    category: ColumnCategories.FINANCIALS,
    type: 'currency',
    variations: [
      'Sales',
      'Total Sales',
      'Revenue (USD)',
      'Amount',
      'Sales Amount',
      'Gross Sales',
    ],
    format: 'USD',
    confidence: 0.9,
    lastUsed: new Date().toISOString(),
    useCount: 1,
  },
]
