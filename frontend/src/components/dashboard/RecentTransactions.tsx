import type { recentTransactions as RecentTransactionsType } from '../../data/dashboardData'
import { StatusBadge } from '../ui/StatusBadge'
import { IconEye } from '../ui/icons'
import { formatCurrency, formatDate } from '../../utils/formatters'

export function RecentTransactions({ rows }: { rows: typeof RecentTransactionsType }) {
  return (
    <div>
      <div className="hidden overflow-x-auto sm:block">
        <table className="w-full min-w-[560px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-line text-xs uppercase tracking-wide text-ink-muted">
              <th className="py-2.5 pr-3 font-medium">Transaction ID</th>
              <th className="px-3 py-2.5 font-medium">Customer</th>
              <th className="px-3 py-2.5 font-medium">Date</th>
              <th className="px-3 py-2.5 font-medium">Amount</th>
              <th className="px-3 py-2.5 font-medium">Status</th>
              <th className="py-2.5 pl-3 text-right font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-b border-line last:border-0">
                <td className="py-3 pr-3 font-medium text-ink">{row.id}</td>
                <td className="px-3 py-3 text-ink">{row.customer}</td>
                <td className="px-3 py-3 text-ink-muted">{formatDate(row.date)}</td>
                <td className="px-3 py-3 font-medium text-ink">{formatCurrency(row.amount)}</td>
                <td className="px-3 py-3">
                  <StatusBadge status={row.status} />
                </td>
                <td className="py-3 pl-3 text-right">
                  <button
                    type="button"
                    aria-label={`View ${row.id}`}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-ink-muted transition-colors duration-150 hover:bg-canvas hover:text-primary"
                  >
                    <IconEye size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="space-y-3 sm:hidden">
        {rows.map((row) => (
          <li key={row.id} className="rounded-xl border border-line p-3.5">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-semibold text-ink">{row.id}</p>
              <StatusBadge status={row.status} />
            </div>
            <p className="mt-1 text-sm text-ink-muted">{row.customer}</p>
            <div className="mt-2 flex items-center justify-between">
              <p className="text-xs text-ink-muted">{formatDate(row.date)}</p>
              <p className="text-sm font-semibold text-ink">{formatCurrency(row.amount)}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
