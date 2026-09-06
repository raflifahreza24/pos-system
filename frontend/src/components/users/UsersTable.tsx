import type { AppUser } from '../../data/usersData'
import { StatusBadge } from '../ui/StatusBadge'

interface UsersTableProps {
  rows: AppUser[]
  startIndex: number
}

export function UsersTable({ rows, startIndex }: UsersTableProps) {
  if (rows.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-line py-16 text-center text-sm text-ink-muted">
        No users match your search.
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
              <th className="px-3 py-3 font-medium">Name</th>
              <th className="px-3 py-3 font-medium">Email</th>
              <th className="px-3 py-3 font-medium">Role</th>
              <th className="px-3 py-3 font-medium">Branch</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((user, index) => (
              <tr
                key={user.id}
                className="border-b border-line transition-colors duration-150 last:border-0 hover:bg-canvas"
              >
                <td className="px-4 py-3 text-ink-muted">{startIndex + index}</td>
                <td className="px-3 py-3 font-medium text-ink">{user.name}</td>
                <td className="px-3 py-3 text-ink-muted">{user.email}</td>
                <td className="px-3 py-3 text-ink-muted">{user.role}</td>
                <td className="px-3 py-3 text-ink-muted">{user.branch}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={user.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="divide-y divide-line sm:hidden">
        {rows.map((user, index) => (
          <li key={user.id} className="p-4">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-semibold text-ink">
                {user.name} <span className="font-normal text-ink-muted">#{startIndex + index}</span>
              </p>
              <StatusBadge status={user.status} />
            </div>
            <p className="mt-1 text-sm text-ink-muted">{user.email}</p>
            <p className="mt-2 text-xs text-ink-muted">
              {user.role} · {user.branch}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}
