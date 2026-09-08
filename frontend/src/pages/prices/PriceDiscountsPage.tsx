import { useEffect, useMemo, useState } from 'react'
import { PageHeader } from '../../components/ui/PageHeader'
import { Button } from '../../components/ui/Button'
import { Tabs } from '../../components/ui/Tabs'
import { Pagination } from '../../components/ui/Pagination'
import { PriceDiscountsTable } from '../../components/price-discounts/PriceDiscountsTable'
import { IconPlus } from '../../components/ui/icons'
import { usePagination } from '../../hooks/usePagination'
import {
  priceDiscountEntries,
  priceDiscountTabs,
  type PriceDiscountEntry,
  type PriceDiscountType,
} from '../../data/priceDiscountsData'

const PAGE_SIZE = 10

export function PriceDiscountsPage() {
  const [activeTab, setActiveTab] = useState<PriceDiscountType>('Price')

  const filteredEntries = useMemo(
    () => priceDiscountEntries.filter((entry) => entry.type === activeTab),
    [activeTab],
  )

  const pagination = usePagination(filteredEntries, PAGE_SIZE)

  useEffect(() => {
    pagination.setPage(1)
  }, [activeTab])

  function handleAdd() {
    window.location.hash = '#/price-discounts/create'
  }

  function handleView(entry: PriceDiscountEntry) {
    const basePath = entry.type === 'Price' ? 'prices' : 'discounts'
    window.location.hash = `#/price-discounts/${basePath}/${entry.id}`
  }

  function handleEdit(entry: PriceDiscountEntry) {
    const basePath = entry.type === 'Price' ? 'prices' : 'discounts'
    window.location.hash = `#/price-discounts/${basePath}/${entry.id}/edit`
  }

  return (
    <div className="mx-auto flex max-w-[1400px] flex-col gap-5">
      <PageHeader
        title="Price & Discounts"
        subtitle="Manage product pricing and time-boxed discounts."
        action={
          <Button icon={<IconPlus size={16} />} onClick={handleAdd} fullWidthOnMobile>
            Add
          </Button>
        }
      />

      <Tabs tabs={priceDiscountTabs} activeKey={activeTab} onChange={(key) => setActiveTab(key as PriceDiscountType)} />

      <PriceDiscountsTable
        rows={pagination.pageItems}
        startIndex={pagination.rangeStart}
        onView={handleView}
        onEdit={handleEdit}
      />

      <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="text-sm text-ink-muted">
          Showing {pagination.rangeStart} to {pagination.rangeEnd} of {pagination.total} entries
        </p>
        <Pagination page={pagination.page} totalPages={pagination.totalPages} onChange={pagination.setPage} />
      </div>
    </div>
  )
}
