import { Input } from '../../ui/Input'
import { Textarea } from '../../ui/Textarea'
import { FormField } from '../../ui/FormField'
import { StepCard } from '../../ui/StepCard'

export interface AdditionalInformationState {
  notes: string
  initialMembershipDate: string
  taxNumber: string
}

interface AdditionalInformationStepProps {
  value: AdditionalInformationState
  onChange: <K extends keyof AdditionalInformationState>(field: K, value: AdditionalInformationState[K]) => void
}

export function AdditionalInformationStep({ value, onChange }: AdditionalInformationStepProps) {
  return (
    <StepCard step={3} title="Additional Information" subtitle="Additional details for customer (optional).">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField label="Total Points">
          <Input value="0" disabled wrapperClassName="bg-canvas" />
        </FormField>

        <FormField label="Initial Membership Date">
          <Input
            type="date"
            value={value.initialMembershipDate}
            onChange={(event) => onChange('initialMembershipDate', event.target.value)}
          />
        </FormField>

        <FormField label="Notes">
          <Textarea
            placeholder="Enter notes about this customer"
            value={value.notes}
            onChange={(event) => onChange('notes', event.target.value)}
          />
        </FormField>

        <FormField label="Tax Number (NPWP)">
          <Input
            placeholder="Enter tax number (optional)"
            value={value.taxNumber}
            onChange={(event) => onChange('taxNumber', event.target.value)}
          />
        </FormField>
      </div>
    </StepCard>
  )
}
