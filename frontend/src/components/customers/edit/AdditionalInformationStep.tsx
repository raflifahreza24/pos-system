import { Textarea } from '../../ui/Textarea'
import { FormFieldRow } from '../../ui/FormFieldRow'
import { StepCard } from '../../ui/StepCard'

export interface EditAdditionalInformationState {
  notes: string
}

interface AdditionalInformationStepProps {
  value: EditAdditionalInformationState
  onChange: <K extends keyof EditAdditionalInformationState>(field: K, value: EditAdditionalInformationState[K]) => void
}

export function AdditionalInformationStep({ value, onChange }: AdditionalInformationStepProps) {
  return (
    <StepCard step={3} title="Additional Information" subtitle="Additional details (optional).">
      <FormFieldRow label="Notes" align="start">
        <Textarea placeholder="Enter notes (optional)" value={value.notes} onChange={(event) => onChange('notes', event.target.value)} />
      </FormFieldRow>
    </StepCard>
  )
}
