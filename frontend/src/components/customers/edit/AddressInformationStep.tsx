import { Input } from '../../ui/Input'
import { Textarea } from '../../ui/Textarea'
import { FormFieldRow } from '../../ui/FormFieldRow'
import { StepCard } from '../../ui/StepCard'

export interface EditAddressInformationState {
  addressLine: string
  city: string
  province: string
  postalCode: string
}

interface AddressInformationStepProps {
  value: EditAddressInformationState
  onChange: <K extends keyof EditAddressInformationState>(field: K, value: EditAddressInformationState[K]) => void
}

export function AddressInformationStep({ value, onChange }: AddressInformationStepProps) {
  return (
    <StepCard step={2} title="Address Information" subtitle="Update the customer address.">
      <div className="flex flex-col gap-4">
        <FormFieldRow label="Address" align="start">
          <Textarea value={value.addressLine} onChange={(event) => onChange('addressLine', event.target.value)} />
        </FormFieldRow>

        <FormFieldRow label="City">
          <Input value={value.city} onChange={(event) => onChange('city', event.target.value)} />
        </FormFieldRow>

        <FormFieldRow label="Province">
          <Input value={value.province} onChange={(event) => onChange('province', event.target.value)} />
        </FormFieldRow>

        <FormFieldRow label="Postal Code">
          <Input value={value.postalCode} onChange={(event) => onChange('postalCode', event.target.value)} />
        </FormFieldRow>
      </div>
    </StepCard>
  )
}
