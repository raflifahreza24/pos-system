import { StepCard } from '../../ui/StepCard'
import { PermissionModuleCard } from './PermissionModuleCard'
import { permissionModules } from '../../../data/rolesPermissionsData'

interface PermissionsStepProps {
  checkedKeys: Set<string>
  onToggle: (key: string) => void
  onToggleAll: (checked: boolean) => void
}

// Wireframe splits the eight modules into two columns of four — left gets
// Dashboard/POS/Transactions/Returns & Refunds, right gets the rest.
const leftColumn = permissionModules.slice(0, 4)
const rightColumn = permissionModules.slice(4)

export function PermissionsStep({ checkedKeys, onToggle, onToggleAll }: PermissionsStepProps) {
  const allActionKeys = permissionModules.flatMap((module) => module.actions.map((action) => action.key))
  const allChecked = allActionKeys.length > 0 && allActionKeys.every((key) => checkedKeys.has(key))

  return (
    <StepCard
      step={2}
      title="Permissions"
      subtitle="Select the menus and actions that this role can access."
      headerAction={
        <label className="flex cursor-pointer items-center gap-2 text-sm text-ink">
          <input
            type="checkbox"
            checked={allChecked}
            onChange={(event) => onToggleAll(event.target.checked)}
            className="h-4 w-4 shrink-0 rounded border-line text-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
          Select All Permissions
        </label>
      }
    >
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          {leftColumn.map((module) => (
            <PermissionModuleCard key={module.key} module={module} checkedKeys={checkedKeys} onToggle={onToggle} />
          ))}
        </div>
        <div className="flex flex-col gap-4">
          {rightColumn.map((module) => (
            <PermissionModuleCard key={module.key} module={module} checkedKeys={checkedKeys} onToggle={onToggle} />
          ))}
        </div>
      </div>
    </StepCard>
  )
}
