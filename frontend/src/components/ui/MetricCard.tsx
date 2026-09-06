import type { ReactNode } from 'react'
import { cn } from '../../utils/formatters'

type MetricTone = 'default' | 'warning' | 'danger'

const toneStyles: Record<MetricTone, string> = {
  default: 'bg-primary-light text-primary',
  warning: 'bg-warning-light text-warning-strong',
  danger: 'bg-danger-light text-danger-strong',
}

interface MetricCardProps {
  label: string
  value: string
  icon: ReactNode
  tone?: MetricTone
}

/**
 * Plain KPI tile — label + value + icon, no trend/delta. Distinct from
 * `StatCard` (the dashboard variant, which always shows a trend badge).
 * Reusable anywhere a page needs simple summary numbers (Inventory,
 * Purchasing, Reports, ...) without inventing a one-off card per page.
 */
export function MetricCard({ label, value, icon, tone = 'default' }: MetricCardProps) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-5 shadow-xs transition-shadow duration-200 hover:shadow-sm">
      <div className="flex items-start justify-between">
        <p className="text-xs font-medium uppercase tracking-wide text-ink-muted">{label}</p>
        <span className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-xl', toneStyles[tone])}>
          {icon}
        </span>
      </div>
      <p className="mt-3 text-2xl font-semibold text-ink">{value}</p>
    </div>
  )
}
