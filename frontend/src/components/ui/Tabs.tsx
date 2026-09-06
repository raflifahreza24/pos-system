import { cn } from '../../utils/formatters'

export interface Tab {
  key: string
  label: string
}

interface TabsProps {
  tabs: Tab[]
  activeKey: string
  onChange: (key: string) => void
}

export function Tabs({ tabs, activeKey, onChange }: TabsProps) {
  return (
    <div className="flex items-center gap-6 overflow-x-auto border-b border-line" role="tablist">
      {tabs.map((tab) => {
        const isActive = tab.key === activeKey

        return (
          <button
            key={tab.key}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.key)}
            className={cn(
              'relative shrink-0 whitespace-nowrap pb-3 text-sm font-medium transition-colors duration-150',
              isActive ? 'text-primary' : 'text-ink-muted hover:text-ink',
            )}
          >
            {tab.label}
            {isActive ? <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-primary" /> : null}
          </button>
        )
      })}
    </div>
  )
}
