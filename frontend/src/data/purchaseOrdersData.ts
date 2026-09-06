import type { Status } from '../components/ui/StatusBadge'
import { suppliers } from './suppliersData'
import { products } from './productsData'

export interface PurchaseOrderItem {
  productId: string
  quantity: number
}

export interface PurchaseOrder {
  id: string
  poNo: string
  supplier: string
  date: string
  expectedDeliveryDate: string
  total: number
  status: Status
  items: PurchaseOrderItem[]
}

// Cycles Ordered -> In Transit -> Received, mirroring a real PO lifecycle.
const statusCycle: Status[] = ['Ordered', 'In Transit', 'Received', 'Received']

// Every PO orders 2-4 products, cycling deterministically through the real
// product catalog so the same PO always shows the same line items — this
// is what Goods Receiving's "Items" step reads to pre-fill Ordered Qty.
function buildItems(index: number): PurchaseOrderItem[] {
  const itemCount = 2 + (index % 3)
  return Array.from({ length: itemCount }, (_, itemIndex) => {
    const product = products[(index * 3 + itemIndex) % products.length]
    return {
      productId: product.id,
      quantity: 5 + ((index + itemIndex) % 4) * 5,
    }
  })
}

// Supplier names are pulled from `suppliers` (not re-typed) so every PO
// always points at a real row on the Suppliers page. `total` is derived
// from `items` and each product's real price, not a separate formula, so
// the PO list and the Goods Receiving "Total Order" always agree.
function buildPurchaseOrders(count: number): PurchaseOrder[] {
  const start = new Date('2026-09-02T09:00:00')

  return Array.from({ length: count }, (_, index) => {
    const date = new Date(start.getTime() - index * 18 * 60 * 60 * 1000)
    const expectedDeliveryDate = new Date(date.getTime() + 5 * 24 * 60 * 60 * 1000)
    const items = buildItems(index)
    const total = items.reduce((sum, item) => {
      const product = products.find((entry) => entry.id === item.productId)
      return sum + (product?.price ?? 0) * item.quantity
    }, 0)

    return {
      id: `purchase-order-${index + 1}`,
      poNo: `PO-${String(index + 1).padStart(4, '0')}`,
      supplier: suppliers[index % suppliers.length].name,
      date: date.toISOString(),
      expectedDeliveryDate: expectedDeliveryDate.toISOString(),
      total,
      status: statusCycle[index % statusCycle.length],
      items,
    }
  })
}

export const purchaseOrders: PurchaseOrder[] = buildPurchaseOrders(24)

// Next PO number the create form should show — one past the last generated
// mock record, in the same PO-#### shape as `buildPurchaseOrders`.
export function getNextPoNo(): string {
  return `PO-${String(purchaseOrders.length + 1).padStart(4, '0')}`
}
