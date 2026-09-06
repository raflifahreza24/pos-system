import { cn } from '../../utils/formatters'

export interface PanelListItem {
  id: string
  label: string
}

interface PanelListProps {
  title: string
  items: PanelListItem[]
  activeId: string
  onSelect: (id: string) => void
}

/**
 * Bordered card with a header label and a list of selectable items —
 * the "pick one from a list, content on the right changes" shape shared by
 * Roles & Permissions ("Roles") and Reports ("Report Type").
 */
export function PanelList({ title, items, activeId, onSelect }: PanelListProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-xs">
      <div className="border-b border-line bg-canvas px-4 py-3 text-xs font-semibold uppercase tracking-wide text-ink-muted">
        {title}
      </div>
      <ul className="flex flex-col gap-1 p-2">
        {items.map((item) => {
          const isActive = item.id === activeId

          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => onSelect(item.id)}
                aria-current={isActive ? 'true' : undefined}
                className={cn(
                  'w-full rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-colors duration-150',
                  isActive ? 'bg-primary-light text-primary' : 'text-ink hover:bg-canvas',
                )}
              >
                {item.label}
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
