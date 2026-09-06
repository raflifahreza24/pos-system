import { Input } from '../../ui/Input'
import { Select } from '../../ui/Select'
import { Textarea } from '../../ui/Textarea'
import { FormFieldRow } from '../../ui/FormFieldRow'
import { StepCard } from '../../ui/StepCard'
import { activeInactiveStatuses, type Status } from '../../ui/StatusBadge'

export interface RoleBasicInformationState {
  roleName: string
  description: string
  status: Status
}

interface BasicInformationStepProps {
  value: RoleBasicInformationState
  onChange: <K extends keyof RoleBasicInformationState>(field: K, value: RoleBasicInformationState[K]) => void
}

export function BasicInformationStep({ value, onChange }: BasicInformationStepProps) {
  return (
    <StepCard step={1} title="Basic Information" subtitle="Fill in the role basic information.">
      <div className="flex max-w-xl flex-col gap-4">
        <FormFieldRow label="Role Name" required>
          <Input
            placeholder="Enter role name (e.g. Cashier, Manager)"
            value={value.roleName}
            onChange={(event) => onChange('roleName', event.target.value)}
          />
        </FormFieldRow>

        <FormFieldRow label="Description" align="start">
          <Textarea
            placeholder="Enter role description (optional)"
            value={value.description}
            onChange={(event) => onChange('description', event.target.value)}
          />
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
