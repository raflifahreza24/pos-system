import { Input } from '../../ui/Input'
import { Textarea } from '../../ui/Textarea'
import { FormFieldRow } from '../../ui/FormFieldRow'
import { StepCard } from '../../ui/StepCard'

export interface AddressInformationState {
  address: string
  city: string
  province: string
  postalCode: string
  country: string
}

interface AddressInformationStepProps {
  value: AddressInformationState
  onChange: <K extends keyof AddressInformationState>(field: K, value: AddressInformationState[K]) => void
}

export function AddressInformationStep({ value, onChange }: AddressInformationStepProps) {
  return (
    <StepCard step={2} title="Address Information">
      <div className="flex flex-col gap-4">
        <FormFieldRow label="Address" required align="start">
          <Textarea
            rows={4}
            placeholder="Enter full address"
            value={value.address}
            onChange={(event) => onChange('address', event.target.value)}
          />
        </FormFieldRow>

        <FormFieldRow label="City">
          <Input placeholder="Enter city" value={value.city} onChange={(event) => onChange('city', event.target.value)} />
        </FormFieldRow>

        <FormFieldRow label="Province">
          <Input
            placeholder="Enter province"
            value={value.province}
            onChange={(event) => onChange('province', event.target.value)}
          />
        </FormFieldRow>

        <FormFieldRow label="Postal Code">
          <Input
            placeholder="Enter postal code"
            value={value.postalCode}
            onChange={(event) => onChange('postalCode', event.target.value)}
          />
        </FormFieldRow>

        <FormFieldRow label="Country">
          <Input
            placeholder="Enter country (optional)"
            value={value.country}
            onChange={(event) => onChange('country', event.target.value)}
          />
        </FormFieldRow>
      </div>
    </StepCard>
  )
}
