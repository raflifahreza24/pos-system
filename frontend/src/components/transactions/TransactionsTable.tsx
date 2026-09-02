import type { Transaction } from '../../data/transactionsData'
import { StatusBadge } from '../ui/StatusBadge'
import { formatCurrency, formatDateTime } from '../../utils/formatters'

interface TransactionsTableProps {
  rows: Transaction[]
  startIndex: number
}

export function TransactionsTable({ rows, startIndex }: TransactionsTableProps) {
  if (rows.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-line py-16 text-center text-sm text-ink-muted">
        No transactions match your filters.
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-xs">
      <div className="hidden overflow-x-auto sm:block">
        <table className="w-full min-w-[820px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-line bg-canvas text-xs uppercase tracking-wide text-ink-muted">
              <th className="px-4 py-3 font-medium">No</th>
              <th className="px-3 py-3 font-medium">Invoice</th>
              <th className="px-3 py-3 font-medium">Date</th>
              <th className="px-3 py-3 font-medium">Customer</th>
              <th className="px-3 py-3 font-medium">Cashier</th>
              <th className="px-3 py-3 font-medium">Total</th>
              <th className="px-3 py-3 font-medium">Payment</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={row.id} className="border-b border-line transition-colors duration-150 last:border-0 hover:bg-canvas">
                <td className="px-4 py-3 text-ink-muted">{startIndex + index}</td>
                <td className="px-3 py-3 font-medium text-ink">{row.id}</td>
                <td className="px-3 py-3 whitespace-nowrap text-ink-muted">{formatDateTime(row.date)}</td>
                <td className="px-3 py-3 text-ink">{row.customer}</td>
                <td className="px-3 py-3 text-ink">{row.cashier}</td>
                <td className="px-3 py-3 font-medium text-ink">{formatCurrency(row.total)}</td>
                <td className="px-3 py-3 text-ink-muted">{row.payment}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={row.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="divide-y divide-line sm:hidden">
        {rows.map((row, index) => (
          <li key={row.id} className="p-4">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-semibold text-ink">
                {row.id} <span className="font-normal text-ink-muted">#{startIndex + index}</span>
              </p>
              <StatusBadge status={row.status} />
            </div>
            <p className="mt-1 text-sm text-ink-muted">
              {row.customer} · {row.cashier}
            </p>
            <div className="mt-2 flex items-center justify-between gap-2">
              <p className="text-xs text-ink-muted">
                {formatDateTime(row.date)} · {row.payment}
              </p>
              <p className="shrink-0 text-sm font-semibold text-ink">{formatCurrency(row.total)}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
