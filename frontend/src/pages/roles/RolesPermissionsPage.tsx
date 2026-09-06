import { useState } from 'react'
import { PageHeader } from '../../components/ui/PageHeader'
import { Button } from '../../components/ui/Button'
import { RolesList } from '../../components/roles-permissions/RolesList'
import { PermissionTree } from '../../components/roles-permissions/PermissionTree'
import { IconPlus } from '../../components/ui/icons'
import { roles, permissionTree, defaultRolePermissions } from '../../data/rolesPermissionsData'

function buildInitialPermissions(): Record<string, Set<string>> {
  const initial: Record<string, Set<string>> = {}
  for (const role of roles) {
    initial[role.id] = new Set(defaultRolePermissions[role.id] ?? [])
  }
  return initial
}

export function RolesPermissionsPage() {
  const [activeRoleId, setActiveRoleId] = useState(roles[0].id)
  const [rolePermissions, setRolePermissions] = useState(buildInitialPermissions)

  const checkedKeys = rolePermissions[activeRoleId] ?? new Set<string>()

  function handleTogglePermission(key: string) {
    setRolePermissions((current) => {
      const next = new Set(current[activeRoleId])
      if (next.has(key)) {
        next.delete(key)
      } else {
        next.add(key)
      }
      return { ...current, [activeRoleId]: next }
    })
  }

  function handleAddRole() {
    window.location.hash = '#/roles-permissions/create'
  }

  return (
    <div className="mx-auto flex max-w-[1400px] flex-col gap-5">
      <PageHeader
        title="Roles & Permissions"
        subtitle="Control what each role can see and do across the app."
        action={
          <Button icon={<IconPlus size={16} />} onClick={handleAddRole} fullWidthOnMobile>
            Add Role
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[240px_minmax(0,1fr)] lg:items-start">
        <RolesList roles={roles} activeRoleId={activeRoleId} onSelect={setActiveRoleId} />

        <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-xs">
          <div className="border-b border-line bg-canvas px-4 py-3 text-xs font-semibold uppercase tracking-wide text-ink-muted">
            Permissions
          </div>
          <div className="p-2">
            <PermissionTree
              nodes={permissionTree}
              checkedKeys={checkedKeys}
              onToggle={handleTogglePermission}
              defaultExpandedKeys={['salesGroup']}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
