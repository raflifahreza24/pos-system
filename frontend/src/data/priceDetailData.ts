import { branches } from './branchesData'
import { users } from './usersData'
import type { PriceDiscountEntry } from './priceDiscountsData'
import type { Status } from '../components/ui/StatusBadge'

export interface BranchPriceRow {
  branch: string
  price: number
  status: Status
}

export interface PriceHistoryRow {
  price: number
  startDate: string | null
  endDate: string | null
  branch: string
  changedAt: string
  changedBy: string
  remarks: string
}

export interface PriceDetail {
  effectiveScope: string
  tax: string
  notes: string
  branchPrices: BranchPriceRow[]
  createdAt: string
  createdBy: string
  updatedAt: string
  updatedBy: string
  history: PriceHistoryRow[]
}

const superAdminName = users.find((user) => user.role === 'Super Admin')?.name ?? 'Super Admin'

function seedFromEntryId(entryId: string): number {
  const digits = entryId.replace(/\D/g, '')
  return Number(digits) || 1
}

function offsetFrom(base: Date, days: number, hour: number, minute: number): string {
  const date = new Date(base.getTime() - days * 24 * 60 * 60 * 1000)
  date.setHours(hour, minute, 0, 0)
  return date.toISOString()
}

/**
 * The Price List table (src/data/priceDiscountsData.ts) only carries what
 * the list view needs. The Price Detail page shows more — which branches
 * a price applies to, who last changed it, and its change history — none
 * of which the backend exposes yet, so this generates deterministic
 * placeholder data from the entry's id until a real price-detail
 * endpoint exists.
 */
export function getPriceDetail(entry: PriceDiscountEntry): PriceDetail {
  const seed = seedFromEntryId(entry.id)
  const today = new Date('2026-09-07T12:00:00')

  const isAllBranches = seed % 3 !== 0
  const effectiveScope = isAllBranches ? 'All Branches' : branches[seed % branches.length].name
  const tax = seed % 4 === 0 ? 'Exclude Tax' : 'Include Tax'

  const branchPrices: BranchPriceRow[] = Array.from({ length: 3 }, (_, index) => {
    const branch = branches[(seed + index) % branches.length]
    const variance = ((seed + index * 7) % 3) * 500
    return {
      branch: branch.name,
      price: entry.value + variance,
      status: (seed + index) % 6 === 0 ? 'Inactive' : 'Active',
    }
  })

  const createdAt = offsetFrom(today, 6 + (seed % 5), 8, 15)
  const updatedAt = offsetFrom(today, seed % 3, 14, 20)

  const history: PriceHistoryRow[] = [
    {
      price: entry.value,
      startDate: entry.startDate,
      endDate: entry.endDate,
      branch: effectiveScope,
      changedAt: updatedAt,
      changedBy: superAdminName,
      remarks: '-',
    },
    {
      price: Math.max(entry.value - 500 - (seed % 500), 1000),
      startDate: offsetFrom(today, 37, 0, 0).slice(0, 10),
      endDate: offsetFrom(today, 7, 0, 0).slice(0, 10),
      branch: branches[(seed + 1) % branches.length].name,
      changedAt: offsetFrom(today, 40 + (seed % 5), 10, 5),
      changedBy: superAdminName,
      remarks: 'Promo Agustus',
    },
    {
      price: entry.value,
      startDate: null,
      endDate: null,
      branch: 'All Branches',
      changedAt: offsetFrom(today, 98 + (seed % 7), 9, 30),
      changedBy: superAdminName,
      remarks: 'Harga awal',
    },
  ]

  return {
    effectiveScope,
    tax,
    notes: entry.type === 'Discount' ? 'Promo period pricing.' : '',
    branchPrices,
    createdAt,
    createdBy: superAdminName,
    updatedAt,
    updatedBy: superAdminName,
    history,
  }
}
