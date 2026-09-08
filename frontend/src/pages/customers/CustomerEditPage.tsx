import { useState } from 'react'
import { PageHeader } from '../../components/ui/PageHeader'
import { Button } from '../../components/ui/Button'
import { IconChevronLeft } from '../../components/ui/icons'
import {
  CustomerInformationStep,
  type EditCustomerInformationState,
} from '../../components/customers/edit/CustomerInformationStep'
import {
  AddressInformationStep,
  type EditAddressInformationState,
} from '../../components/customers/edit/AddressInformationStep'
import {
  AdditionalInformationStep,
  type EditAdditionalInformationState,
} from '../../components/customers/edit/AdditionalInformationStep'
import { customers } from '../../data/customersData'

interface CustomerEditPageProps {
  customerId: string
}

export function CustomerEditPage({ customerId }: CustomerEditPageProps) {
  const customer = customers.find((entry) => entry.id === customerId)

  function handleBack() {
    window.location.hash = `#/customers/${customerId}`
  }

  if (!customer) {
    return (
      <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-4 py-16 text-center">
        <p className="text-sm text-ink-muted">Customer "{customerId}" was not found.</p>
        <Button variant="secondary" icon={<IconChevronLeft size={16} />} onClick={() => (window.location.hash = '#/customers')}>
          Back
        </Button>
      </div>
    )
  }

  return <CustomerEditForm customer={customer} onBack={handleBack} />
}

// Split out so the hooks below only ever run once a real customer is
// found — the lookup above can return early without breaking the rules
// of hooks.
function CustomerEditForm({
  customer,
  onBack,
}: {
  customer: (typeof customers)[number]
  onBack: () => void
}) {
  const [customerInfo, setCustomerInfo] = useState<EditCustomerInformationState>({
    name: customer.name,
    phone: customer.phone,
    email: customer.email,
    status: customer.status,
  })

  const [addressInfo, setAddressInfo] = useState<EditAddressInformationState>({
    addressLine: customer.addressLine,
    city: customer.city,
    province: customer.province,
    postalCode: customer.postalCode,
  })

  const [additionalInfo, setAdditionalInfo] = useState<EditAdditionalInformationState>({
    notes: customer.notes,
  })

  function updateCustomerInfo<K extends keyof EditCustomerInformationState>(
    field: K,
    value: EditCustomerInformationState[K],
  ) {
    setCustomerInfo((prev) => ({ ...prev, [field]: value }))
  }

  function updateAddressInfo<K extends keyof EditAddressInformationState>(
    field: K,
    value: EditAddressInformationState[K],
  ) {
    setAddressInfo((prev) => ({ ...prev, [field]: value }))
  }

  function updateAdditionalInfo<K extends keyof EditAdditionalInformationState>(
    field: K,
    value: EditAdditionalInformationState[K],
  ) {
    setAdditionalInfo((prev) => ({ ...prev, [field]: value }))
  }

  function handleCancel() {
    onBack()
  }

  // TODO: submit the updated customer to the backend once that endpoint exists.
  function handleSubmit() {
    onBack()
  }

  const canSubmit = customerInfo.name.trim() !== '' && customerInfo.phone.trim() !== ''

  return (
    <div className="mx-auto flex max-w-[1400px] flex-col gap-5">
      <PageHeader
        title="Edit Customer"
        action={
          <Button variant="secondary" icon={<IconChevronLeft size={16} />} onClick={onBack}>
            Back
          </Button>
        }
      />

      <CustomerInformationStep value={customerInfo} onChange={updateCustomerInfo} />
      <AddressInformationStep value={addressInfo} onChange={updateAddressInfo} />
      <AdditionalInformationStep value={additionalInfo} onChange={updateAdditionalInfo} />

      <div className="flex justify-end gap-3">
        <Button variant="secondary" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={!canSubmit}>
          Save Changes
        </Button>
      </div>
    </div>
  )
}
