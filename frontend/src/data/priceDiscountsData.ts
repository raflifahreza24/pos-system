import { products } from './productsData'
import type { Tab } from '../components/ui/Tabs'

export type PriceDiscountType = 'Price' | 'Discount'

// Shared by the list page's tab switcher and the create form's own
// Price List / Discounts tabs, so both read the exact same labels.
export const priceDiscountTabs: Tab[] = [
  { key: 'Price', label: 'Price List' },
  { key: 'Discount', label: 'Discounts' },
]
export type DiscountValueKind = 'percentage' | 'fixed'

export interface PriceDiscountEntry {
  id: string
  productId: string
  productName: string
  type: PriceDiscountType
  value: number
  valueKind: DiscountValueKind
  startDate: string | null
  endDate: string | null
}

const PROMO_START = '2026-09-01'
const PROMO_END = '2026-09-30'

function generateEntries(count: number): PriceDiscountEntry[] {
  // Every entry traces back to a real product (src/data/productsData.ts),
  // so Product here always matches a real catalog item instead of being
  // invented separately.
  return Array.from({ length: count }, (_, index) => {
    const product = products[index % products.length]
    const id = `PD-${String(index + 1).padStart(3, '0')}`

    if (index % 2 === 0) {
      return {
        id,
        productId: product.id,
        productName: product.name,
        type: 'Price',
        value: product.price,
        valueKind: 'fixed',
        startDate: null,
        endDate: null,
      }
    }

    const isPercentage = index % 4 === 1

    return {
      id,
      productId: product.id,
      productName: product.name,
      type: 'Discount',
      value: isPercentage ? 5 + ((index * 3) % 20) : 2000 + ((index * 750) % 8000),
      valueKind: isPercentage ? 'percentage' : 'fixed',
      startDate: PROMO_START,
      endDate: PROMO_END,
    }
  })
}

export const priceDiscountEntries: PriceDiscountEntry[] = generateEntries(24)
