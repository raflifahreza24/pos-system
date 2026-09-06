import type { Status } from '../components/ui/StatusBadge'

export type PaymentMethod = 'Cash' | 'Debit Card' | 'Credit Card' | 'QRIS' | 'Bank Transfer'

export interface Transaction {
  id: string
  date: string
  customer: string
  cashier: string
  branch: string
  total: number
  payment: PaymentMethod
  status: Status
}

export const branches = ['Branch A', 'Branch B', 'Branch C', 'Branch D', 'Branch E', 'Branch F']

export const cashiers = ['Rina', 'Andi', 'Budi', 'Siti', 'Dewi', 'Rizky']

const customerPool = [
  'Walk-in',
  'Andi Saputra',
  'Siti Rahma',
  'Budi Hartono',
  'Dewi Lestari',
  'Rizky Pratama',
  'Maya Putri',
  'Fajar Nugraha',
]

export const paymentMethods: PaymentMethod[] = ['Cash', 'Debit Card', 'Credit Card', 'QRIS', 'Bank Transfer']

// Mostly "Paid", occasionally "Pending" / "Refunded" — mirrors a real POS mix.
const statusCycle: Status[] = ['Paid', 'Paid', 'Paid', 'Paid', 'Pending', 'Paid', 'Refunded', 'Paid']

function generateTransactions(count: number): Transaction[] {
  const start = new Date('2026-09-02T10:00:00')

  return Array.from({ length: count }, (_, index) => {
    const date = new Date(start.getTime() - index * 47 * 60 * 1000)

    return {
      id: `INV-${String(index + 1).padStart(4, '0')}`,
      date: date.toISOString(),
      customer: customerPool[index % customerPool.length],
      cashier: cashiers[index % cashiers.length],
      branch: branches[index % branches.length],
      total: 15000 + ((index * 8237) % 480000),
      payment: paymentMethods[index % paymentMethods.length],
      status: statusCycle[index % statusCycle.length],
    }
  })
}

export const transactions: Transaction[] = generateTransactions(100)
