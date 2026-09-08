import { Input } from '../../ui/Input'
import { Select } from '../../ui/Select'
import { FormFieldRow } from '../../ui/FormFieldRow'
import { StepCard } from '../../ui/StepCard'
import { activeInactiveStatuses, type Status } from '../../ui/StatusBadge'

export interface EditCustomerInformationState {
  name: string
  phone: string
  email: string
  status: Status
}

interface CustomerInformationStepProps {
  value: EditCustomerInformationState
  onChange: <K extends keyof EditCustomerInformationState>(field: K, value: EditCustomerInformationState[K]) => void
}

export function CustomerInformationStep({ value, onChange }: CustomerInformationStepProps) {
  return (
    <StepCard step={1} title="Customer Information" subtitle="Update the customer basic information.">
      <div className="flex flex-col gap-4">
        <FormFieldRow label="Customer Name" required>
          <Input value={value.name} onChange={(event) => onChange('name', event.target.value)} />
        </FormFieldRow>

        <FormFieldRow label="Phone" required>
          <Input value={value.phone} onChange={(event) => onChange('phone', event.target.value)} />
        </FormFieldRow>

        <FormFieldRow label="Email">
          <Input type="email" value={value.email} onChange={(event) => onChange('email', event.target.value)} />
        </FormFieldRow>

        <FormFieldRow label="Status" required>
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
