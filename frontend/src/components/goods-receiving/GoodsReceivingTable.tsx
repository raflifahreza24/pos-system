import type { GoodsReceiving } from '../../data/goodsReceivingData'
import { StatusBadge } from '../ui/StatusBadge'
import { formatDate } from '../../utils/formatters'

interface GoodsReceivingTableProps {
  rows: GoodsReceiving[]
  startIndex: number
}

export function GoodsReceivingTable({ rows, startIndex }: GoodsReceivingTableProps) {
  if (rows.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-line py-16 text-center text-sm text-ink-muted">
        No goods receiving records found.
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
              <th className="px-3 py-3 font-medium">GR No</th>
              <th className="px-3 py-3 font-medium">PO No</th>
              <th className="px-3 py-3 font-medium">Supplier</th>
              <th className="px-3 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((gr, index) => (
              <tr
                key={gr.id}
                className="border-b border-line transition-colors duration-150 last:border-0 hover:bg-canvas"
              >
                <td className="px-4 py-3 text-ink-muted">{startIndex + index}</td>
                <td className="px-3 py-3 font-medium text-ink">{gr.grNo}</td>
                <td className="px-3 py-3 text-ink-muted">{gr.poNo}</td>
                <td className="px-3 py-3 text-ink-muted">{gr.supplier}</td>
                <td className="px-3 py-3 text-ink-muted">{formatDate(gr.date)}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={gr.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="divide-y divide-line sm:hidden">
        {rows.map((gr, index) => (
          <li key={gr.id} className="p-4">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-semibold text-ink">
                {gr.grNo} <span className="font-normal text-ink-muted">#{startIndex + index}</span>
              </p>
              <StatusBadge status={gr.status} />
            </div>
            <p className="mt-1 text-sm text-ink-muted">
              {gr.poNo} · {gr.supplier}
            </p>
            <p className="mt-2 text-xs text-ink-muted">{formatDate(gr.date)}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
