import { useEffect, useMemo, useState } from 'react'
import { PageHeader } from '../../components/ui/PageHeader'
import { Pagination } from '../../components/ui/Pagination'
import { ReturnsToolbar } from '../../components/returns/ReturnsToolbar'
import { ReturnsTable } from '../../components/returns/ReturnsTable'
import { usePagination } from '../../hooks/usePagination'
import { matchesDateRange, type DateRangeFilter } from '../../utils/dateRangeFilter'
import { returns } from '../../data/returnsData'
import { branches } from '../../data/transactionsData'
import type { Status } from '../../components/ui/StatusBadge'

const PAGE_SIZE = 10

export function ReturnsPage() {
  const [dateRange, setDateRange] = useState<DateRangeFilter>('all')
  const [branch, setBranch] = useState('all')
  const [status, setStatus] = useState<Status | 'all'>('all')

  const filteredReturns = useMemo(() => {
    return returns.filter((row) => {
      const matchesBranch = branch === 'all' || row.branch === branch
      const matchesStatus = status === 'all' || row.status === status
      const matchesDate = matchesDateRange(row.date, dateRange)

      return matchesBranch && matchesStatus && matchesDate
    })
  }, [dateRange, branch, status])

  const pagination = usePagination(filteredReturns, PAGE_SIZE)

  useEffect(() => {
    pagination.setPage(1)
  }, [dateRange, branch, status])

  function handleNewReturn() {
    window.location.hash = '#/returns-refunds/create'
  }

  return (
    <div className="mx-auto flex max-w-[1400px] flex-col gap-5">
      <PageHeader title="Returns & Refunds" subtitle="Track and review returned items and refunds." />

      <ReturnsToolbar
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        branch={branch}
        onBranchChange={setBranch}
        status={status}
        onStatusChange={setStatus}
        branches={branches}
        onNewReturn={handleNewReturn}
      />

      <ReturnsTable rows={pagination.pageItems} startIndex={pagination.rangeStart} />

      <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="text-sm text-ink-muted">
          Showing {pagination.rangeStart} to {pagination.rangeEnd} of {pagination.total} entries
        </p>
        <Pagination page={pagination.page} totalPages={pagination.totalPages} onChange={pagination.setPage} />
      </div>
    </div>
  )
}
