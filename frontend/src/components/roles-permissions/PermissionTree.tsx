import type { PermissionNode } from '../../data/rolesPermissionsData'
import { PermissionTreeItem } from './PermissionTreeItem'

interface PermissionTreeProps {
  nodes: PermissionNode[]
  checkedKeys: Set<string>
  onToggle: (key: string) => void
  defaultExpandedKeys?: string[]
}

export function PermissionTree({ nodes, checkedKeys, onToggle, defaultExpandedKeys = [] }: PermissionTreeProps) {
  return (
    <div className="flex flex-col divide-y divide-line">
      {nodes.map((node) => (
        <PermissionTreeItem
          key={node.key}
          node={node}
          depth={0}
          checkedKeys={checkedKeys}
          onToggle={onToggle}
          defaultExpanded={defaultExpandedKeys.includes(node.key)}
        />
      ))}
    </div>
  )
}
