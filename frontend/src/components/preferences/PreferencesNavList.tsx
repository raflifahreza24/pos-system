import type { ComponentType } from 'react'
import { cn } from '../../utils/formatters'
import type { IconProps } from '../ui/icons'

export interface PreferencesNavItem {
  id: string
  label: string
  subtitle: string
  icon: ComponentType<IconProps>
}

interface PreferencesNavListProps {
  items: PreferencesNavItem[]
  activeId: string
  onSelect: (id: string) => void
}

/**
 * Left-hand section jumplist for the Preferences page. Every section is
 * shown on one scrollable page (see PreferencesPage) rather than swapped
 * in and out, so selecting an item scrolls its card into view instead of
 * switching views — closer to the reference design than a tab switch.
 */
export function PreferencesNavList({ items, activeId, onSelect }: PreferencesNavListProps) {
  return (
    <nav className="flex flex-col gap-1 rounded-2xl border border-line bg-surface p-2 shadow-xs">
      {items.map((item) => {
        const isActive = item.id === activeId
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelect(item.id)}
            aria-current={isActive ? 'true' : undefined}
            className={cn(
              'flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors duration-150',
              isActive ? 'bg-primary-light text-primary' : 'text-ink hover:bg-canvas',
            )}
          >
            <item.icon size={18} className="shrink-0" />
            <span>
              <span className="block text-sm font-medium">{item.label}</span>
              <span className={cn('block text-xs', isActive ? 'text-primary/70' : 'text-ink-muted')}>{item.subtitle}</span>
            </span>
          </button>
        )
      })}
    </nav>
  )
}
