import { useState } from 'react'
import { Button } from '../../components/ui/Button'
import { IconChevronLeft } from '../../components/ui/icons'
import { BasicInformationStep, type BasicInformationState } from '../../components/users/create/BasicInformationStep'
import { RoleAccessStep, type RoleAccessState } from '../../components/users/create/RoleAccessStep'
import {
  AdditionalInformationStep,
  type AdditionalInformationState,
} from '../../components/users/create/AdditionalInformationStep'

const initialBasicInfo: BasicInformationState = {
  fullName: '',
  email: '',
  phone: '',
  username: '',
  password: '',
  confirmPassword: '',
}

const initialRoleAccess: RoleAccessState = {
  role: '',
  branch: '',
  status: 'Active',
  employeeId: '',
  position: '',
}

const initialAdditionalInfo: AdditionalInformationState = {
  address: '',
  notes: '',
  profilePicture: null,
}

export function UserCreatePage() {
  const [basicInfo, setBasicInfo] = useState(initialBasicInfo)
  const [roleAccess, setRoleAccess] = useState(initialRoleAccess)
  const [additionalInfo, setAdditionalInfo] = useState(initialAdditionalInfo)

  function updateBasicInfo<K extends keyof BasicInformationState>(field: K, value: BasicInformationState[K]) {
    setBasicInfo((prev) => ({ ...prev, [field]: value }))
  }

  function updateRoleAccess<K extends keyof RoleAccessState>(field: K, value: RoleAccessState[K]) {
    setRoleAccess((prev) => ({ ...prev, [field]: value }))
  }

  function updateAdditionalInfo<K extends keyof AdditionalInformationState>(field: K, value: AdditionalInformationState[K]) {
    setAdditionalInfo((prev) => ({ ...prev, [field]: value }))
  }

  function handleCancel() {
    window.location.hash = '#/users-employees'
  }

  // TODO: submit the new user to the backend once that endpoint exists.
  function handleSubmit() {
    window.location.hash = '#/users-employees'
  }

  const canSubmit =
    basicInfo.fullName !== '' &&
    basicInfo.email !== '' &&
    basicInfo.username !== '' &&
    basicInfo.password !== '' &&
    basicInfo.password === basicInfo.confirmPassword &&
    roleAccess.role !== '' &&
    roleAccess.branch !== ''

  return (
    <div className="mx-auto flex max-w-[1400px] flex-col gap-5">
      <div className="flex justify-end">
        <Button variant="secondary" icon={<IconChevronLeft size={16} />} onClick={handleCancel}>
          Kembali
        </Button>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <BasicInformationStep value={basicInfo} onChange={updateBasicInfo} />
        </div>
        <RoleAccessStep value={roleAccess} onChange={updateRoleAccess} />
      </div>

      <AdditionalInformationStep value={additionalInfo} onChange={updateAdditionalInfo} />

      <div className="flex justify-end gap-3">
        <Button variant="secondary" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={!canSubmit}>
          Save User
        </Button>
      </div>
    </div>
  )
}
