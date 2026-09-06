import { useState } from 'react'
import { Button } from '../../components/ui/Button'
import { IconChevronLeft } from '../../components/ui/icons'
import { BasicInformationStep, type RoleBasicInformationState } from '../../components/roles/create/BasicInformationStep'
import { PermissionsStep } from '../../components/roles/create/PermissionsStep'
import { permissionModules } from '../../data/rolesPermissionsData'

const initialBasicInfo: RoleBasicInformationState = {
  roleName: '',
  description: '',
  status: 'Active',
}

export function RoleCreatePage() {
  const [basicInfo, setBasicInfo] = useState(initialBasicInfo)
  const [checkedKeys, setCheckedKeys] = useState<Set<string>>(new Set())

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

  // TODO: submit the new role and its permissions to the backend once that endpoint exists.
  function handleSubmit() {
    window.location.hash = '#/roles-permissions'
  }

  const canSubmit = basicInfo.roleName.trim() !== ''

  return (
    <div className="mx-auto flex max-w-[1400px] flex-col gap-5">
      <div className="flex justify-end">
        <Button variant="secondary" icon={<IconChevronLeft size={16} />} onClick={handleCancel}>
          Kembali
        </Button>
      </div>

      <BasicInformationStep value={basicInfo} onChange={updateBasicInfo} />

      <PermissionsStep checkedKeys={checkedKeys} onToggle={handleTogglePermission} onToggleAll={handleToggleAllPermissions} />

      <div className="flex justify-end gap-3">
        <Button variant="secondary" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={!canSubmit}>
          Save Role
        </Button>
      </div>
    </div>
  )
}
