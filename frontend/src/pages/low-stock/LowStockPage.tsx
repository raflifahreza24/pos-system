import { useEffect, useMemo, useState } from 'react'
import { PageHeader } from '../components/ui/PageHeader'
import { Pagination } from '../components/ui/Pagination'
import { LowStockToolbar } from '../components/low-stock/LowStockToolbar'
import { LowStockTable } from '../components/low-stock/LowStockTable'
import { usePagination } from '../hooks/usePagination'
import { lowStockItems } from '../data/inventoryData'
import { branches } from '../data/transactionsData'
import { categoryNames } from '../data/categoriesData'

const PAGE_SIZE = 10

export function LowStockPage() {
  const [branch, setBranch] = useState('all')
  const [category, setCategory] = useState('all')

  const filteredItems = useMemo(() => {
    return lowStockItems.filter((item) => {
      const matchesBranch = branch === 'all' || item.branch === branch
      const matchesCategory = category === 'all' || item.category === category
      return matchesBranch && matchesCategory
    })
  }, [branch, category])

  const pagination = usePagination(filteredItems, PAGE_SIZE)

  useEffect(() => {
    pagination.setPage(1)
  }, [branch, category])

  return (
    <div className="mx-auto flex max-w-[1400px] flex-col gap-5">
      <PageHeader title="Low Stock" subtitle="Products at or below their minimum stock level." />

      <LowStockToolbar
        branch={branch}
        onBranchChange={setBranch}
        branches={branches}
        category={category}
        onCategoryChange={setCategory}
        categories={categoryNames}
      />

      <LowStockTable rows={pagination.pageItems} startIndex={pagination.rangeStart} />

      <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="text-sm text-ink-muted">
          Showing {pagination.rangeStart} to {pagination.rangeEnd} of {pagination.total} entries
        </p>
        <Pagination page={pagination.page} totalPages={pagination.totalPages} onChange={pagination.setPage} />
      </div>
    </div>
  )
}
