import type { Branch } from '../../data/branchesData'
import { StatusBadge } from '../ui/StatusBadge'

interface BranchesTableProps {
  rows: Branch[]
  startIndex: number
}

export function BranchesTable({ rows, startIndex }: BranchesTableProps) {
  if (rows.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-line py-16 text-center text-sm text-ink-muted">
        No branches found.
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
              <th className="px-3 py-3 font-medium">Branch Name</th>
              <th className="px-3 py-3 font-medium">Code</th>
              <th className="px-3 py-3 font-medium">Address</th>
              <th className="px-3 py-3 font-medium">Phone</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((branch, index) => (
              <tr
                key={branch.id}
                className="border-b border-line transition-colors duration-150 last:border-0 hover:bg-canvas"
              >
                <td className="px-4 py-3 text-ink-muted">{startIndex + index}</td>
                <td className="px-3 py-3 font-medium text-ink">{branch.name}</td>
                <td className="px-3 py-3 text-ink-muted">{branch.code}</td>
                <td className="px-3 py-3 text-ink-muted">{branch.address}</td>
                <td className="px-3 py-3 text-ink-muted">{branch.phone}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={branch.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="divide-y divide-line sm:hidden">
        {rows.map((branch, index) => (
          <li key={branch.id} className="p-4">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-semibold text-ink">
                {branch.name} <span className="font-normal text-ink-muted">#{startIndex + index}</span>
              </p>
              <StatusBadge status={branch.status} />
            </div>
            <p className="mt-1 text-sm text-ink-muted">
              {branch.code} · {branch.phone}
            </p>
            <p className="mt-1 text-sm text-ink-muted">{branch.address}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
