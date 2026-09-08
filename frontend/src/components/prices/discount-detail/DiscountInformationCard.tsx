import { IconTag } from '../../ui/icons'
import { InfoRow } from '../../ui/InfoRow'
import { StatusBadge } from '../../ui/StatusBadge'
import { formatCurrency, formatDate } from '../../../utils/formatters'
import type { PriceDiscountEntry } from '../../../data/priceDiscountsData'
import type { DiscountDetail } from '../../../data/discountDetailData'

interface DiscountInformationCardProps {
  entry: PriceDiscountEntry
  detail: DiscountDetail
}

function formatDiscountValue(entry: PriceDiscountEntry): string {
  return entry.valueKind === 'percentage' ? `${entry.value}%` : formatCurrency(entry.value)
}

export function DiscountInformationCard({ entry, detail }: DiscountInformationCardProps) {
  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-line bg-surface p-5 shadow-xs sm:p-6">
      <div className="flex items-center gap-2.5">
        <IconTag size={18} className="text-ink" />
        <h2 className="text-base font-semibold text-ink">Discount Information</h2>
      </div>

      <div className="flex flex-col gap-3">
        <InfoRow label="Discount Name" value={detail.discountName} />
        <InfoRow label="Discount Type" value={entry.valueKind === 'percentage' ? 'Percentage' : 'Fixed Amount'} />
        <InfoRow label="Discount Value" value={formatDiscountValue(entry)} />
        <InfoRow label="Normal Price" value={formatCurrency(detail.normalPrice)} />
        <div className="flex gap-2 text-sm">
          <span className="w-32 shrink-0 font-medium text-ink">Final Price</span>
          <span className="text-base font-bold text-ink">: {formatCurrency(detail.finalPrice)}</span>
        </div>

        <div className="flex flex-col gap-3 border-t border-line pt-3">
          <InfoRow label="Start Date" value={entry.startDate ? formatDate(entry.startDate) : '-'} />
          <InfoRow label="End Date" value={entry.endDate ? formatDate(entry.endDate) : '-'} />
          <InfoRow label="Applicable Scope" value={detail.applicableScope} />
        </div>

        <div className="flex flex-col gap-3 border-t border-line pt-3">
          <InfoRow label="Status" value={<StatusBadge status={detail.status} />} />
          <InfoRow label="Notes" value={detail.notes} />
        </div>
      </div>
    </div>
  )
}
