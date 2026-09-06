import { PageHeader } from '../../components/ui/PageHeader'
import { Button } from '../../components/ui/Button'
import { Pagination } from '../../components/ui/Pagination'
import { StockOpnameTable } from '../../components/stock-opname/StockOpnameTable'
import { IconPlus } from '../../components/ui/icons'
import { usePagination } from '../../hooks/usePagination'
import { stockOpnames } from '../../data/stockOpnameData'

const PAGE_SIZE = 10

export function StockOpnamePage() {
  const pagination = usePagination(stockOpnames, PAGE_SIZE)

  function handleNewOpname() {
    window.location.hash = '#/stock-opname/create'
  }

  return (
    <div className="mx-auto flex max-w-[1400px] flex-col gap-5">
      <PageHeader
        title="Stock Opname"
        subtitle="Reconcile recorded stock with physical counts per branch."
        action={
          <Button icon={<IconPlus size={16} />} onClick={handleNewOpname} fullWidthOnMobile>
            New Opname
          </Button>
        }
      />

      <StockOpnameTable rows={pagination.pageItems} startIndex={pagination.rangeStart} />

      <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="text-sm text-ink-muted">
          Showing {pagination.rangeStart} to {pagination.rangeEnd} of {pagination.total} entries
        </p>
        <Pagination page={pagination.page} totalPages={pagination.totalPages} onChange={pagination.setPage} />
      </div>
    </div>
  )
}
