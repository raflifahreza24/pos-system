import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { Button } from '../../components/ui/Button'
import { IconChevronLeft } from '../../components/ui/icons'
import { BasicInformationStep, type RoleBasicInformationState } from '../../components/roles/create/BasicInformationStep'
import { PermissionsStep } from '../../components/roles/create/PermissionsStep'
import { authorizationApi } from '../../api/authorizationApi'
import { getApiErrorMessage } from '../../api/apiClient'
import { useAuth } from '../../hooks/useAuth'
import { useToast } from '../../hooks/useToast'
import { flattenPermissions, permissionGroupsToModules } from '../../utils/authorization'
import type { PermissionGroups } from '../../types/authorization'

const initialBasicInfo: RoleBasicInformationState = {
  roleName: '',
  description: '',
  status: 'Active',
}

export function RoleCreatePage() {
  const { refreshUser } = useAuth()
  const { showSuccess, showError } = useToast()
  const [basicInfo, setBasicInfo] = useState(initialBasicInfo)
  const [checkedKeys, setCheckedKeys] = useState<Set<string>>(new Set())
  const [permissionGroups, setPermissionGroups] = useState<PermissionGroups>({})
  const [permissionsLoading, setPermissionsLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const permissionModules = useMemo(
    () => permissionGroupsToModules(permissionGroups),
    [permissionGroups],
  )
  const allPermissions = useMemo(
    () => flattenPermissions(permissionGroups),
    [permissionGroups],
  )

  useEffect(() => {
    let cancelled = false

    async function loadPermissions() {
      try {
        const groups = await authorizationApi.getPermissions()
        if (!cancelled) setPermissionGroups(groups)
      } catch (error) {
        if (cancelled) return
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          await refreshUser()
          return
        }
        setErrorMessage(getApiErrorMessage(error, 'Unable to load permissions.'))
      } finally {
        if (!cancelled) setPermissionsLoading(false)
      }
    }

    void loadPermissions()
    return () => {
      cancelled = true
    }
  }, [refreshUser])

  function updateBasicInfo<K extends keyof RoleBasicInformationState>(field: K, value: RoleBasicInformationState[K]) {
    setBasicInfo((prev) => ({ ...prev, [field]: value }))
  }

  function handleTogglePermission(key: string) {
    setCheckedKeys((prev) => {
      const next = new Set(prev)
      if (next.has(key)) {
        next.delete(key)
      } else {
        next.add(key)
      }
      return next
    })
  }

  function handleToggleAllPermissions(checked: boolean) {
    if (!checked) {
      setCheckedKeys(new Set())
      return
    }
    const allActionKeys = permissionModules.flatMap((module) => module.actions.map((action) => action.key))
    setCheckedKeys(new Set(allActionKeys))
  }

  function handleCancel() {
    window.location.hash = '#/roles-permissions'
  }

  async function handleSubmit() {
    if (!canSubmit || submitting) return

    setSubmitting(true)
    setErrorMessage('')
    try {
      const permissionIds = allPermissions
        .filter((permission) => checkedKeys.has(permission.name))
        .map((permission) => permission.id)
      await authorizationApi.createRole({
        name: basicInfo.roleName.trim(),
        description: basicInfo.description.trim() || null,
        is_active: basicInfo.status === 'Active',
        permissions: permissionIds,
      })
      showSuccess('Role created successfully.')
      window.location.hash = '#/roles-permissions'
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        await refreshUser()
        return
      }
      const message = getApiErrorMessage(error, 'Unable to create this role.')
      setErrorMessage(message)
      showError('Failed to create role', message)
    } finally {
      setSubmitting(false)
    }
  }

  const canSubmit =
    basicInfo.roleName.trim() !== '' &&
    !permissionsLoading &&
    permissionModules.length > 0

  return (
    <div className="mx-auto flex max-w-[1400px] flex-col gap-5">
      <div className="flex justify-end">
        <Button variant="secondary" icon={<IconChevronLeft size={16} />} onClick={handleCancel}>
          Kembali
        </Button>
      </div>

      <BasicInformationStep value={basicInfo} onChange={updateBasicInfo} />

      {errorMessage ? (
        <p role="alert" className="rounded-xl bg-danger-light px-4 py-3 text-sm text-danger-strong">
          {errorMessage}
        </p>
      ) : null}

      {permissionsLoading ? (
        <div className="rounded-2xl border border-line bg-surface p-8 text-center text-sm text-ink-muted">
          Loading permissions...
        </div>
      ) : permissionModules.length === 0 ? (
        <div className="rounded-2xl border border-line bg-surface p-8 text-center text-sm text-ink-muted">
          No permissions are available.
        </div>
      ) : (
        <PermissionsStep
          modules={permissionModules}
          checkedKeys={checkedKeys}
          onToggle={handleTogglePermission}
          onToggleAll={handleToggleAllPermissions}
        />
      )}

      <div className="flex justify-end gap-3">
        <Button variant="secondary" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="primary" onClick={() => void handleSubmit()} disabled={!canSubmit || submitting}>
          {submitting ? 'Saving...' : 'Save Role'}
        </Button>
      </div>
    </div>
  )
}
