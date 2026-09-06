import { PageHeader } from '../../components/ui/PageHeader'
import { Button } from '../../components/ui/Button'
import { Pagination } from '../../components/ui/Pagination'
import { StockTransferTable } from '../../components/stock-transfer/StockTransferTable'
import { IconPlus } from '../../components/ui/icons'
import { usePagination } from '../../hooks/usePagination'
import { stockTransfers } from '../../data/stockTransferData'

const PAGE_SIZE = 10

export function StockTransferPage() {
  const pagination = usePagination(stockTransfers, PAGE_SIZE)

  function handleNewTransfer() {
    window.location.hash = '#/stock-transfer/create'
  }

  return (
    <div className="mx-auto flex max-w-[1400px] flex-col gap-5">
      <PageHeader
        title="Stock Transfer"
        subtitle="Move stock between branches and track transfer status."
        action={
          <Button icon={<IconPlus size={16} />} onClick={handleNewTransfer} fullWidthOnMobile>
            New Transfer
          </Button>
        }
      />

      <StockTransferTable rows={pagination.pageItems} startIndex={pagination.rangeStart} />

      <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="text-sm text-ink-muted">
          Showing {pagination.rangeStart} to {pagination.rangeEnd} of {pagination.total} entries
        </p>
        <Pagination page={pagination.page} totalPages={pagination.totalPages} onChange={pagination.setPage} />
      </div>
    </div>
  )
}
