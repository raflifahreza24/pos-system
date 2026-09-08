import { useState } from 'react'
import { PageHeader } from '../../components/ui/PageHeader'
import { Button } from '../../components/ui/Button'
import { IconChevronLeft } from '../../components/ui/icons'
import { ProductInformationStep } from '../../components/prices/edit/ProductInformationStep'
import {
  PriceInformationStep,
  type EditPriceInformationState,
} from '../../components/prices/edit/PriceInformationStep'
import { CurrentBranchPricesStep } from '../../components/prices/edit/CurrentBranchPricesStep'
import { PriceHistoryStep } from '../../components/prices/edit/PriceHistoryStep'
import { priceDiscountEntries, type PriceDiscountEntry } from '../../data/priceDiscountsData'
import { products, type Product } from '../../data/productsData'
import { getPriceDetail } from '../../data/priceDetailData'

interface PriceEditPageProps {
  entryId: string
}

function handleBackToList() {
  window.location.hash = '#/price-discounts'
}

export function PriceEditPage({ entryId }: PriceEditPageProps) {
  const entry = priceDiscountEntries.find((item) => item.id === entryId && item.type === 'Price')
  const product = entry ? products.find((item) => item.id === entry.productId) : undefined

  if (!entry || !product) {
    return (
      <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-4 py-16 text-center">
        <p className="text-sm text-ink-muted">Price entry "{entryId}" was not found.</p>
        <Button variant="secondary" icon={<IconChevronLeft size={16} />} onClick={handleBackToList}>
          Back to Price List
        </Button>
      </div>
    )
  }

  return <PriceEditForm entry={entry} product={product} />
}

// Split out so the hooks below only ever run once a real Price entry is
// found — mirrors CustomerEditPage's own split for the same reason.
function PriceEditForm({ entry, product }: { entry: PriceDiscountEntry; product: Product }) {
  const detail = getPriceDetail(entry)

  function goToDetail() {
    window.location.hash = `#/price-discounts/prices/${entry.id}`
  }

  const [priceInfo, setPriceInfo] = useState<EditPriceInformationState>({
    price: entry.value,
    effectiveScope: detail.effectiveScope,
    startDate: entry.startDate ?? '',
    endDate: entry.endDate ?? '',
    tax: detail.tax,
    status: 'Active',
    notes: detail.notes,
  })

  const [branchPrices, setBranchPrices] = useState<Record<string, number>>(() =>
    Object.fromEntries(detail.branchPrices.map((row) => [row.branch, row.price])),
  )

  function updatePriceInfo<K extends keyof EditPriceInformationState>(field: K, value: EditPriceInformationState[K]) {
    setPriceInfo((prev) => ({ ...prev, [field]: value }))
  }

  function updateBranchPrice(branch: string, price: number) {
    setBranchPrices((prev) => ({ ...prev, [branch]: price }))
  }

  function handleCancel() {
    goToDetail()
  }

  // TODO: submit the updated price to the backend once that endpoint exists.
  function handleSubmit() {
    goToDetail()
  }

  const canSubmit = priceInfo.price > 0

  return (
    <div className="mx-auto flex max-w-[1400px] flex-col gap-5">
      <PageHeader
        title="Edit Price"
        subtitle="Update product price information."
        action={
          <Button variant="secondary" icon={<IconChevronLeft size={16} />} onClick={handleBackToList}>
            Back to Price List
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="flex flex-col gap-5">
          <ProductInformationStep product={product} />
          <PriceInformationStep value={priceInfo} onChange={updatePriceInfo} />
        </div>
        <div className="flex flex-col gap-5">
          <CurrentBranchPricesStep rows={detail.branchPrices} values={branchPrices} onChange={updateBranchPrice} />
          <PriceHistoryStep rows={detail.history} />
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <Button variant="secondary" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={!canSubmit}>
          Save Changes
        </Button>
      </div>
    </div>
  )
}
