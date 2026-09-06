import type { ReportColumn } from '../../data/reportsData'
import { StatusBadge, type Status } from '../ui/StatusBadge'
import { cn } from '../../utils/formatters'

interface ReportTableProps {
  columns: ReportColumn[]
  rows: Record<string, string>[]
}

export function ReportTable({ columns, rows }: ReportTableProps) {
  if (rows.length === 0) {
    return (
      <div className="flex items-center justify-center rounded-2xl border border-dashed border-line py-12 text-center text-sm text-ink-muted">
        No data for this report yet.
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[560px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-line text-xs uppercase tracking-wide text-ink-muted">
            {columns.map((column) => (
              <th
                key={column.key}
                className={cn('px-3 py-2.5 font-medium', column.align === 'right' && 'text-right')}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b border-line last:border-0">
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={cn('px-3 py-2.5 text-ink-muted', column.align === 'right' && 'text-right')}
                >
                  {column.key === 'status' ? <StatusBadge status={row[column.key] as Status} /> : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
