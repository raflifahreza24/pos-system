import { useMemo, useState } from 'react'
import { PageHeader } from '../../../components/ui/PageHeader'
import { Button } from '../../../components/ui/Button'
import { IconChevronLeft } from '../../../components/ui/icons'
import { ProductInformationStep } from '../../../components/prices/edit/ProductInformationStep'
import {
  DiscountInformationStep,
  type EditDiscountInformationState,
} from '../../../components/prices/discount-edit/DiscountInformationStep'
import { BranchApplicabilityStep } from '../../../components/prices/discount-edit/BranchApplicabilityStep'
import { TermsConditionsStep } from '../../../components/prices/discount-edit/TermsConditionsStep'
import { PreviewSummaryStep } from '../../../components/prices/discount-edit/PreviewSummaryStep'
import { priceDiscountEntries, type PriceDiscountEntry } from '../../../data/priceDiscountsData'
import { products, type Product } from '../../../data/productsData'
import { computeFinalPrice, getDiscountDetail } from '../../../data/discountDetailData'
import { formatCurrency } from '../../../utils/formatters'

interface DiscountEditPageProps {
  entryId: string
}

function handleBackToList() {
  window.location.hash = '#/price-discounts'
}

export function DiscountEditPage({ entryId }: DiscountEditPageProps) {
  const entry = priceDiscountEntries.find((item) => item.id === entryId && item.type === 'Discount')
  const product = entry ? products.find((item) => item.id === entry.productId) : undefined

  if (!entry || !product) {
    return (
      <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-4 py-16 text-center">
        <p className="text-sm text-ink-muted">Discount entry "{entryId}" was not found.</p>
        <Button variant="secondary" icon={<IconChevronLeft size={16} />} onClick={handleBackToList}>
          Back to Discounts
        </Button>
      </div>
    )
  }

  return <DiscountEditForm entry={entry} product={product} />
}

// Split out so the hooks below only ever run once a real Discount entry
// is found — mirrors PriceEditForm's own split for the same reason.
function DiscountEditForm({ entry, product }: { entry: PriceDiscountEntry; product: Product }) {
  const detail = getDiscountDetail(entry, product)

  function goToDetail() {
    window.location.hash = `#/price-discounts/discounts/${entry.id}`
  }

  const [discountInfo, setDiscountInfo] = useState<EditDiscountInformationState>({
    discountName: detail.discountName,
    discountType: entry.valueKind,
    discountValue: entry.value,
    startDate: entry.startDate ?? '',
    endDate: entry.endDate ?? '',
    applicableScope: detail.applicableScope,
    status: detail.status,
    notes: detail.notes,
  })

  const [termsText, setTermsText] = useState(() => detail.terms.map((term, index) => `${index + 1}. ${term}`).join('\n'))

  function updateDiscountInfo<K extends keyof EditDiscountInformationState>(
    field: K,
    value: EditDiscountInformationState[K],
  ) {
    setDiscountInfo((prev) => ({ ...prev, [field]: value }))
  }

  const finalPrice = useMemo(
    () => computeFinalPrice(product.price, discountInfo.discountType, discountInfo.discountValue),
    [product.price, discountInfo.discountType, discountInfo.discountValue],
  )

  function handleCancel() {
    goToDetail()
  }

  // TODO: submit the updated discount to the backend once that endpoint exists.
  function handleSubmit() {
    goToDetail()
  }

  const canSubmit = discountInfo.discountName.trim() !== '' && discountInfo.discountValue > 0

  return (
    <div className="mx-auto flex max-w-[1400px] flex-col gap-5">
      <PageHeader
        title="Edit Discount"
        subtitle="Update the discount information."
        action={
          <Button variant="secondary" icon={<IconChevronLeft size={16} />} onClick={handleBackToList}>
            Back to Discounts
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="flex flex-col gap-5">
          <ProductInformationStep product={product} />
          <DiscountInformationStep
            value={discountInfo}
            onChange={updateDiscountInfo}
            normalPrice={product.price}
            finalPrice={finalPrice}
          />
        </div>
        <div className="flex flex-col gap-5">
          <BranchApplicabilityStep
            value={discountInfo.applicableScope}
            onChange={(scope) => updateDiscountInfo('applicableScope', scope)}
          />
          <TermsConditionsStep value={termsText} onChange={setTermsText} />
          <PreviewSummaryStep
            productName={product.name}
            discountTypeLabel={discountInfo.discountType === 'percentage' ? 'Percentage' : 'Fixed Amount'}
            discountValueLabel={
              discountInfo.discountType === 'percentage'
                ? `${discountInfo.discountValue}%`
                : formatCurrency(discountInfo.discountValue)
            }
            normalPrice={product.price}
            finalPrice={finalPrice}
            startDate={discountInfo.startDate}
            endDate={discountInfo.endDate}
            applicableScope={discountInfo.applicableScope}
            status={discountInfo.status}
            notes={discountInfo.notes}
          />
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
