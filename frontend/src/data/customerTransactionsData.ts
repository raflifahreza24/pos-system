import { branches } from './branchesData'

export interface CustomerPurchaseSummary {
  totalTransactions: number
  totalSpending: number
  averageTransaction: number
}

export interface CustomerRecentTransaction {
  invoiceNo: string
  date: string
  branch: string
  total: number
}

// Per-customer purchase history — the Customer Detail page's Purchase
// Summary and Recent Transactions are placeholder data for now (no
// customer-scoped transactions endpoint exists yet), generated
// deterministically from the customer's id so the same customer always
// sees the same numbers instead of a different mock on every render.
function seedFromCustomerId(customerId: string): number {
  const digits = customerId.replace(/\D/g, '')
  return Number(digits) || 1
}

export function getCustomerPurchaseSummary(customerId: string): CustomerPurchaseSummary {
  const seed = seedFromCustomerId(customerId)
  const totalTransactions = 8 + ((seed * 5) % 40)
  const totalSpending = 350000 + ((seed * 91700) % 4500000)
  const averageTransaction = Math.round(totalSpending / totalTransactions)

  return { totalTransactions, totalSpending, averageTransaction }
}

export function getCustomerRecentTransactions(customerId: string, limit = 4): CustomerRecentTransaction[] {
  const seed = seedFromCustomerId(customerId)
  const start = new Date('2026-09-07T12:00:00')

  return Array.from({ length: limit }, (_, index) => {
    const invoiceNumber = seed * 3 + (limit - index)
    const date = new Date(start.getTime() - index * (2 + ((seed + index) % 4)) * 24 * 60 * 60 * 1000)

    return {
      invoiceNo: `INV-${String(invoiceNumber).padStart(4, '0')}`,
      date: date.toISOString().slice(0, 10),
      branch: branches[(seed + index) % branches.length].name,
      total: 50000 + ((seed * 137 + index * 41300) % 350000),
    }
  })
}
