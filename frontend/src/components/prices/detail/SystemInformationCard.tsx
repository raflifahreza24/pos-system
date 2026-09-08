import { IconFileText } from '../../ui/icons'
import { InfoRow } from '../../ui/InfoRow'
import { formatDateTimeLong } from '../../../utils/formatters'

// Shared by both Price Detail and Discount Detail — both of their
// dummy-data shapes (PriceDetail, DiscountDetail) carry these same four
// audit fields, so this card only depends on that common shape instead
// of either feature-specific type.
export interface SystemInfo {
  createdAt: string
  createdBy: string
  updatedAt: string
  updatedBy: string
}

interface SystemInformationCardProps {
  detail: SystemInfo
}

export function SystemInformationCard({ detail }: SystemInformationCardProps) {
  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-line bg-surface p-5 shadow-xs sm:p-6">
      <div className="flex items-center gap-2.5">
        <IconFileText size={18} className="text-ink" />
        <h2 className="text-base font-semibold text-ink">System Information</h2>
      </div>

      <div className="flex flex-col gap-2">
        <InfoRow label="Created At" value={formatDateTimeLong(detail.createdAt)} />
        <InfoRow label="Created By" value={detail.createdBy} />
        <InfoRow label="Updated At" value={formatDateTimeLong(detail.updatedAt)} />
        <InfoRow label="Updated By" value={detail.updatedBy} />
      </div>
    </div>
  )
}
