import { StepCard } from '../../ui/StepCard'
import { InfoRow } from '../../ui/InfoRow'
import { StatusBadge } from '../../ui/StatusBadge'
import { formatCurrency, formatDate } from '../../../utils/formatters'
import type { Status } from '../../ui/StatusBadge'

interface PreviewSummaryStepProps {
  productName: string
  discountTypeLabel: string
  discountValueLabel: string
  normalPrice: number
  finalPrice: number
  startDate: string
  endDate: string
  applicableScope: string
  status: Status
  notes: string
}

export function PreviewSummaryStep({
  productName,
  discountTypeLabel,
  discountValueLabel,
  normalPrice,
  finalPrice,
  startDate,
  endDate,
  applicableScope,
  status,
  notes,
}: PreviewSummaryStepProps) {
  return (
    <StepCard step={5} title="Preview & Summary" subtitle="Ringkasan informasi diskon.">
      <div className="grid grid-cols-1 gap-x-8 gap-y-2.5 sm:grid-cols-2">
        <div className="flex flex-col gap-2.5">
          <InfoRow label="Product" value={productName} />
          <InfoRow label="Discount Type" value={discountTypeLabel} />
          <InfoRow label="Discount Value" value={discountValueLabel} />
          <InfoRow label="Normal Price" value={formatCurrency(normalPrice)} />
          <div className="flex gap-2 text-sm">
            <span className="w-32 shrink-0 font-medium text-ink">Final Price</span>
            <span className="text-base font-bold text-ink">: {formatCurrency(finalPrice)}</span>
          </div>
        </div>
        <div className="flex flex-col gap-2.5">
          <InfoRow label="Start Date" value={startDate ? formatDate(startDate) : '-'} />
          <InfoRow label="End Date" value={endDate ? formatDate(endDate) : '-'} />
          <InfoRow label="Scope" value={applicableScope} />
          <InfoRow label="Status" value={<StatusBadge status={status} />} />
          <InfoRow label="Notes" value={notes || '-'} />
        </div>
      </div>
    </StepCard>
  )
}
