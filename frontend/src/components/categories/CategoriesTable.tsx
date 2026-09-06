import type { Category } from '../../data/categoriesData'
import { StatusBadge } from '../ui/StatusBadge'

interface CategoriesTableProps {
  rows: Category[]
  startIndex: number
}

export function CategoriesTable({ rows, startIndex }: CategoriesTableProps) {
  if (rows.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-line py-16 text-center text-sm text-ink-muted">
        No categories yet.
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-xs">
      <div className="hidden overflow-x-auto sm:block">
        <table className="w-full min-w-[560px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-line bg-canvas text-xs uppercase tracking-wide text-ink-muted">
              <th className="px-4 py-3 font-medium">No</th>
              <th className="px-3 py-3 font-medium">Category Name</th>
              <th className="px-3 py-3 font-medium">Description</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((category, index) => (
              <tr
                key={category.id}
                className="border-b border-line transition-colors duration-150 last:border-0 hover:bg-canvas"
              >
                <td className="px-4 py-3 text-ink-muted">{startIndex + index}</td>
                <td className="px-3 py-3 font-medium text-ink">{category.name}</td>
                <td className="px-3 py-3 text-ink-muted">{category.description}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={category.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="divide-y divide-line sm:hidden">
        {rows.map((category, index) => (
          <li key={category.id} className="p-4">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-semibold text-ink">
                {category.name} <span className="font-normal text-ink-muted">#{startIndex + index}</span>
              </p>
              <StatusBadge status={category.status} />
            </div>
            <p className="mt-1 text-sm text-ink-muted">{category.description}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
