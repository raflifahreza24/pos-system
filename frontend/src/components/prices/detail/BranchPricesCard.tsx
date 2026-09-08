import { IconStorefront } from '../../ui/icons'
import { StatusBadge } from '../../ui/StatusBadge'
import { formatCurrency } from '../../../utils/formatters'
import type { BranchPriceRow } from '../../../data/priceDetailData'

interface BranchPricesCardProps {
  rows: BranchPriceRow[]
}

export function BranchPricesCard({ rows }: BranchPricesCardProps) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-line bg-surface p-5 shadow-xs sm:p-6">
      <div className="flex items-center gap-2.5">
        <IconStorefront size={18} className="text-ink" />
        <div>
          <h2 className="text-base font-semibold text-ink">Branch Prices</h2>
          <p className="text-sm text-ink-muted">Price can be different for each branch.</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[420px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-line text-xs uppercase tracking-wide text-ink-muted">
              <th className="px-3 py-2.5 font-medium">No</th>
              <th className="px-3 py-2.5 font-medium">Branch</th>
              <th className="px-3 py-2.5 font-medium">Price</th>
              <th className="px-3 py-2.5 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={row.branch} className="border-b border-line last:border-0">
                <td className="px-3 py-2.5 text-ink-muted">{index + 1}</td>
                <td className="px-3 py-2.5 font-medium text-ink">{row.branch}</td>
                <td className="px-3 py-2.5 text-ink-muted">{formatCurrency(row.price)}</td>
                <td className="px-3 py-2.5">
                  <StatusBadge status={row.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
