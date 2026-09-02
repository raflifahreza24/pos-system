import type { StatDatum } from '../../data/dashboardData'
import { IconAlertTriangle, IconArrowDown, IconArrowUp, IconCustomers, IconTransactions, IconWallet } from './icons'
import { cn } from '../../utils/formatters'

const iconMap: Record<StatDatum['icon'], typeof IconWallet> = {
  revenue: IconWallet,
  transactions: IconTransactions,
  customers: IconCustomers,
  lowStock: IconAlertTriangle,
}

export function StatCard({ stat }: { stat: StatDatum }) {
  const Icon = iconMap[stat.icon]
  const isUp = stat.trend === 'up'

  return (
    <div className="rounded-2xl border border-line bg-surface p-5 shadow-xs transition-shadow duration-200 hover:shadow-sm">
      <div className="flex items-start justify-between">
        <p className="text-xs font-medium uppercase tracking-wide text-ink-muted">{stat.label}</p>
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary">
          <Icon size={18} />
        </span>
      </div>
      <p className="mt-3 text-2xl font-semibold text-ink">{stat.value}</p>
      <div className="mt-2 flex items-center gap-1 text-xs font-medium">
        <span
          className={cn(
            'inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5',
            isUp ? 'bg-success-light text-success-strong' : 'bg-danger-light text-danger-strong',
          )}
        >
          {isUp ? <IconArrowUp size={12} /> : <IconArrowDown size={12} />}
          {Math.abs(stat.change)}%
        </span>
        <span className="text-ink-muted">from last month</span>
      </div>
    </div>
  )
}
