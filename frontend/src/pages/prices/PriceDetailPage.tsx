import { PageHeader } from '../../components/ui/PageHeader'
import { Button } from '../../components/ui/Button'
import { ProductInformationCard } from '../../components/prices/detail/ProductInformationCard'
import { PriceInformationCard } from '../../components/prices/detail/PriceInformationCard'
import { BranchPricesCard } from '../../components/prices/detail/BranchPricesCard'
import { SystemInformationCard } from '../../components/prices/detail/SystemInformationCard'
import { PriceHistoryCard } from '../../components/prices/detail/PriceHistoryCard'
import { IconChevronLeft, IconEdit } from '../../components/ui/icons'
import { priceDiscountEntries } from '../../data/priceDiscountsData'
import { products } from '../../data/productsData'
import { getPriceDetail } from '../../data/priceDetailData'

interface PriceDetailPageProps {
  entryId: string
}

export function PriceDetailPage({ entryId }: PriceDetailPageProps) {
  const entry = priceDiscountEntries.find((item) => item.id === entryId && item.type === 'Price')
  const product = entry ? products.find((item) => item.id === entry.productId) : undefined

  function handleBack() {
    window.location.hash = '#/price-discounts'
  }

  function handleEdit() {
    window.location.hash = `#/price-discounts/prices/${entryId}/edit`
  }

  if (!entry || !product) {
    return (
      <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-4 py-16 text-center">
        <p className="text-sm text-ink-muted">Price entry "{entryId}" was not found.</p>
        <Button variant="secondary" icon={<IconChevronLeft size={16} />} onClick={handleBack}>
          Back to Price List
        </Button>
      </div>
    )
  }

  const detail = getPriceDetail(entry)

  return (
    <div className="mx-auto flex max-w-[1400px] flex-col gap-5">
      <PageHeader
        title="Price Detail"
        subtitle="View detailed information about the product price."
        action={
          <div className="flex gap-2.5">
            <Button variant="secondary" icon={<IconChevronLeft size={16} />} onClick={handleBack}>
              Back to Price List
            </Button>
            <Button variant="primary" icon={<IconEdit size={16} />} onClick={handleEdit}>
              Edit Price
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <ProductInformationCard product={product} />
        <PriceInformationCard entry={entry} detail={detail} />
        <BranchPricesCard rows={detail.branchPrices} />
        <SystemInformationCard detail={detail} />
      </div>

      <PriceHistoryCard rows={detail.history} />
    </div>
  )
}
