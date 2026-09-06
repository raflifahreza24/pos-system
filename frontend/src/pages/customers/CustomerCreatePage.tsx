import { useState } from 'react'
import { Button } from '../../components/ui/Button'
import { IconChevronLeft } from '../../components/ui/icons'
import { BasicInformationStep, type BasicInformationState } from '../../components/customers/create/BasicInformationStep'
import {
  AddressInformationStep,
  type AddressInformationState,
} from '../../components/customers/create/AddressInformationStep'
import {
  AdditionalInformationStep,
  type AdditionalInformationState,
} from '../../components/customers/create/AdditionalInformationStep'
import { customerTypes, customerStatuses } from '../../data/customersData'

const initialBasicInfo: BasicInformationState = {
  name: '',
  phone: '',
  email: '',
  dateOfBirth: '',
  customerType: customerTypes[0],
  gender: '',
  status: customerStatuses[0],
}

const initialAddressInfo: AddressInformationState = {
  address: '',
  city: '',
  province: '',
  postalCode: '',
  country: '',
}

const initialAdditionalInfo: AdditionalInformationState = {
  notes: '',
  initialMembershipDate: '',
  taxNumber: '',
}

export function CustomerCreatePage() {
  const [basicInfo, setBasicInfo] = useState(initialBasicInfo)
  const [addressInfo, setAddressInfo] = useState(initialAddressInfo)
  const [additionalInfo, setAdditionalInfo] = useState(initialAdditionalInfo)

  function updateBasicInfo<K extends keyof BasicInformationState>(field: K, value: BasicInformationState[K]) {
    setBasicInfo((prev) => ({ ...prev, [field]: value }))
  }

  function updateAddressInfo<K extends keyof AddressInformationState>(field: K, value: AddressInformationState[K]) {
    setAddressInfo((prev) => ({ ...prev, [field]: value }))
  }

  function updateAdditionalInfo<K extends keyof AdditionalInformationState>(
    field: K,
    value: AdditionalInformationState[K],
  ) {
    setAdditionalInfo((prev) => ({ ...prev, [field]: value }))
  }

  function handleCancel() {
    window.location.hash = '#/customers'
  }

  // TODO: submit the new customer to the backend once that endpoint exists.
  function handleSubmit() {
    window.location.hash = '#/customers'
  }

  const canSubmit = basicInfo.name.trim() !== '' && basicInfo.phone.trim() !== ''

  return (
    <div className="mx-auto flex max-w-[1400px] flex-col gap-5">
      <BasicInformationStep
        value={basicInfo}
        onChange={updateBasicInfo}
        headerAction={
          <Button variant="secondary" icon={<IconChevronLeft size={16} />} onClick={handleCancel}>
            Kembali
          </Button>
        }
      />
      <AddressInformationStep value={addressInfo} onChange={updateAddressInfo} />
      <AdditionalInformationStep value={additionalInfo} onChange={updateAdditionalInfo} />

      <div className="flex justify-end gap-3">
        <Button variant="secondary" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={!canSubmit}>
          Save Customer
        </Button>
      </div>
    </div>
  )
}
