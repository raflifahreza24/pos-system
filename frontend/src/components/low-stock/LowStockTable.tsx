import type { LowStockItem } from '../../data/inventoryData'
import { StatusBadge } from '../ui/StatusBadge'
import { formatNumber } from '../../utils/formatters'

interface LowStockTableProps {
  rows: LowStockItem[]
  startIndex: number
}

export function LowStockTable({ rows, startIndex }: LowStockTableProps) {
  if (rows.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-line py-16 text-center text-sm text-ink-muted">
        No low-stock items — every product is above its minimum stock.
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-xs">
      <div className="hidden overflow-x-auto sm:block">
        <table className="w-full min-w-[640px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-line bg-canvas text-xs uppercase tracking-wide text-ink-muted">
              <th className="px-4 py-3 font-medium">No</th>
              <th className="px-3 py-3 font-medium">Product</th>
              <th className="px-3 py-3 font-medium">SKU</th>
              <th className="px-3 py-3 font-medium">Stock</th>
              <th className="px-3 py-3 font-medium">Min Stock</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((item, index) => (
              <tr
                key={item.id}
                className="border-b border-line transition-colors duration-150 last:border-0 hover:bg-canvas"
              >
                <td className="px-4 py-3 text-ink-muted">{startIndex + index}</td>
                <td className="px-3 py-3 font-medium text-ink">{item.product}</td>
                <td className="px-3 py-3 text-ink-muted">{item.sku}</td>
                <td className="px-3 py-3 text-ink">{formatNumber(item.stock)}</td>
                <td className="px-3 py-3 text-ink-muted">{formatNumber(item.minStock)}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={item.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="divide-y divide-line sm:hidden">
        {rows.map((item, index) => (
          <li key={item.id} className="p-4">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-semibold text-ink">
                {item.product} <span className="font-normal text-ink-muted">#{startIndex + index}</span>
              </p>
              <StatusBadge status={item.status} />
            </div>
            <p className="mt-1 text-sm text-ink-muted">{item.sku}</p>
            <div className="mt-2 flex items-center gap-4 text-xs text-ink-muted">
              <span>Stock: {formatNumber(item.stock)}</span>
              <span>Min Stock: {formatNumber(item.minStock)}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
