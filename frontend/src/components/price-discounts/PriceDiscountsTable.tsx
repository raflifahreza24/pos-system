import type { PriceDiscountEntry } from '../../data/priceDiscountsData'
import { IconEdit, IconEye } from '../ui/icons'
import { formatCurrency, formatDate } from '../../utils/formatters'

interface PriceDiscountsTableProps {
  rows: PriceDiscountEntry[]
  startIndex: number
  onView: (entry: PriceDiscountEntry) => void
  onEdit: (entry: PriceDiscountEntry) => void
}

function formatValue(entry: PriceDiscountEntry): string {
  if (entry.type === 'Price' || entry.valueKind === 'fixed') {
    return formatCurrency(entry.value)
  }
  return `${entry.value}%`
}

function formatOptionalDate(value: string | null): string {
  return value ? formatDate(value) : '-'
}

export function PriceDiscountsTable({ rows, startIndex, onView, onEdit }: PriceDiscountsTableProps) {
  if (rows.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-line py-16 text-center text-sm text-ink-muted">
        No entries in this tab yet.
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
              <th className="px-3 py-3 font-medium">Product</th>
              <th className="px-3 py-3 font-medium">Type</th>
              <th className="px-3 py-3 font-medium">Price / Value</th>
              <th className="px-3 py-3 font-medium">Start Date</th>
              <th className="px-3 py-3 font-medium">End Date</th>
              <th className="px-4 py-3 text-right font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((entry, index) => (
              <tr
                key={entry.id}
                className="border-b border-line transition-colors duration-150 last:border-0 hover:bg-canvas"
              >
                <td className="px-4 py-3 text-ink-muted">{startIndex + index}</td>
                <td className="px-3 py-3 font-medium text-ink">{entry.productName}</td>
                <td className="px-3 py-3 text-ink-muted">{entry.type}</td>
                <td className="px-3 py-3 font-medium text-ink">{formatValue(entry)}</td>
                <td className="px-3 py-3 whitespace-nowrap text-ink-muted">{formatOptionalDate(entry.startDate)}</td>
                <td className="px-3 py-3 whitespace-nowrap text-ink-muted">{formatOptionalDate(entry.endDate)}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      type="button"
                      onClick={() => onView(entry)}
                      aria-label={`View ${entry.productName}`}
                      className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-ink-muted transition-colors duration-150 hover:bg-canvas hover:text-primary"
                    >
                      <IconEye size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => onEdit(entry)}
                      aria-label={`Edit ${entry.productName}`}
                      className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-ink-muted transition-colors duration-150 hover:bg-canvas hover:text-primary"
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
        {rows.map((entry, index) => (
          <li key={entry.id} className="p-4">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-semibold text-ink">
                {entry.productName} <span className="font-normal text-ink-muted">#{startIndex + index}</span>
              </p>
              <span className="text-xs font-medium text-ink-muted">{entry.type}</span>
            </div>
            <p className="mt-1 text-sm font-semibold text-primary">{formatValue(entry)}</p>
            <div className="mt-2 flex items-center justify-between gap-2">
              <p className="text-xs text-ink-muted">
                {formatOptionalDate(entry.startDate)} – {formatOptionalDate(entry.endDate)}
              </p>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => onView(entry)}
                  aria-label={`View ${entry.productName}`}
                  className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg text-ink-muted transition-colors duration-150 hover:bg-canvas hover:text-primary"
                >
                  <IconEye size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => onEdit(entry)}
                  aria-label={`Edit ${entry.productName}`}
                  className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg text-ink-muted transition-colors duration-150 hover:bg-canvas hover:text-primary"
                >
                  <IconEdit size={14} />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
