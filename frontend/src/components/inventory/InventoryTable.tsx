import type { InventoryItem } from '../../data/inventoryData'
import { LOW_STOCK_THRESHOLD } from '../../data/inventoryData'
import { cn, formatNumber } from '../../utils/formatters'

interface InventoryTableProps {
  rows: InventoryItem[]
  startIndex: number
}

function availableClassName(item: InventoryItem): string {
  if (item.available <= 0) return 'text-danger-strong'
  if (item.available <= LOW_STOCK_THRESHOLD) return 'text-warning-strong'
  return 'text-ink'
}

export function InventoryTable({ rows, startIndex }: InventoryTableProps) {
  if (rows.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-line py-16 text-center text-sm text-ink-muted">
        No inventory items match your filters.
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
              <th className="px-3 py-3 font-medium">Product</th>
              <th className="px-3 py-3 font-medium">SKU</th>
              <th className="px-3 py-3 font-medium">Stock</th>
              <th className="px-3 py-3 font-medium">Reserved</th>
              <th className="px-3 py-3 font-medium">Available</th>
              <th className="px-4 py-3 font-medium">Unit</th>
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
                <td className="px-3 py-3 text-ink-muted">{formatNumber(item.reserved)}</td>
                <td className={cn('px-3 py-3 font-medium', availableClassName(item))}>
                  {formatNumber(item.available)}
                </td>
                <td className="px-4 py-3 text-ink-muted">{item.unit}</td>
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
              <span className={cn('text-sm font-semibold', availableClassName(item))}>
                {formatNumber(item.available)} {item.unit}
              </span>
            </div>
            <p className="mt-1 text-sm text-ink-muted">{item.sku}</p>
            <div className="mt-2 flex items-center gap-4 text-xs text-ink-muted">
              <span>Stock: {formatNumber(item.stock)}</span>
              <span>Reserved: {formatNumber(item.reserved)}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
