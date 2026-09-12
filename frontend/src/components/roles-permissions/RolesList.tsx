import { PanelList } from '../ui/PanelList'
import type { AuthorizationRole } from '../../types/authorization'

interface RolesListProps {
  roles: AuthorizationRole[]
  activeRoleId: number | null
  onSelect: (roleId: number) => void
}

export function RolesList({ roles, activeRoleId, onSelect }: RolesListProps) {
  return (
    <PanelList
      title="Roles"
      items={roles.map((role) => ({ id: String(role.id), label: role.name }))}
      activeId={activeRoleId === null ? '' : String(activeRoleId)}
      onSelect={(roleId) => onSelect(Number(roleId))}
    />
  )
}
