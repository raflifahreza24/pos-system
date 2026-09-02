import type { Customer } from '../../data/customersData'
import { IconEdit, IconEye } from '../ui/icons'
import { formatNumber } from '../../utils/formatters'

interface CustomersTableProps {
  rows: Customer[]
  startIndex: number
  onView: (customer: Customer) => void
  onEdit: (customer: Customer) => void
}

export function CustomersTable({ rows, startIndex, onView, onEdit }: CustomersTableProps) {
  if (rows.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-line py-16 text-center text-sm text-ink-muted">
        No customers match your search.
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-xs">
      <div className="hidden overflow-x-auto sm:block">
        <table className="w-full min-w-[720px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-line bg-canvas text-xs uppercase tracking-wide text-ink-muted">
              <th className="px-4 py-3 font-medium">No</th>
              <th className="px-3 py-3 font-medium">Customer Name</th>
              <th className="px-3 py-3 font-medium">Phone</th>
              <th className="px-3 py-3 font-medium">Email</th>
              <th className="px-3 py-3 font-medium">Total Points</th>
              <th className="px-4 py-3 text-right font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((customer, index) => (
              <tr
                key={customer.id}
                className="border-b border-line transition-colors duration-150 last:border-0 hover:bg-canvas"
              >
                <td className="px-4 py-3 text-ink-muted">{startIndex + index}</td>
                <td className="px-3 py-3 font-medium text-ink">{customer.name}</td>
                <td className="px-3 py-3 text-ink-muted">{customer.phone}</td>
                <td className="px-3 py-3 text-ink-muted">{customer.email}</td>
                <td className="px-3 py-3 font-medium text-ink">{formatNumber(customer.totalPoints)}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      type="button"
                      onClick={() => onView(customer)}
                      aria-label={`View ${customer.name}`}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-muted transition-colors duration-150 hover:bg-canvas hover:text-primary"
                    >
                      <IconEye size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => onEdit(customer)}
                      aria-label={`Edit ${customer.name}`}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-muted transition-colors duration-150 hover:bg-canvas hover:text-primary"
                    >
                      <IconEdit size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="divide-y divide-line sm:hidden">
        {rows.map((customer, index) => (
          <li key={customer.id} className="p-4">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-semibold text-ink">
                {customer.name} <span className="font-normal text-ink-muted">#{startIndex + index}</span>
              </p>
              <span className="rounded-full bg-primary-light px-2 py-0.5 text-xs font-medium text-primary">
                {formatNumber(customer.totalPoints)} pts
              </span>
            </div>
            <p className="mt-1 text-sm text-ink-muted">{customer.phone}</p>
            <p className="text-sm text-ink-muted">{customer.email}</p>
            <div className="mt-2.5 flex items-center gap-2">
              <button
                type="button"
                onClick={() => onView(customer)}
                className="flex h-8 flex-1 items-center justify-center gap-1.5 rounded-lg border border-line text-xs font-medium text-ink transition-colors duration-150 hover:bg-canvas"
              >
                <IconEye size={14} /> View
              </button>
              <button
                type="button"
                onClick={() => onEdit(customer)}
                className="flex h-8 flex-1 items-center justify-center gap-1.5 rounded-lg border border-line text-xs font-medium text-ink transition-colors duration-150 hover:bg-canvas"
              >
                <IconEdit size={14} /> Edit
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
