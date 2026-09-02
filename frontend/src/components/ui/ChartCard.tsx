import type { ReactNode } from 'react'
import { cn } from '../../utils/formatters'

interface ChartCardProps {
  title: string
  action?: ReactNode
  children: ReactNode
  className?: string
  bodyClassName?: string
}

export function ChartCard({ title, action, children, className, bodyClassName }: ChartCardProps) {
  return (
    <div className={cn('rounded-2xl border border-line bg-surface p-5 shadow-xs', className)}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-sm font-semibold text-ink">{title}</h2>
        {action}
      </div>
      <div className={cn('mt-4', bodyClassName)}>{children}</div>
    </div>
  )
}
