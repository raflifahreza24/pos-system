import { useEffect, useMemo, useState } from 'react'
import { PageHeader } from '../../components/ui/PageHeader'
import { Pagination } from '../../components/ui/Pagination'
import { StockMovementsToolbar } from '../../components/stock-movements/StockMovementsToolbar'
import { StockMovementsTable } from '../../components/stock-movements/StockMovementsTable'
import { usePagination } from '../../hooks/usePagination'
import { matchesDateRange, type DateRangeFilter } from '../../utils/dateRangeFilter'
import { stockMovements, stockMovementTypes, type StockMovementType } from '../../data/stockMovementsData'
import { branches } from '../../data/transactionsData'

const PAGE_SIZE = 10

export function StockMovementsPage() {
  const [dateRange, setDateRange] = useState<DateRangeFilter>('all')
  const [branch, setBranch] = useState('all')
  const [type, setType] = useState<StockMovementType | 'all'>('all')

  const filteredMovements = useMemo(() => {
    return stockMovements.filter((movement) => {
      const matchesBranch = branch === 'all' || movement.branch === branch
      const matchesType = type === 'all' || movement.type === type
      return matchesBranch && matchesType && matchesDateRange(movement.date, dateRange)
    })
  }, [dateRange, branch, type])

  const pagination = usePagination(filteredMovements, PAGE_SIZE)

  useEffect(() => {
    pagination.setPage(1)
  }, [dateRange, branch, type])

  return (
    <div className="mx-auto flex max-w-[1400px] flex-col gap-5">
      <PageHeader title="Stock Movements" subtitle="Every stock in, out, and transfer across branches." />

      <StockMovementsToolbar
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        branch={branch}
        onBranchChange={setBranch}
        branches={branches}
        type={type}
        onTypeChange={setType}
        types={stockMovementTypes}
      />

      <StockMovementsTable rows={pagination.pageItems} startIndex={pagination.rangeStart} />

      <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="text-sm text-ink-muted">
          Showing {pagination.rangeStart} to {pagination.rangeEnd} of {pagination.total} entries
        </p>
        <Pagination page={pagination.page} totalPages={pagination.totalPages} onChange={pagination.setPage} />
      </div>
    </div>
  )
}
