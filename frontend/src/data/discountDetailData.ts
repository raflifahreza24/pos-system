import { branches } from './branchesData'
import { users } from './usersData'
import { capitalize } from '../utils/formatters'
import type { DiscountValueKind, PriceDiscountEntry } from './priceDiscountsData'
import type { Product } from './productsData'
import type { Status } from '../components/ui/StatusBadge'

export interface DiscountBranchRow {
  branch: string
  applicable: boolean
  status: Status
}

export interface DiscountUsage {
  totalTransactions: number
  totalQuantitySold: number
  totalDiscountAmount: number
  estimatedRevenue: number
}

export interface DiscountDetail {
  discountName: string
  normalPrice: number
  finalPrice: number
  applicableScope: string
  status: Status
  notes: string
  branches: DiscountBranchRow[]
  terms: string[]
  usage: DiscountUsage
  createdAt: string
  createdBy: string
  updatedAt: string
  updatedBy: string
}

const superAdminName = users.find((user) => user.role === 'Super Admin')?.name ?? 'Super Admin'

// Shared by the detail page (from the entry's stored value) and the edit
// page (from whatever the form currently holds), so both compute a
// discount's selling price with the exact same rule.
export function computeFinalPrice(normalPrice: number, valueKind: DiscountValueKind, value: number): number {
  return valueKind === 'percentage'
    ? Math.round(normalPrice * (1 - value / 100))
    : Math.max(normalPrice - value, 0)
}

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
 * The Discounts tab's list data (src/data/priceDiscountsData.ts) only
 * carries what the list view needs. The Discount Detail page shows a lot
 * more — which branches it applies to, its terms, usage numbers, who
 * last touched it — none of which the backend exposes yet, so this
 * generates deterministic placeholder data from the entry until a real
 * discount-detail endpoint exists.
 */
export function getDiscountDetail(entry: PriceDiscountEntry, product: Product): DiscountDetail {
  const seed = seedFromEntryId(entry.id)
  const today = new Date('2026-09-07T12:00:00')

  const monthName = entry.startDate
    ? capitalize(new Intl.DateTimeFormat('id-ID', { month: 'long' }).format(new Date(entry.startDate)))
    : 'Ini'
  const discountName = `Promo ${monthName}`

  const normalPrice = product.price
  const finalPrice = computeFinalPrice(normalPrice, entry.valueKind, entry.value)

  const isAllBranches = seed % 3 !== 0
  const applicableScope = isAllBranches ? 'All Branches' : branches[seed % branches.length].name
  const status: Status = seed % 7 === 0 ? 'Inactive' : 'Active'

  const branchRows: DiscountBranchRow[] = Array.from({ length: 3 }, (_, index) => {
    const branch = branches[(seed + index) % branches.length]
    return {
      branch: branch.name,
      applicable: isAllBranches || branch.name === applicableScope || (seed + index) % 4 !== 0,
      status: (seed + index) % 6 === 0 ? 'Inactive' : 'Active',
    }
  })

  const terms = [
    'Diskon berlaku untuk pembelian di outlet dan online.',
    'Tidak dapat digabung dengan promo lainnya.',
    'Berlaku selama periode yang telah ditentukan.',
    `Hanya untuk produk ${product.name} ukuran reguler.`,
  ]

  const discountPerUnit = normalPrice - finalPrice
  const totalQuantitySold = 150 + ((seed * 37) % 300)
  const totalTransactions = 40 + ((seed * 11) % 150)

  const usage: DiscountUsage = {
    totalTransactions,
    totalQuantitySold,
    totalDiscountAmount: discountPerUnit * totalQuantitySold,
    estimatedRevenue: finalPrice * totalQuantitySold,
  }

  const createdAt = offsetFrom(today, 10 + (seed % 5), 14, 30)
  const updatedAt = offsetFrom(today, 7 + (seed % 3), 9, 15)

  return {
    discountName,
    normalPrice,
    finalPrice,
    applicableScope,
    status,
    notes: `Promo bulan ${monthName} untuk ${applicableScope === 'All Branches' ? 'semua cabang' : applicableScope}.`,
    branches: branchRows,
    terms,
    usage,
    createdAt,
    createdBy: superAdminName,
    updatedAt,
    updatedBy: superAdminName,
  }
}
