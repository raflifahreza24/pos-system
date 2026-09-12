import type { ReactNode } from 'react'
import { usePermission } from '../../hooks/usePermission'

interface PermissionGuardProps {
  permission?: string
  anyOf?: string[]
  allOf?: string[]
  children: ReactNode
  fallback?: ReactNode
}

export function PermissionGuard({
  permission,
  anyOf,
  allOf,
  children,
  fallback = null,
}: PermissionGuardProps) {
  const { can, canAny, canAll } = usePermission()
  const allowed =
    (!permission || can(permission)) &&
    (!anyOf || canAny(anyOf)) &&
    (!allOf || canAll(allOf))

  return allowed ? children : fallback
}
