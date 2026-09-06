import { Input } from '../../ui/Input'
import { Textarea } from '../../ui/Textarea'
import { FormFieldRow } from '../../ui/FormFieldRow'
import { StepCard } from '../../ui/StepCard'

export interface ContactAddressState {
  address: string
  phone: string
  email: string
  city: string
  province: string
  postalCode: string
}

interface ContactAddressStepProps {
  value: ContactAddressState
  onChange: <K extends keyof ContactAddressState>(field: K, value: ContactAddressState[K]) => void
}

export function ContactAddressStep({ value, onChange }: ContactAddressStepProps) {
  return (
    <StepCard step={2} title="Contact & Address" subtitle="Fill in the branch address and contact details.">
      <div className="flex flex-col gap-4">
        <FormFieldRow label="Address" required align="start">
          <Textarea placeholder="Enter complete address" value={value.address} onChange={(event) => onChange('address', event.target.value)} />
        </FormFieldRow>

        <FormFieldRow label="Phone" required>
          <Input
            placeholder="Enter phone number (e.g. 031-1234567)"
            value={value.phone}
            onChange={(event) => onChange('phone', event.target.value)}
          />
        </FormFieldRow>

        <FormFieldRow label="Email">
          <Input
            type="email"
            placeholder="Enter email address (optional)"
            value={value.email}
            onChange={(event) => onChange('email', event.target.value)}
          />
        </FormFieldRow>

        <FormFieldRow label="City" required>
          <Input placeholder="Enter city (e.g. Surabaya)" value={value.city} onChange={(event) => onChange('city', event.target.value)} />
        </FormFieldRow>

        <FormFieldRow label="Province" required>
          <Input
            placeholder="Enter province (e.g. Jawa Timur)"
            value={value.province}
            onChange={(event) => onChange('province', event.target.value)}
          />
        </FormFieldRow>

        <FormFieldRow label="Postal Code">
          <Input
            placeholder="Enter postal code (optional)"
            value={value.postalCode}
            onChange={(event) => onChange('postalCode', event.target.value)}
          />
        </FormFieldRow>
      </div>
    </StepCard>
  )
}
