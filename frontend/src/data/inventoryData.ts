import type { Status } from '../components/ui/StatusBadge'
import { products } from './productsData'
import { branches } from './transactionsData'

export interface InventoryItem {
  id: string
  product: string
  category: string
  sku: string
  branch: string
  stock: number
  minStock: number
  reserved: number
  available: number
  unit: string
}

export const LOW_STOCK_THRESHOLD = 15

// Derived from `products` (not re-typed) so item names, categories, and
// stock levels always agree with the Products page — same cross-reference
// pattern as Returns↔Transactions and Price & Discounts↔Products.
function buildInventory(): InventoryItem[] {
  return products.map((product, index) => {
    const reserved = product.stock === 0 ? 0 : Math.min(product.stock, Math.floor(product.stock * 0.08) + (index % 3))

    return {
      id: product.id,
      product: product.name,
      category: product.category,
      sku: product.id.replace('PRD', 'SKU'),
      branch: branches[index % branches.length],
      stock: product.stock,
      minStock: LOW_STOCK_THRESHOLD,
      reserved,
      available: product.stock - reserved,
      unit: 'Pcs',
    }
  })
}

export const inventoryItems: InventoryItem[] = buildInventory()

export const inventorySummary = {
  totalItems: inventoryItems.length,
  totalStock: inventoryItems.reduce((sum, item) => sum + item.stock, 0),
  lowStock: inventoryItems.filter((item) => item.stock > 0 && item.stock <= LOW_STOCK_THRESHOLD).length,
  outOfStock: inventoryItems.filter((item) => item.stock === 0).length,
}

export interface LowStockItem extends InventoryItem {
  status: Extract<Status, 'Low Stock' | 'Out of Stock'>
}

// Reuses the exact stock <= minStock / stock === 0 comparisons that already
// back `inventorySummary` above, so the Low Stock page's list always agrees
// with the Inventory page's "Low Stock" / "Out of Stock" tiles.
export const lowStockItems: LowStockItem[] = inventoryItems
  .filter((item) => item.stock <= item.minStock)
  .map((item) => ({
    ...item,
    status: item.stock === 0 ? 'Out of Stock' : 'Low Stock',
  }))
