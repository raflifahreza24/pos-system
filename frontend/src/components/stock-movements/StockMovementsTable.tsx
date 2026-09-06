import type { StockMovement } from '../../data/stockMovementsData'
import { formatDate, formatNumber } from '../../utils/formatters'

interface StockMovementsTableProps {
  rows: StockMovement[]
  startIndex: number
}

function formatQty(value: number | null): string {
  return value === null ? '-' : formatNumber(value)
}

export function StockMovementsTable({ rows, startIndex }: StockMovementsTableProps) {
  if (rows.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-line py-16 text-center text-sm text-ink-muted">
        No stock movements match your filters.
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-xs">
      <div className="hidden overflow-x-auto sm:block">
        <table className="w-full min-w-[760px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-line bg-canvas text-xs uppercase tracking-wide text-ink-muted">
              <th className="px-4 py-3 font-medium">No</th>
              <th className="px-3 py-3 font-medium">Date</th>
              <th className="px-3 py-3 font-medium">Product</th>
              <th className="px-3 py-3 font-medium">Type</th>
              <th className="px-3 py-3 font-medium">Reference</th>
              <th className="px-3 py-3 font-medium">In</th>
              <th className="px-3 py-3 font-medium">Out</th>
              <th className="px-4 py-3 font-medium">Balance</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((movement, index) => (
              <tr
                key={movement.id}
                className="border-b border-line transition-colors duration-150 last:border-0 hover:bg-canvas"
              >
                <td className="px-4 py-3 text-ink-muted">{startIndex + index}</td>
                <td className="px-3 py-3 text-ink-muted">{formatDate(movement.date)}</td>
                <td className="px-3 py-3 font-medium text-ink">{movement.product}</td>
                <td className="px-3 py-3 text-ink-muted">{movement.type}</td>
                <td className="px-3 py-3 text-ink-muted">{movement.reference}</td>
                <td className="px-3 py-3 text-success-strong">{formatQty(movement.in)}</td>
                <td className="px-3 py-3 text-danger-strong">{formatQty(movement.out)}</td>
                <td className="px-4 py-3 font-medium text-ink">{formatNumber(movement.balance)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="divide-y divide-line sm:hidden">
        {rows.map((movement, index) => (
          <li key={movement.id} className="p-4">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-semibold text-ink">
                {movement.product} <span className="font-normal text-ink-muted">#{startIndex + index}</span>
              </p>
              <span className="text-sm font-semibold text-ink">{formatNumber(movement.balance)}</span>
            </div>
            <p className="mt-1 text-sm text-ink-muted">
              {movement.type} · {movement.reference}
            </p>
            <div className="mt-2 flex items-center gap-4 text-xs">
              <span className="text-ink-muted">{formatDate(movement.date)}</span>
              <span className="text-success-strong">In: {formatQty(movement.in)}</span>
              <span className="text-danger-strong">Out: {formatQty(movement.out)}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
