import type { recentActivity as RecentActivityType } from '../../data/dashboardData'
import { IconCustomers, IconInventory, IconPurchasing, IconTransactions } from '../ui/icons'

const iconMap = {
  transaction: IconTransactions,
  inventory: IconInventory,
  customer: IconCustomers,
  purchasing: IconPurchasing,
} as const

export function RecentActivity({ items }: { items: typeof RecentActivityType }) {
  return (
    <ul className="space-y-5">
      {items.map((item, index) => {
        const Icon = iconMap[item.type]
        return (
          <li key={item.id} className="relative flex gap-3 pl-0.5">
            {index !== items.length - 1 ? (
              <span className="absolute left-[15px] top-8 h-[calc(100%-8px)] w-px bg-line" aria-hidden="true" />
            ) : null}
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-light text-primary">
              <Icon size={15} />
            </span>
            <div className="min-w-0 pt-1">
              <p className="text-sm text-ink">{item.title}</p>
              <p className="mt-0.5 text-xs text-ink-muted">{item.time}</p>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
