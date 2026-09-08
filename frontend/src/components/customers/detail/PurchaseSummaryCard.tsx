import { IconReports } from '../../ui/icons'
import { formatCurrency, formatNumber } from '../../../utils/formatters'
import type { CustomerPurchaseSummary } from '../../../data/customerTransactionsData'

interface PurchaseSummaryCardProps {
  summary: CustomerPurchaseSummary
}

function SummaryStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-sm text-ink-muted">{label}</span>
      <span className="text-lg font-bold text-ink">{value}</span>
    </div>
  )
}

export function PurchaseSummaryCard({ summary }: PurchaseSummaryCardProps) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-line bg-surface p-5 shadow-xs sm:p-6">
      <div className="flex items-center gap-2.5">
        <IconReports size={18} className="text-ink" />
        <h2 className="text-base font-semibold text-ink">Purchase Summary</h2>
      </div>

      <div className="grid grid-cols-1 gap-4 divide-y divide-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        <SummaryStat label="Total Transactions" value={formatNumber(summary.totalTransactions)} />
        <div className="pt-4 sm:pt-0">
          <SummaryStat label="Total Spending" value={formatCurrency(summary.totalSpending)} />
        </div>
        <div className="pt-4 sm:pt-0">
          <SummaryStat label="Average Transaction" value={formatCurrency(summary.averageTransaction)} />
        </div>
      </div>
    </div>
  )
}
