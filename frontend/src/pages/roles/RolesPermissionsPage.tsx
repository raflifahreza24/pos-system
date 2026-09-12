import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { PageHeader } from '../../components/ui/PageHeader'
import { Button } from '../../components/ui/Button'
import { RolesList } from '../../components/roles-permissions/RolesList'
import { PermissionTree } from '../../components/roles-permissions/PermissionTree'
import { ConfirmDialog } from '../../components/ui/ConfirmDialog'
import { IconPlus, IconSave, IconTrash } from '../../components/ui/icons'
import { PermissionGuard } from '../../components/auth/PermissionGuard'
import { authorizationApi } from '../../api/authorizationApi'
import { getApiErrorMessage } from '../../api/apiClient'
import { useAuth } from '../../hooks/useAuth'
import { usePermission } from '../../hooks/usePermission'
import { useToast } from '../../hooks/useToast'
import { flattenPermissions, permissionGroupsToTree } from '../../utils/authorization'
import type { AuthorizationRole, PermissionGroups } from '../../types/authorization'

export function RolesPermissionsPage() {
  const { refreshUser, user } = useAuth()
  const { can } = usePermission()
  const { showSuccess, showError } = useToast()
  const [roles, setRoles] = useState<AuthorizationRole[]>([])
  const [permissionGroups, setPermissionGroups] = useState<PermissionGroups>({})
  const [activeRoleId, setActiveRoleId] = useState<number | null>(null)
  const [checkedKeys, setCheckedKeys] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)
  const [roleLoading, setRoleLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const permissionTree = useMemo(
    () => permissionGroupsToTree(permissionGroups),
    [permissionGroups],
  )
  const allPermissions = useMemo(
    () => flattenPermissions(permissionGroups),
    [permissionGroups],
  )
  const activeRole = roles.find((role) => role.id === activeRoleId) ?? null

  useEffect(() => {
    let cancelled = false

    async function loadAuthorizationData() {
      try {
        const [roleList, groups] = await Promise.all([
          authorizationApi.getRoles(),
          authorizationApi.getPermissions(),
        ])
        if (cancelled) return

        setRoles(roleList)
        setPermissionGroups(groups)
        setRoleLoading(roleList.length > 0)
        setActiveRoleId(roleList[0]?.id ?? null)
      } catch (error) {
        if (cancelled) return
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          await refreshUser()
          return
        }
        setErrorMessage(getApiErrorMessage(error, 'Unable to load roles and permissions.'))
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    void loadAuthorizationData()
    return () => {
      cancelled = true
    }
  }, [refreshUser])

  useEffect(() => {
    if (activeRoleId === null) return

    let cancelled = false

    authorizationApi
      .getRole(activeRoleId)
      .then((role) => {
        if (!cancelled) {
          setCheckedKeys(new Set(role.permissions?.map((permission) => permission.name) ?? []))
        }
      })
      .catch(async (error: unknown) => {
        if (cancelled) return
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          await refreshUser()
          return
        }
        setErrorMessage(getApiErrorMessage(error, 'Unable to load this role.'))
      })
      .finally(() => {
        if (!cancelled) setRoleLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [activeRoleId, refreshUser])

  function handleTogglePermission(key: string) {
    setCheckedKeys((current) => {
      const next = new Set(current)
      if (next.has(key)) {
        next.delete(key)
      } else {
        next.add(key)
      }
      return next
    })
  }

  function handleAddRole() {
    window.location.hash = '#/roles-permissions/create'
  }

  function handleSelectRole(roleId: number) {
    setRoleLoading(true)
    setActiveRoleId(roleId)
  }

  async function handleSavePermissions() {
    if (activeRoleId === null || saving) return

    setSaving(true)
    setErrorMessage('')
    try {
      const permissionIds = allPermissions
        .filter((permission) => checkedKeys.has(permission.name))
        .map((permission) => permission.id)
      await authorizationApi.updateRolePermissions(activeRoleId, permissionIds)
      showSuccess('Permissions updated successfully.')

      if (user?.role?.id === activeRoleId) {
        await refreshUser()
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        await refreshUser()
        return
      }
      const message = getApiErrorMessage(error, 'Unable to update role permissions.')
      setErrorMessage(message)
      showError('Failed to update permissions', message)
    } finally {
      setSaving(false)
    }
  }

  async function handleDeleteRole() {
    if (activeRoleId === null || deleting) return

    setDeleting(true)
    setErrorMessage('')
    try {
      const message = await authorizationApi.deleteRole(activeRoleId)
      const remainingRoles = roles.filter((role) => role.id !== activeRoleId)
      setRoles(remainingRoles)
      setRoleLoading(remainingRoles.length > 0)
      setActiveRoleId(remainingRoles[0]?.id ?? null)
      if (remainingRoles.length === 0) setCheckedKeys(new Set())
      setDeleteDialogOpen(false)
      showSuccess(message)
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        await refreshUser()
        return
      }
      const message = getApiErrorMessage(error, 'Unable to delete this role.')
      setErrorMessage(message)
      showError('Failed to delete role', message)
      setDeleteDialogOpen(false)
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="mx-auto flex max-w-[1400px] flex-col gap-5">
      <PageHeader
        title="Roles & Permissions"
        subtitle="Control what each role can see and do across the app."
        action={
          <PermissionGuard permission="roles.create">
            <Button icon={<IconPlus size={16} />} onClick={handleAddRole} fullWidthOnMobile>
              Add Role
            </Button>
          </PermissionGuard>
        }
      />

      {errorMessage ? (
        <p role="alert" className="rounded-xl bg-danger-light px-4 py-3 text-sm text-danger-strong">
          {errorMessage}
        </p>
      ) : null}

      {loading ? (
        <div className="rounded-2xl border border-line bg-surface p-8 text-center text-sm text-ink-muted">
          Loading roles and permissions...
        </div>
      ) : roles.length === 0 ? (
        <div className="rounded-2xl border border-line bg-surface p-8 text-center text-sm text-ink-muted">
          No roles are available.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[240px_minmax(0,1fr)] lg:items-start">
          <RolesList roles={roles} activeRoleId={activeRoleId} onSelect={handleSelectRole} />

          <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-canvas px-4 py-3">
              <span className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
                Permissions{activeRole ? ` — ${activeRole.name}` : ''}
              </span>
              <div className="flex items-center gap-2">
                <PermissionGuard permission="roles.delete">
                  <Button
                    variant="danger"
                    icon={<IconTrash size={15} />}
                    onClick={() => setDeleteDialogOpen(true)}
                    disabled={roleLoading || activeRoleId === null}
                    className="px-3! py-1.5! text-xs"
                  >
                    Delete Role
                  </Button>
                </PermissionGuard>
                <PermissionGuard permission="roles.update">
                  <Button
                    icon={<IconSave size={15} />}
                    onClick={() => void handleSavePermissions()}
                    disabled={roleLoading || saving || activeRoleId === null}
                    className="px-3! py-1.5! text-xs"
                  >
                    {saving ? 'Saving...' : 'Save Permissions'}
                  </Button>
                </PermissionGuard>
              </div>
            </div>
            <div className="p-2">
              {roleLoading ? (
                <p className="p-6 text-center text-sm text-ink-muted">Loading role permissions...</p>
              ) : permissionTree.length === 0 ? (
                <p className="p-6 text-center text-sm text-ink-muted">No permissions are available.</p>
              ) : (
                <PermissionTree
                  nodes={permissionTree}
                  checkedKeys={checkedKeys}
                  onToggle={handleTogglePermission}
                  defaultExpandedKeys={permissionTree.map((node) => node.key)}
                  disabled={!can('roles.update')}
                />
              )}
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog
        open={deleteDialogOpen}
        title="Delete role?"
        description={
          activeRole
            ? `The role “${activeRole.name}” will be deleted.`
            : 'This role will be deleted.'
        }
        confirmLabel="Delete Role"
        confirmLoading={deleting}
        onConfirm={() => void handleDeleteRole()}
        onCancel={() => setDeleteDialogOpen(false)}
      />
    </div>
  )
}
