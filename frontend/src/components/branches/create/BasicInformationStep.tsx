import { Input } from '../../ui/Input'
import { Select } from '../../ui/Select'
import { FormFieldRow } from '../../ui/FormFieldRow'
import { StepCard } from '../../ui/StepCard'
import { activeInactiveStatuses, type Status } from '../../ui/StatusBadge'

export interface BranchBasicInformationState {
  name: string
  code: string
  status: Status
}

interface BasicInformationStepProps {
  value: BranchBasicInformationState
  onChange: <K extends keyof BranchBasicInformationState>(field: K, value: BranchBasicInformationState[K]) => void
}

export function BasicInformationStep({ value, onChange }: BasicInformationStepProps) {
  return (
    <StepCard step={1} title="Basic Information" subtitle="Fill in the branch basic information.">
      <div className="flex flex-col gap-4">
        <FormFieldRow label="Branch Name" required>
          <Input
            placeholder="Enter branch name (e.g. Surabaya Store)"
            value={value.name}
            onChange={(event) => onChange('name', event.target.value)}
          />
        </FormFieldRow>

        <FormFieldRow label="Code" required>
          <Input
            placeholder="Enter branch code (e.g. SBY)"
            value={value.code}
            onChange={(event) => onChange('code', event.target.value)}
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
