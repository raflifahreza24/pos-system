import { useEffect, useMemo, useState } from 'react'
import { PageHeader } from '../../components/ui/PageHeader'
import { MetricCard } from '../../components/ui/MetricCard'
import { Pagination } from '../../components/ui/Pagination'
import { InventoryToolbar } from '../../components/inventory/InventoryToolbar'
import { InventoryTable } from '../../components/inventory/InventoryTable'
import { IconAlertTriangle, IconBox, IconInventory, IconPackageX } from '../../components/ui/icons'
import { usePagination } from '../../hooks/usePagination'
import { formatNumber } from '../../utils/formatters'
import { inventoryItems, inventorySummary } from '../../data/inventoryData'
import { branches } from '../../data/transactionsData'

const PAGE_SIZE = 10

export function InventoryPage() {
  const [branch, setBranch] = useState('all')
  const [search, setSearch] = useState('')

  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase()
    return inventoryItems.filter((item) => {
      const matchesBranch = branch === 'all' || item.branch === branch
      const matchesQuery =
        !query || item.product.toLowerCase().includes(query) || item.sku.toLowerCase().includes(query)
      return matchesBranch && matchesQuery
    })
  }, [branch, search])

  const pagination = usePagination(filteredItems, PAGE_SIZE)

  useEffect(() => {
    pagination.setPage(1)
  }, [branch, search])

  return (
    <div className="mx-auto flex max-w-[1400px] flex-col gap-5">
      <PageHeader title="Inventory" subtitle="Track stock levels across every branch." />

      <InventoryToolbar
        branch={branch}
        onBranchChange={setBranch}
        branches={branches}
        search={search}
        onSearchChange={setSearch}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Total Items"
          value={formatNumber(inventorySummary.totalItems)}
          icon={<IconBox size={18} />}
        />
        <MetricCard
          label="Total Stock"
          value={formatNumber(inventorySummary.totalStock)}
          icon={<IconInventory size={18} />}
        />
        <MetricCard
          label="Low Stock"
          value={formatNumber(inventorySummary.lowStock)}
          icon={<IconAlertTriangle size={18} />}
          tone="warning"
        />
        <MetricCard
          label="Out of Stock"
          value={formatNumber(inventorySummary.outOfStock)}
          icon={<IconPackageX size={18} />}
          tone="danger"
        />
      </div>

      <InventoryTable rows={pagination.pageItems} startIndex={pagination.rangeStart} />

      <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="text-sm text-ink-muted">
          Showing {pagination.rangeStart} to {pagination.rangeEnd} of {pagination.total} entries
        </p>
        <Pagination page={pagination.page} totalPages={pagination.totalPages} onChange={pagination.setPage} />
      </div>
    </div>
  )
}
