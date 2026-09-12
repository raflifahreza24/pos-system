import { useState } from 'react'
import type { PermissionNode } from '../../data/rolesPermissionsData'
import { IconChevronDown } from '../ui/icons'
import { cn } from '../../utils/formatters'

interface PermissionTreeItemProps {
  node: PermissionNode
  depth: number
  checkedKeys: Set<string>
  onToggle: (key: string) => void
  defaultExpanded?: boolean
  disabled?: boolean
}

/**
 * One row of the permission tree — recurses into its own children, so the
 * tree's depth is driven entirely by `permissionTree` data, not by nested
 * markup. A node with children renders as an expand/collapse group; a node
 * without children renders as a checkable permission.
 */
export function PermissionTreeItem({
  node,
  depth,
  checkedKeys,
  onToggle,
  defaultExpanded = false,
  disabled = false,
}: PermissionTreeItemProps) {
  const [expanded, setExpanded] = useState(defaultExpanded)
  const hasChildren = Boolean(node.children?.length)
  const paddingLeft = 10 + depth * 22

  if (!hasChildren) {
    return (
      <label
        className={cn(
          'flex items-center gap-2.5 py-2 pr-3 text-sm text-ink transition-colors duration-150',
          disabled ? 'cursor-default opacity-75' : 'cursor-pointer hover:bg-canvas',
        )}
        style={{ paddingLeft }}
      >
        <input
          type="checkbox"
          checked={checkedKeys.has(node.key)}
          onChange={() => onToggle(node.key)}
          disabled={disabled}
          className="h-4 w-4 shrink-0 rounded border-line text-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
        <span>{node.label}</span>
      </label>
    )
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setExpanded((value) => !value)}
        aria-expanded={expanded}
        className="flex w-full items-center justify-between gap-2 py-2 pr-3 text-left text-sm font-medium text-ink transition-colors duration-150 hover:bg-canvas"
        style={{ paddingLeft }}
      >
        <span>{node.label}</span>
        <IconChevronDown
          size={16}
          className={cn('shrink-0 text-ink-muted transition-transform duration-150', !expanded && '-rotate-90')}
        />
      </button>

      {expanded ? (
        <div className="flex flex-col">
          {node.children!.map((child) => (
            <PermissionTreeItem
              key={child.key}
              node={child}
              depth={depth + 1}
              checkedKeys={checkedKeys}
              onToggle={onToggle}
              disabled={disabled}
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}
