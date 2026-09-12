import { useCallback, useMemo } from 'react'
import { useAuth } from './useAuth'

const EMPTY_PERMISSIONS: string[] = []

export function usePermission() {
  const { user } = useAuth()
  const permissions = user?.permissions ?? EMPTY_PERMISSIONS
  const permissionSet = useMemo(() => new Set(permissions), [permissions])

  const can = useCallback(
    (permission: string): boolean => permissionSet.has(permission),
    [permissionSet],
  )
  const canAny = useCallback(
    (requiredPermissions: string[]): boolean =>
      requiredPermissions.some((permission) => permissionSet.has(permission)),
    [permissionSet],
  )
  const canAll = useCallback(
    (requiredPermissions: string[]): boolean =>
      requiredPermissions.every((permission) => permissionSet.has(permission)),
    [permissionSet],
  )
  const hasRole = useCallback(
    (roleName: string): boolean => user?.role?.name === roleName,
    [user?.role?.name],
  )

  return { permissions, can, canAny, canAll, hasRole }
}
