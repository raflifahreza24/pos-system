import type { Shift } from '../../data/shiftsData'
import { StatusBadge } from '../ui/StatusBadge'
import { formatCurrency, formatDate } from '../../utils/formatters'

interface ShiftsTableProps {
  rows: Shift[]
  startIndex: number
}

export function ShiftsTable({ rows, startIndex }: ShiftsTableProps) {
  if (rows.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-line py-16 text-center text-sm text-ink-muted">
        No shifts match your filters.
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
              <th className="px-3 py-3 font-medium">Cashier</th>
              <th className="px-3 py-3 font-medium">Branch</th>
              <th className="px-3 py-3 font-medium">Open Time</th>
              <th className="px-3 py-3 font-medium">Close Time</th>
              <th className="px-3 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Sales</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((shift, index) => (
              <tr
                key={shift.id}
                className="border-b border-line transition-colors duration-150 last:border-0 hover:bg-canvas"
              >
                <td className="px-4 py-3 text-ink-muted">{startIndex + index}</td>
                <td className="px-3 py-3 font-medium text-ink">{shift.cashier}</td>
                <td className="px-3 py-3 text-ink-muted">{shift.branch}</td>
                <td className="px-3 py-3 text-ink-muted">{shift.openTime}</td>
                <td className="px-3 py-3 text-ink-muted">{shift.closeTime ?? '-'}</td>
                <td className="px-3 py-3">
                  <StatusBadge status={shift.status} />
                </td>
                <td className="px-4 py-3 text-ink">{formatCurrency(shift.sales)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="divide-y divide-line sm:hidden">
        {rows.map((shift, index) => (
          <li key={shift.id} className="p-4">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-semibold text-ink">
                {shift.cashier} <span className="font-normal text-ink-muted">#{startIndex + index}</span>
              </p>
              <StatusBadge status={shift.status} />
            </div>
            <p className="mt-1 text-sm text-ink-muted">
              {shift.branch} · {formatDate(shift.date)}
            </p>
            <div className="mt-2 flex items-center justify-between gap-2 text-xs text-ink-muted">
              <span>
                {shift.openTime} – {shift.closeTime ?? '-'}
              </span>
              <span className="text-sm font-semibold text-ink">{formatCurrency(shift.sales)}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
