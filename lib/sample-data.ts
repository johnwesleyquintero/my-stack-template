// Sample data for manual entry and offline usage

export const sampleData = {
  // Sample product data
  products: [
    {
      asin: 'B08N5KWB9H',
      title: 'Wireless Earbuds',
      category: 'Electronics',
      price: 49.99,
      stock: 156,
      date: '2024-02-28',
      revenue: 7798.44,
      units: 156,
    },
    {
      asin: 'B09B8WX3QN',
      title: 'Smart Watch',
      category: 'Electronics',
      price: 199.99,
      stock: 42,
      date: '2024-02-27',
      revenue: 8399.58,
      units: 42,
    },
    {
      asin: 'B07PQNHM5F',
      title: 'Yoga Mat',
      category: 'Sports',
      price: 29.99,
      stock: 89,
      date: '2024-02-26',
      revenue: 2669.11,
      units: 89,
    },
    {
      asin: 'B01LYCLS24',
      title: 'Phone Case',
      category: 'Accessories',
      price: 19.99,
      stock: 245,
      date: '2024-02-25',
      revenue: 4897.55,
      units: 245,
    },
    {
      asin: 'B083FD6Y5R',
      title: 'Bluetooth Speaker',
      category: 'Electronics',
      price: 79.99,
      stock: 68,
      date: '2024-02-24',
      revenue: 5439.32,
      units: 68,
    },
  ],

  // Sample keyword data
  keywords: [
    {
      keyword: 'wireless earbuds',
      asin: 'B08N5KWB9H',
      organicRank: 5,
      sponsoredRank: 2,
      searchVolume: 45000,
      date: '2024-02-28',
    },
    {
      keyword: 'bluetooth earbuds',
      asin: 'B08N5KWB9H',
      organicRank: 8,
      sponsoredRank: 3,
      searchVolume: 32000,
      date: '2024-02-28',
    },
    {
      keyword: 'smart watch',
      asin: 'B09B8WX3QN',
      organicRank: 12,
      sponsoredRank: 4,
      searchVolume: 38000,
      date: '2024-02-28',
    },
    {
      keyword: 'fitness watch',
      asin: 'B09B8WX3QN',
      organicRank: 15,
      sponsoredRank: 6,
      searchVolume: 25000,
      date: '2024-02-28',
    },
    {
      keyword: 'yoga mat',
      asin: 'B07PQNHM5F',
      organicRank: 3,
      sponsoredRank: 1,
      searchVolume: 18000,
      date: '2024-02-28',
    },
  ],

  // Sample sales data
  sales: [
    {
      date: '2024-02-28',
      asin: 'B08N5KWB9H',
      units: 42,
      revenue: 2099.58,
      refunds: 1,
      adSpend: 320.45,
    },
    {
      date: '2024-02-27',
      asin: 'B08N5KWB9H',
      units: 38,
      revenue: 1899.62,
      refunds: 0,
      adSpend: 285.3,
    },
    {
      date: '2024-02-28',
      asin: 'B09B8WX3QN',
      units: 15,
      revenue: 2999.85,
      refunds: 1,
      adSpend: 450.75,
    },
    {
      date: '2024-02-27',
      asin: 'B09B8WX3QN',
      units: 12,
      revenue: 2399.88,
      refunds: 0,
      adSpend: 380.5,
    },
    {
      date: '2024-02-28',
      asin: 'B07PQNHM5F',
      units: 25,
      revenue: 749.75,
      refunds: 2,
      adSpend: 120.25,
    },
  ],

  // Sample mapping templates
  mappingTemplates: {
    'Amazon Sales Report': {
      'amazon-order-id': 'orderId',
      'purchase-date': 'date',
      asin: 'asin',
      'product-name': 'title',
      quantity: 'units',
      'item-price': 'price',
      'product-sales': 'revenue',
      category: 'category',
    },
    'Inventory Report': {
      'seller-sku': 'sku',
      asin: 'asin',
      'product-name': 'title',
      price: 'price',
      quantity: 'stock',
      'product-group': 'category',
    },
    'Keyword Tracking': {
      keyword: 'keyword',
      asin: 'asin',
      'organic-rank': 'organicRank',
      'sponsored-rank': 'sponsoredRank',
      'search-volume': 'searchVolume',
      date: 'date',
    },
  },
}

// Field type definitions for mapping
export const fieldTypes = {
  asin: 'string',
  title: 'string',
  category: 'string',
  price: 'currency',
  stock: 'number',
  date: 'date',
  revenue: 'currency',
  units: 'number',
  keyword: 'string',
  organicRank: 'number',
  sponsoredRank: 'number',
  searchVolume: 'number',
  orderId: 'string',
  sku: 'string',
  refunds: 'number',
  adSpend: 'currency',
}

// Sample data generator functions
export function generateSampleData(
  type: 'products' | 'keywords' | 'sales',
  count = 10
) {
  const baseData = sampleData[type]
  const result = []

  for (let i = 0; i < count; i++) {
    // Clone a random item from the base data
    const baseItem = { ...baseData[i % baseData.length] }

    // Modify some values to make it unique
    if (type === 'products') {
      baseItem.asin = `B${Math.floor(10000000 + Math.random() * 90000000)}`
      baseItem.stock = Math.floor(Math.random() * 200) + 1
      baseItem.price = Number.parseFloat((Math.random() * 100 + 10).toFixed(2))
      baseItem.revenue = Number.parseFloat(
        (baseItem.price * baseItem.stock).toFixed(2)
      )
    } else if (type === 'keywords') {
      baseItem.organicRank = Math.floor(Math.random() * 50) + 1
      baseItem.sponsoredRank = Math.floor(Math.random() * 20) + 1
      baseItem.searchVolume = Math.floor(Math.random() * 50000) + 1000
    } else if (type === 'sales') {
      baseItem.units = Math.floor(Math.random() * 50) + 1
      baseItem.revenue = Number.parseFloat(
        (Math.random() * 2000 + 100).toFixed(2)
      )
      baseItem.refunds = Math.floor(Math.random() * 3)
      baseItem.adSpend = Number.parseFloat((Math.random() * 500).toFixed(2))
    }

    result.push(baseItem)
  }

  return result
}
