import type { Status } from '../components/ui/StatusBadge'
import { branches } from './transactionsData'

export interface StockOpname {
  id: string
  opnameNo: string
  branch: string
  date: string
  status: Status
}

// Mostly "Completed", occasionally "Pending" — same status-mix convention
// used across Transactions, Returns & Refunds, and Stock Transfer.
const statusCycle: Status[] = ['Completed', 'Completed', 'Completed', 'Pending', 'Completed', 'Pending']

function buildStockOpnames(count: number): StockOpname[] {
  const start = new Date('2026-09-02T09:00:00')

  return Array.from({ length: count }, (_, index) => {
    const date = new Date(start.getTime() - index * 22 * 60 * 60 * 1000)

    return {
      id: `stock-opname-${index + 1}`,
      opnameNo: `OPN-${String(index + 1).padStart(4, '0')}`,
      branch: branches[index % branches.length],
      date: date.toISOString(),
      status: statusCycle[index % statusCycle.length],
    }
  })
}

export const stockOpnames: StockOpname[] = buildStockOpnames(20)

// Next opname number the create form should show — one past the last
// generated mock record, in the same OPN-#### shape as `buildStockOpnames`.
export function getNextOpnameNo(): string {
  return `OPN-${String(stockOpnames.length + 1).padStart(4, '0')}`
}
