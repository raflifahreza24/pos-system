import { PageHeader } from '../../../components/ui/PageHeader'
import { Button } from '../../../components/ui/Button'
import { ProductInformationCard } from '../../../components/prices/detail/ProductInformationCard'
import { SystemInformationCard } from '../../../components/prices/detail/SystemInformationCard'
import { DiscountInformationCard } from '../../../components/prices/discount-detail/DiscountInformationCard'
import { BranchApplicabilityCard } from '../../../components/prices/discount-detail/BranchApplicabilityCard'
import { TermsConditionsCard } from '../../../components/prices/discount-detail/TermsConditionsCard'
import { DiscountUsageSummaryCard } from '../../../components/prices/discount-detail/DiscountUsageSummaryCard'
import { IconChevronLeft, IconEdit } from '../../../components/ui/icons'
import { priceDiscountEntries } from '../../../data/priceDiscountsData'
import { products } from '../../../data/productsData'
import { getDiscountDetail } from '../../../data/discountDetailData'

interface DiscountDetailPageProps {
  entryId: string
}

export function DiscountDetailPage({ entryId }: DiscountDetailPageProps) {
  const entry = priceDiscountEntries.find((item) => item.id === entryId && item.type === 'Discount')
  const product = entry ? products.find((item) => item.id === entry.productId) : undefined

  function handleBack() {
    window.location.hash = '#/price-discounts'
  }

  function handleEdit() {
    window.location.hash = `#/price-discounts/discounts/${entryId}/edit`
  }

  if (!entry || !product) {
    return (
      <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-4 py-16 text-center">
        <p className="text-sm text-ink-muted">Discount entry "{entryId}" was not found.</p>
        <Button variant="secondary" icon={<IconChevronLeft size={16} />} onClick={handleBack}>
          Back to Discounts
        </Button>
      </div>
    )
  }

  const detail = getDiscountDetail(entry, product)

  return (
    <div className="mx-auto flex max-w-[1400px] flex-col gap-5">
      <PageHeader
        title="Discount Detail"
        subtitle="View detailed information about this discount."
        action={
          <div className="flex gap-2.5">
            <Button variant="secondary" icon={<IconChevronLeft size={16} />} onClick={handleBack}>
              Back to Discounts
            </Button>
            <Button variant="primary" icon={<IconEdit size={16} />} onClick={handleEdit}>
              Edit Discount
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="flex flex-col gap-5">
          <ProductInformationCard product={product} showStatus={false} />
          <BranchApplicabilityCard rows={detail.branches} />
          <TermsConditionsCard terms={detail.terms} />
        </div>
        <div className="flex flex-col gap-5">
          <DiscountInformationCard entry={entry} detail={detail} />
          <SystemInformationCard detail={detail} />
        </div>
      </div>

      <DiscountUsageSummaryCard usage={detail.usage} />
    </div>
  )
}
