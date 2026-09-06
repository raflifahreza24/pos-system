import { useState } from 'react'
import { navIconMap } from '../../layout/SidebarItem'
import { IconChevronDown } from '../../ui/icons'
import { cn } from '../../../utils/formatters'
import type { PermissionModule } from '../../../data/rolesPermissionsData'

interface PermissionModuleCardProps {
  module: PermissionModule
  checkedKeys: Set<string>
  onToggle: (key: string) => void
  defaultExpanded?: boolean
}

/**
 * One collapsible "module" card in the Add Role Permissions step — a
 * header (module icon, name, expand/collapse chevron) plus a checkbox per
 * action. Reuses the same nav-icon mapping as the Sidebar so a module's
 * icon here always matches the icon shown for that page in the menu.
 */
export function PermissionModuleCard({ module, checkedKeys, onToggle, defaultExpanded = true }: PermissionModuleCardProps) {
  const [expanded, setExpanded] = useState(defaultExpanded)
  const Icon = navIconMap[module.icon]

  return (
    <div className="overflow-hidden rounded-xl border border-line">
      <button
        type="button"
        onClick={() => setExpanded((value) => !value)}
        aria-expanded={expanded}
        className="flex w-full items-center justify-between gap-2 bg-canvas px-4 py-3 text-left transition-colors duration-150 hover:bg-canvas/70"
      >
        <span className="flex items-center gap-2.5 text-sm font-semibold text-ink">
          <Icon size={18} className="shrink-0 text-ink-muted" />
          {module.label}
        </span>
        <IconChevronDown
          size={16}
          className={cn('shrink-0 text-ink-muted transition-transform duration-150', !expanded && '-rotate-90')}
        />
      </button>

      {expanded ? (
        <div className="flex flex-col divide-y divide-line px-4">
          {module.actions.map((action) => (
            <label key={action.key} className="flex cursor-pointer items-center gap-2.5 py-2.5 text-sm text-ink">
              <input
                type="checkbox"
                checked={checkedKeys.has(action.key)}
                onChange={() => onToggle(action.key)}
                className="h-4 w-4 shrink-0 rounded border-line text-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              {action.label}
            </label>
          ))}
        </div>
      ) : null}
    </div>
  )
}
