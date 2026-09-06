import { PageHeader } from '../../components/ui/PageHeader'
import { Button } from '../../components/ui/Button'
import { Pagination } from '../../components/ui/Pagination'
import { PurchaseOrdersTable } from '../../components/purchase-orders/PurchaseOrdersTable'
import { IconPlus } from '../../components/ui/icons'
import { usePagination } from '../../hooks/usePagination'
import { purchaseOrders } from '../../data/purchaseOrdersData'

const PAGE_SIZE = 10

export function PurchaseOrdersPage() {
  const pagination = usePagination(purchaseOrders, PAGE_SIZE)

  function handleNewPO() {
    window.location.hash = '#/purchase-orders/create'
  }

  return (
    <div className="mx-auto flex max-w-[1400px] flex-col gap-5">
      <PageHeader
        title="Purchase Orders"
        subtitle="Track purchase orders placed with your suppliers."
        action={
          <Button icon={<IconPlus size={16} />} onClick={handleNewPO} fullWidthOnMobile>
            New PO
          </Button>
        }
      />

      <PurchaseOrdersTable rows={pagination.pageItems} startIndex={pagination.rangeStart} />

      <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="text-sm text-ink-muted">
          Showing {pagination.rangeStart} to {pagination.rangeEnd} of {pagination.total} entries
        </p>
        <Pagination page={pagination.page} totalPages={pagination.totalPages} onChange={pagination.setPage} />
      </div>
    </div>
  )
}
