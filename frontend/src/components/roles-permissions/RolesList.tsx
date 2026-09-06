import { PanelList } from '../ui/PanelList'
import type { Role } from '../../data/rolesPermissionsData'

interface RolesListProps {
  roles: Role[]
  activeRoleId: string
  onSelect: (roleId: string) => void
}

export function RolesList({ roles, activeRoleId, onSelect }: RolesListProps) {
  return (
    <PanelList
      title="Roles"
      items={roles.map((role) => ({ id: role.id, label: role.name }))}
      activeId={activeRoleId}
      onSelect={onSelect}
    />
  )
}
