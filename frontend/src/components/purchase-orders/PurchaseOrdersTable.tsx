import type { PurchaseOrder } from '../../data/purchaseOrdersData'
import { StatusBadge } from '../ui/StatusBadge'
import { formatCurrency, formatDate } from '../../utils/formatters'

interface PurchaseOrdersTableProps {
  rows: PurchaseOrder[]
  startIndex: number
}

export function PurchaseOrdersTable({ rows, startIndex }: PurchaseOrdersTableProps) {
  if (rows.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-line py-16 text-center text-sm text-ink-muted">
        No purchase orders found.
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-xs">
      <div className="hidden overflow-x-auto sm:block">
        <table className="w-full min-w-[680px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-line bg-canvas text-xs uppercase tracking-wide text-ink-muted">
              <th className="px-4 py-3 font-medium">No</th>
              <th className="px-3 py-3 font-medium">PO No</th>
              <th className="px-3 py-3 font-medium">Supplier</th>
              <th className="px-3 py-3 font-medium">Date</th>
              <th className="px-3 py-3 font-medium">Total</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((po, index) => (
              <tr
                key={po.id}
                className="border-b border-line transition-colors duration-150 last:border-0 hover:bg-canvas"
              >
                <td className="px-4 py-3 text-ink-muted">{startIndex + index}</td>
                <td className="px-3 py-3 font-medium text-ink">{po.poNo}</td>
                <td className="px-3 py-3 text-ink-muted">{po.supplier}</td>
                <td className="px-3 py-3 text-ink-muted">{formatDate(po.date)}</td>
                <td className="px-3 py-3 text-ink">{formatCurrency(po.total)}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={po.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="divide-y divide-line sm:hidden">
        {rows.map((po, index) => (
          <li key={po.id} className="p-4">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-semibold text-ink">
                {po.poNo} <span className="font-normal text-ink-muted">#{startIndex + index}</span>
              </p>
              <StatusBadge status={po.status} />
            </div>
            <p className="mt-1 text-sm text-ink-muted">{po.supplier}</p>
            <div className="mt-2 flex items-center justify-between gap-2">
              <p className="text-xs text-ink-muted">{formatDate(po.date)}</p>
              <p className="text-sm font-semibold text-ink">{formatCurrency(po.total)}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
