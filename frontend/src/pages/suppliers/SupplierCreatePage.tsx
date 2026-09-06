import { useState } from 'react'
import { Button } from '../../components/ui/Button'
import { IconChevronLeft } from '../../components/ui/icons'
import { BasicInformationStep, type BasicInformationState } from '../../components/suppliers/create/BasicInformationStep'
import {
  AddressInformationStep,
  type AddressInformationState,
} from '../../components/suppliers/create/AddressInformationStep'
import {
  AdditionalInformationStep,
  type AdditionalInformationState,
} from '../../components/suppliers/create/AdditionalInformationStep'

const initialBasicInfo: BasicInformationState = {
  name: '',
  category: '',
  contactPerson: '',
  phone: '',
  email: '',
  website: '',
  taxId: '',
  status: 'Active',
}

const initialAddressInfo: AddressInformationState = {
  address: '',
  city: '',
  province: '',
  postalCode: '',
  country: '',
}

const initialAdditionalInfo: AdditionalInformationState = {
  paymentTerms: '',
  leadTimeDays: '',
  notes: '',
}

export function SupplierCreatePage() {
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
    window.location.hash = '#/suppliers'
  }

  // TODO: submit the new supplier to the backend once that endpoint exists.
  function handleSubmit() {
    window.location.hash = '#/suppliers'
  }

  const canSubmit =
    basicInfo.name.trim() !== '' && basicInfo.phone.trim() !== '' && addressInfo.address.trim() !== ''

  return (
    <div className="mx-auto flex max-w-[1400px] flex-col gap-5">
      <div className="flex justify-end">
        <Button variant="secondary" icon={<IconChevronLeft size={16} />} onClick={handleCancel}>
          Kembali
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <BasicInformationStep value={basicInfo} onChange={updateBasicInfo} />
        <AddressInformationStep value={addressInfo} onChange={updateAddressInfo} />
      </div>

      <AdditionalInformationStep value={additionalInfo} onChange={updateAdditionalInfo} />

      <div className="flex justify-end gap-3">
        <Button variant="secondary" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={!canSubmit}>
          Save Supplier
        </Button>
      </div>
    </div>
  )
}
