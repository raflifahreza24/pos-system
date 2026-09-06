import { PageHeader } from '../../components/ui/PageHeader'
import { Button } from '../../components/ui/Button'
import { Pagination } from '../../components/ui/Pagination'
import { GoodsReceivingTable } from '../../components/goods-receiving/GoodsReceivingTable'
import { IconPlus } from '../../components/ui/icons'
import { usePagination } from '../../hooks/usePagination'
import { goodsReceivings } from '../../data/goodsReceivingData'

const PAGE_SIZE = 10

export function GoodsReceivingPage() {
  const pagination = usePagination(goodsReceivings, PAGE_SIZE)

  function handleNewReceiving() {
    window.location.hash = '#/goods-receiving/create'
  }

  return (
    <div className="mx-auto flex max-w-[1400px] flex-col gap-5">
      <PageHeader
        title="Goods Receiving"
        subtitle="Confirm stock received against each purchase order."
        action={
          <Button icon={<IconPlus size={16} />} onClick={handleNewReceiving} fullWidthOnMobile>
            New Receiving
          </Button>
        }
      />

      <GoodsReceivingTable rows={pagination.pageItems} startIndex={pagination.rangeStart} />

      <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="text-sm text-ink-muted">
          Showing {pagination.rangeStart} to {pagination.rangeEnd} of {pagination.total} entries
        </p>
        <Pagination page={pagination.page} totalPages={pagination.totalPages} onChange={pagination.setPage} />
      </div>
    </div>
  )
}
