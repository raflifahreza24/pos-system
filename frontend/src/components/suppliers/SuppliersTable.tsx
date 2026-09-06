import type { Supplier } from '../../data/suppliersData'
import { StatusBadge } from '../ui/StatusBadge'

interface SuppliersTableProps {
  rows: Supplier[]
  startIndex: number
}

export function SuppliersTable({ rows, startIndex }: SuppliersTableProps) {
  if (rows.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-line py-16 text-center text-sm text-ink-muted">
        No suppliers match your search.
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
              <th className="px-3 py-3 font-medium">Supplier Name</th>
              <th className="px-3 py-3 font-medium">Phone</th>
              <th className="px-3 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((supplier, index) => (
              <tr
                key={supplier.id}
                className="border-b border-line transition-colors duration-150 last:border-0 hover:bg-canvas"
              >
                <td className="px-4 py-3 text-ink-muted">{startIndex + index}</td>
                <td className="px-3 py-3 font-medium text-ink">{supplier.name}</td>
                <td className="px-3 py-3 text-ink-muted">{supplier.phone}</td>
                <td className="px-3 py-3 text-ink-muted">{supplier.email}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={supplier.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="divide-y divide-line sm:hidden">
        {rows.map((supplier, index) => (
          <li key={supplier.id} className="p-4">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-semibold text-ink">
                {supplier.name} <span className="font-normal text-ink-muted">#{startIndex + index}</span>
              </p>
              <StatusBadge status={supplier.status} />
            </div>
            <p className="mt-1 text-sm text-ink-muted">{supplier.phone}</p>
            <p className="text-sm text-ink-muted">{supplier.email}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
