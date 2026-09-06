import { Input } from '../../ui/Input'
import { Textarea } from '../../ui/Textarea'
import { FormFieldRow } from '../../ui/FormFieldRow'
import { StepCard } from '../../ui/StepCard'

export interface ShiftDetailsState {
  openDate: string
  openTime: string
  startingCash: number
  notes: string
}

interface ShiftDetailsStepProps {
  value: ShiftDetailsState
  onChange: <K extends keyof ShiftDetailsState>(field: K, value: ShiftDetailsState[K]) => void
}

const rupiahIcon = <span className="text-sm font-medium text-ink-muted">Rp</span>

export function ShiftDetailsStep({ value, onChange }: ShiftDetailsStepProps) {
  return (
    <StepCard step={2} title="Shift Details" subtitle="Set the shift opening information.">
      <div className="flex flex-col gap-4">
        <FormFieldRow label="Open Date" required>
          <Input type="date" value={value.openDate} onChange={(event) => onChange('openDate', event.target.value)} />
        </FormFieldRow>

        <FormFieldRow label="Open Time" required>
          <Input type="time" value={value.openTime} onChange={(event) => onChange('openTime', event.target.value)} />
        </FormFieldRow>

        <FormFieldRow label="Starting Cash" required>
          <Input
            type="number"
            min={0}
            icon={rupiahIcon}
            value={value.startingCash}
            onChange={(event) => onChange('startingCash', Number(event.target.value))}
          />
        </FormFieldRow>

        <FormFieldRow label="Notes" align="start">
          <Textarea placeholder="Enter notes (optional)" value={value.notes} onChange={(event) => onChange('notes', event.target.value)} />
        </FormFieldRow>
      </div>
    </StepCard>
  )
}
