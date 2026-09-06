import { useState } from 'react'
import { Button } from '../../components/ui/Button'
import { IconChevronLeft } from '../../components/ui/icons'
import { BasicInformationStep, type BranchBasicInformationState } from '../../components/branches/create/BasicInformationStep'
import { BranchInfoPanel } from '../../components/branches/create/BranchInfoPanel'
import { ContactAddressStep, type ContactAddressState } from '../../components/branches/create/ContactAddressStep'
import { LocationPanel } from '../../components/branches/create/LocationPanel'
import {
  AdditionalInformationStep,
  type BranchAdditionalInformationState,
} from '../../components/branches/create/AdditionalInformationStep'

const initialBasicInfo: BranchBasicInformationState = {
  name: '',
  code: '',
  status: 'Active',
}

const initialContactAddress: ContactAddressState = {
  address: '',
  phone: '',
  email: '',
  city: '',
  province: '',
  postalCode: '',
}

const initialAdditionalInfo: BranchAdditionalInformationState = {
  notes: '',
  logo: null,
}

export function BranchCreatePage() {
  const [basicInfo, setBasicInfo] = useState(initialBasicInfo)
  const [contactAddress, setContactAddress] = useState(initialContactAddress)
  const [additionalInfo, setAdditionalInfo] = useState(initialAdditionalInfo)

  function updateBasicInfo<K extends keyof BranchBasicInformationState>(field: K, value: BranchBasicInformationState[K]) {
    setBasicInfo((prev) => ({ ...prev, [field]: value }))
  }

  function updateContactAddress<K extends keyof ContactAddressState>(field: K, value: ContactAddressState[K]) {
    setContactAddress((prev) => ({ ...prev, [field]: value }))
  }

  function updateAdditionalInfo<K extends keyof BranchAdditionalInformationState>(
    field: K,
    value: BranchAdditionalInformationState[K],
  ) {
    setAdditionalInfo((prev) => ({ ...prev, [field]: value }))
  }

  function handleCancel() {
    window.location.hash = '#/branches'
  }

  // TODO: submit the new branch to the backend once that endpoint exists.
  function handleSubmit() {
    window.location.hash = '#/branches'
  }

  const canSubmit =
    basicInfo.name.trim() !== '' &&
    basicInfo.code.trim() !== '' &&
    contactAddress.address.trim() !== '' &&
    contactAddress.phone.trim() !== '' &&
    contactAddress.city.trim() !== '' &&
    contactAddress.province.trim() !== ''

  return (
    <div className="mx-auto flex max-w-[1400px] flex-col gap-5">
      <div className="flex justify-end">
        <Button variant="secondary" icon={<IconChevronLeft size={16} />} onClick={handleCancel}>
          Kembali
        </Button>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_320px] lg:items-start">
        <BasicInformationStep value={basicInfo} onChange={updateBasicInfo} />
        <BranchInfoPanel />
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_320px] lg:items-start">
        <ContactAddressStep value={contactAddress} onChange={updateContactAddress} />
        <LocationPanel />
      </div>

      <AdditionalInformationStep value={additionalInfo} onChange={updateAdditionalInfo} />

      <div className="flex justify-end gap-3">
        <Button variant="secondary" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={!canSubmit}>
          Save Branch
        </Button>
      </div>
    </div>
  )
}
