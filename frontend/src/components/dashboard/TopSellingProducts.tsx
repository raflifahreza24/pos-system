import type { topSellingProducts as TopSellingProductsType } from '../../data/dashboardData'
import { formatNumber } from '../../utils/formatters'

export function TopSellingProducts({ items }: { items: typeof TopSellingProductsType }) {
  const max = Math.max(...items.map((i) => i.sold))

  return (
    <ul className="space-y-3.5">
      {items.map((item) => (
        <li key={item.rank} className="flex items-center gap-3">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary-light text-xs font-semibold text-primary">
            {item.rank}
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <p className="truncate text-sm font-medium text-ink">{item.name}</p>
              <p className="shrink-0 text-xs text-ink-muted">{formatNumber(item.sold)} sold</p>
            </div>
            <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-canvas">
              <div
                className="h-full rounded-full bg-primary transition-[width] duration-500"
                style={{ width: `${(item.sold / max) * 100}%` }}
              />
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}
