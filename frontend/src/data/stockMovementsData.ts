import { products } from './productsData'
import { branches } from './transactionsData'

export type StockMovementType = 'Purchase' | 'Sale' | 'Transfer' | 'Adjustment'

export interface StockMovement {
  id: string
  date: string
  product: string
  branch: string
  type: StockMovementType
  reference: string
  in: number | null
  out: number | null
  balance: number
}

export const stockMovementTypes: StockMovementType[] = ['Purchase', 'Sale', 'Transfer', 'Adjustment']

const MOVEMENT_STEPS: { type: StockMovementType; prefix: string; direction: 'in' | 'out' }[] = [
  { type: 'Purchase', prefix: 'PO', direction: 'in' },
  { type: 'Sale', prefix: 'INV', direction: 'out' },
  { type: 'Transfer', prefix: 'TRF', direction: 'out' },
  { type: 'Adjustment', prefix: 'ADJ', direction: 'out' },
]

// Derived from `products` (not re-typed) so every movement traces back to a
// real product name — same cross-reference pattern used across the app
// (Inventory, Returns↔Transactions, Price & Discounts↔Products, ...).
// Each product gets a short in/out history that settles into a running balance.
function buildStockMovements(): StockMovement[] {
  const start = new Date('2026-09-02T09:00:00')
  const movements: StockMovement[] = []
  let sequence = 0

  products.forEach((product, productIndex) => {
    let balance = 0
    const stepCount = 3 + (productIndex % 2) // 3 or 4 movements per product

    for (let step = 0; step < stepCount; step += 1) {
      const config = MOVEMENT_STEPS[step % MOVEMENT_STEPS.length]
      sequence += 1

      const inQty = config.direction === 'in' ? 80 + ((productIndex * 7 + step * 3) % 60) : null
      const outQty =
        config.direction === 'out'
          ? Math.min(balance, 2 + ((productIndex * 5 + step * 4) % 12)) || null
          : null

      balance = balance + (inQty ?? 0) - (outQty ?? 0)

      const date = new Date(start.getTime() - sequence * 3.7 * 60 * 60 * 1000)

      movements.push({
        id: `MOV-${String(sequence).padStart(4, '0')}`,
        date: date.toISOString(),
        product: product.name,
        branch: branches[(productIndex + step) % branches.length],
        type: config.type,
        reference: `${config.prefix}-${String(productIndex * 10 + step + 1).padStart(4, '0')}`,
        in: inQty,
        out: outQty,
        balance,
      })
    }
  })

  return movements
}

export const stockMovements: StockMovement[] = buildStockMovements()
