import { IconStorefront } from '../../ui/icons'
import { StatusBadge } from '../../ui/StatusBadge'
import { cn } from '../../../utils/formatters'
import type { DiscountBranchRow } from '../../../data/discountDetailData'

interface BranchApplicabilityCardProps {
  rows: DiscountBranchRow[]
}

// A Yes/No pill for the "Applicable" column — visually matches
// StatusBadge's Active/Inactive styling, but "applicable" isn't part of
// that Status enum, so it's its own small badge instead of stretching
// StatusBadge to cover an unrelated value domain.
function ApplicableBadge({ applicable }: { applicable: boolean }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium',
        applicable ? 'bg-success-light text-success-strong' : 'bg-canvas text-ink-muted',
      )}
    >
      {applicable ? 'Yes' : 'No'}
    </span>
  )
}

export function BranchApplicabilityCard({ rows }: BranchApplicabilityCardProps) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-line bg-surface p-5 shadow-xs sm:p-6">
      <div className="flex items-center gap-2.5">
        <IconStorefront size={18} className="text-ink" />
        <div>
          <h2 className="text-base font-semibold text-ink">Branch Applicability</h2>
          <p className="text-sm text-ink-muted">This discount is applied to the following branches.</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[420px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-line text-xs uppercase tracking-wide text-ink-muted">
              <th className="px-3 py-2.5 font-medium">No</th>
              <th className="px-3 py-2.5 font-medium">Branch</th>
              <th className="px-3 py-2.5 text-center font-medium">Applicable</th>
              <th className="px-3 py-2.5 text-center font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={row.branch} className="border-b border-line last:border-0">
                <td className="px-3 py-2.5 text-ink-muted">{index + 1}</td>
                <td className="px-3 py-2.5 font-medium text-ink">{row.branch}</td>
                <td className="px-3 py-2.5 text-center">
                  <ApplicableBadge applicable={row.applicable} />
                </td>
                <td className="px-3 py-2.5 text-center">
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
