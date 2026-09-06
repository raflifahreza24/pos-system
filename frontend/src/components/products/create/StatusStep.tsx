import { Select } from '../../ui/Select'
import { FormFieldRow } from '../../ui/FormFieldRow'
import { StepCard } from '../../ui/StepCard'
import { activeInactiveStatuses, type Status } from '../../ui/StatusBadge'

interface StatusStepProps {
  value: Status
  onChange: (status: Status) => void
}

export function StatusStep({ value, onChange }: StatusStepProps) {
  return (
    <StepCard step={5} title="Status">
      <div className="sm:max-w-md">
        <FormFieldRow label="Status">
          <Select value={value} onChange={(event) => onChange(event.target.value as Status)}>
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
