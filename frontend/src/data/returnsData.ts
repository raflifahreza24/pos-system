import type { Status } from '../components/ui/StatusBadge'
import { transactions } from './transactionsData'

export interface ReturnRefund {
  id: string
  invoiceId: string
  date: string
  customer: string
  branch: string
  total: number
  status: Status
}

// Mostly approved, a few still pending review, occasional rejection —
// mirrors a real returns queue.
const statusCycle: Status[] = ['Approved', 'Approved', 'Pending', 'Approved', 'Rejected']

function generateReturns(count: number): ReturnRefund[] {
  return Array.from({ length: count }, (_, index) => {
    // Every return traces back to a real transaction, so Invoice/Customer/
    // Branch stay consistent with the Transactions page instead of being
    // invented separately.
    const source = transactions[(index * 3) % transactions.length]
    const returnedAt = new Date(source.date)
    returnedAt.setDate(returnedAt.getDate() + 1)

    return {
      id: `RTN-${String(index + 1).padStart(4, '0')}`,
      invoiceId: source.id,
      date: returnedAt.toISOString(),
      customer: source.customer,
      branch: source.branch,
      total: Math.round(source.total * 0.4),
      status: statusCycle[index % statusCycle.length],
    }
  })
}

export const returns: ReturnRefund[] = generateReturns(32)
