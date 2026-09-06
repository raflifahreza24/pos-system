import type { Status } from '../components/ui/StatusBadge'
import { branches } from './transactionsData'

export interface StockTransfer {
  id: string
  transferNo: string
  fromBranch: string
  toBranch: string
  date: string
  status: Status
}

// Mostly "Completed", occasionally "Pending" / "In Transit" — mirrors the
// status mix already used for Transactions and Returns & Refunds.
const statusCycle: Status[] = ['Completed', 'Completed', 'In Transit', 'Completed', 'Pending', 'Completed']

function buildStockTransfers(count: number): StockTransfer[] {
  const start = new Date('2026-09-02T09:00:00')

  return Array.from({ length: count }, (_, index) => {
    const fromBranch = branches[index % branches.length]
    // Offset by 1+ so `toBranch` is never the same branch as `fromBranch`.
    const toBranch = branches[(index + 1 + (index % (branches.length - 1))) % branches.length]
    const date = new Date(start.getTime() - index * 14 * 60 * 60 * 1000)

    return {
      id: `stock-transfer-${index + 1}`,
      transferNo: `TRF-${String(index + 1).padStart(4, '0')}`,
      fromBranch,
      toBranch,
      date: date.toISOString(),
      status: statusCycle[index % statusCycle.length],
    }
  })
}

export const stockTransfers: StockTransfer[] = buildStockTransfers(24)

// Next transfer number the create form should show — one past the last
// generated mock record, in the same TRF-#### shape as `buildStockTransfers`.
export function getNextTransferNo(): string {
  return `TRF-${String(stockTransfers.length + 1).padStart(4, '0')}`
}
