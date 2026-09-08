import { IconTag } from '../../ui/icons'
import { InfoRow } from '../../ui/InfoRow'
import { formatCurrency, formatDate } from '../../../utils/formatters'
import type { PriceDiscountEntry } from '../../../data/priceDiscountsData'
import type { PriceDetail } from '../../../data/priceDetailData'

interface PriceInformationCardProps {
  entry: PriceDiscountEntry
  detail: PriceDetail
}

export function PriceInformationCard({ entry, detail }: PriceInformationCardProps) {
  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-line bg-surface p-5 shadow-xs sm:p-6">
      <div className="flex items-center gap-2.5">
        <IconTag size={18} className="text-ink" />
        <h2 className="text-base font-semibold text-ink">Price Information</h2>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex gap-2 text-sm">
          <span className="w-32 shrink-0 font-medium text-ink">Price</span>
          <span className="text-xl font-bold text-ink">: {formatCurrency(entry.value)}</span>
        </div>
        <InfoRow label="Start Date" value={entry.startDate ? formatDate(entry.startDate) : '-'} />
        <InfoRow label="End Date" value={entry.endDate ? formatDate(entry.endDate) : '-'} />
        <InfoRow label="Effective Scope" value={detail.effectiveScope} />
        <InfoRow label="Tax" value={detail.tax} />
        <InfoRow label="Notes" value={detail.notes || '-'} />
      </div>
    </div>
  )
}
