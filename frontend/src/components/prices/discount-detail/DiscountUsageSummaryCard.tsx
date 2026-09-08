import { IconReports } from '../../ui/icons'
import { formatCurrency, formatNumber } from '../../../utils/formatters'
import type { DiscountUsage } from '../../../data/discountDetailData'

interface DiscountUsageSummaryCardProps {
  usage: DiscountUsage
}

function SummaryStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-sm text-ink-muted">{label}</span>
      <span className="text-lg font-bold text-ink">{value}</span>
    </div>
  )
}

export function DiscountUsageSummaryCard({ usage }: DiscountUsageSummaryCardProps) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-line bg-surface p-5 shadow-xs sm:p-6">
      <div className="flex items-center gap-2.5">
        <IconReports size={18} className="text-ink" />
        <div>
          <h2 className="text-base font-semibold text-ink">Discount Usage Summary</h2>
          <p className="text-sm text-ink-muted">Summary of discount usage during the active period.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 divide-y divide-line sm:grid-cols-4 sm:divide-x sm:divide-y-0">
        <SummaryStat label="Total Transactions" value={formatNumber(usage.totalTransactions)} />
        <div className="pt-4 sm:pt-0">
          <SummaryStat label="Total Quantity Sold" value={formatNumber(usage.totalQuantitySold)} />
        </div>
        <div className="pt-4 sm:pt-0">
          <SummaryStat label="Total Discount Amount" value={formatCurrency(usage.totalDiscountAmount)} />
        </div>
        <div className="pt-4 sm:pt-0">
          <SummaryStat label="Estimated Revenue" value={formatCurrency(usage.estimatedRevenue)} />
        </div>
      </div>
    </div>
  )
}
