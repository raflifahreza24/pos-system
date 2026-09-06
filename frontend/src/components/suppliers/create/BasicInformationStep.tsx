import { Input } from '../../ui/Input'
import { Select } from '../../ui/Select'
import { FormFieldRow } from '../../ui/FormFieldRow'
import { StepCard } from '../../ui/StepCard'
import { activeInactiveStatuses, type Status } from '../../ui/StatusBadge'
import { supplierCategories } from '../../../data/suppliersData'

export interface BasicInformationState {
  name: string
  category: string
  contactPerson: string
  phone: string
  email: string
  website: string
  taxId: string
  status: Status
}

interface BasicInformationStepProps {
  value: BasicInformationState
  onChange: <K extends keyof BasicInformationState>(field: K, value: BasicInformationState[K]) => void
}

export function BasicInformationStep({ value, onChange }: BasicInformationStepProps) {
  return (
    <StepCard step={1} title="Basic Information">
      <div className="flex flex-col gap-4">
        <FormFieldRow label="Supplier Name" required>
          <Input placeholder="Enter supplier name" value={value.name} onChange={(event) => onChange('name', event.target.value)} />
        </FormFieldRow>

        <FormFieldRow label="Category">
          <Select value={value.category} onChange={(event) => onChange('category', event.target.value)}>
            <option value="">Select category (optional)</option>
            {supplierCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Select>
        </FormFieldRow>

        <FormFieldRow label="Contact Person">
          <Input
            placeholder="Enter contact person name"
            value={value.contactPerson}
            onChange={(event) => onChange('contactPerson', event.target.value)}
          />
        </FormFieldRow>

        <FormFieldRow label="Phone" required>
          <Input
            placeholder="Enter phone number"
            value={value.phone}
            onChange={(event) => onChange('phone', event.target.value)}
          />
        </FormFieldRow>

        <FormFieldRow label="Email">
          <Input
            type="email"
            placeholder="Enter email address"
            value={value.email}
            onChange={(event) => onChange('email', event.target.value)}
          />
        </FormFieldRow>

        <FormFieldRow label="Website">
          <Input
            placeholder="Enter website (optional)"
            value={value.website}
            onChange={(event) => onChange('website', event.target.value)}
          />
        </FormFieldRow>

        <FormFieldRow label="Tax ID / NPWP">
          <Input
            placeholder="Enter tax ID / NPWP (optional)"
            value={value.taxId}
            onChange={(event) => onChange('taxId', event.target.value)}
          />
        </FormFieldRow>

        <FormFieldRow label="Status">
          <Select value={value.status} onChange={(event) => onChange('status', event.target.value as Status)}>
            {activeInactiveStatuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </Select>
        </FormFieldRow>
      </div>
    </StepCard>
  )
}
