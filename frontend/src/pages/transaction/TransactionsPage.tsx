import { useEffect, useMemo, useState } from 'react'
import { PageHeader } from '../../components/ui/PageHeader'
import { TransactionsToolbar } from '../../components/transactions/TransactionsToolbar'
import { TransactionsTable } from '../../components/transactions/TransactionsTable'
import { Pagination } from '../../components/ui/Pagination'
import { usePagination } from '../../hooks/usePagination'
import { matchesDateRange, type DateRangeFilter } from '../../utils/dateRangeFilter'
import { branches, cashiers, transactions } from '../../data/transactionsData'

const PAGE_SIZE = 10

export function TransactionsPage() {
  const [search, setSearch] = useState('')
  const [dateRange, setDateRange] = useState<DateRangeFilter>('all')
  const [branch, setBranch] = useState('all')
  const [cashier, setCashier] = useState('all')

  const filteredTransactions = useMemo(() => {
    const query = search.trim().toLowerCase()

    return transactions.filter((row) => {
      const matchesSearch =
        !query || row.id.toLowerCase().includes(query) || row.customer.toLowerCase().includes(query)
      const matchesBranch = branch === 'all' || row.branch === branch
      const matchesCashier = cashier === 'all' || row.cashier === cashier
      const matchesDate = matchesDateRange(row.date, dateRange)

      return matchesSearch && matchesBranch && matchesCashier && matchesDate
    })
  }, [search, dateRange, branch, cashier])

  const pagination = usePagination(filteredTransactions, PAGE_SIZE)

  // Jump back to page 1 whenever a filter narrows the result set, so the
  // table never renders stuck on a page that no longer has any rows.
  useEffect(() => {
    pagination.setPage(1)
  }, [search, dateRange, branch, cashier])

  return (
    <div className="mx-auto flex max-w-[1400px] flex-col gap-5">
      <PageHeader title="Transactions" subtitle="View and manage all sales transactions." />

      <TransactionsToolbar
        search={search}
        onSearchChange={setSearch}
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        branch={branch}
        onBranchChange={setBranch}
        cashier={cashier}
        onCashierChange={setCashier}
        branches={branches}
        cashiers={cashiers}
      />

      <TransactionsTable rows={pagination.pageItems} startIndex={pagination.rangeStart} />

      <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="text-sm text-ink-muted">
          Showing {pagination.rangeStart} to {pagination.rangeEnd} of {pagination.total} entries
        </p>
        <Pagination page={pagination.page} totalPages={pagination.totalPages} onChange={pagination.setPage} />
      </div>
    </div>
  )
}
