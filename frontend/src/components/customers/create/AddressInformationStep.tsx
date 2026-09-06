import { Input } from '../../ui/Input'
import { Textarea } from '../../ui/Textarea'
import { FormField } from '../../ui/FormField'
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
    <StepCard step={2} title="Address Information" subtitle="Enter the customer's address (optional).">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField label="Address">
          <Textarea
            rows={5}
            placeholder="Enter full address"
            value={value.address}
            onChange={(event) => onChange('address', event.target.value)}
          />
        </FormField>

        <div className="flex flex-col gap-5">
          <FormField label="City">
            <Input placeholder="Enter city" value={value.city} onChange={(event) => onChange('city', event.target.value)} />
          </FormField>

          <FormField label="Province">
            <Input
              placeholder="Enter province"
              value={value.province}
              onChange={(event) => onChange('province', event.target.value)}
            />
          </FormField>

          <FormField label="Postal Code">
            <Input
              placeholder="Enter postal code"
              value={value.postalCode}
              onChange={(event) => onChange('postalCode', event.target.value)}
            />
          </FormField>

          <FormField label="Country">
            <Input
              placeholder="Enter country"
              value={value.country}
              onChange={(event) => onChange('country', event.target.value)}
            />
          </FormField>
        </div>
      </div>
    </StepCard>
  )
}
