import { Input } from '../../ui/Input'
import { Select } from '../../ui/Select'
import { Textarea } from '../../ui/Textarea'
import { FormFieldRow } from '../../ui/FormFieldRow'
import { StepCard } from '../../ui/StepCard'
import { IconInfo } from '../../ui/icons'
import { paymentTermsOptions } from '../../../data/suppliersData'

export interface AdditionalInformationState {
  paymentTerms: string
  leadTimeDays: string
  notes: string
}

interface AdditionalInformationStepProps {
  value: AdditionalInformationState
  onChange: <K extends keyof AdditionalInformationState>(field: K, value: AdditionalInformationState[K]) => void
}

export function AdditionalInformationStep({ value, onChange }: AdditionalInformationStepProps) {
  return (
    <StepCard step={3} title="Additional Information">
      <div className="grid grid-cols-1 gap-x-10 gap-y-4 lg:grid-cols-2">
        <FormFieldRow label="Payment Terms">
          <Select value={value.paymentTerms} onChange={(event) => onChange('paymentTerms', event.target.value)}>
            <option value="">Select payment terms (optional)</option>
            {paymentTermsOptions.map((term) => (
              <option key={term} value={term}>
                {term}
              </option>
            ))}
          </Select>
        </FormFieldRow>

        <FormFieldRow
          label="Lead Time (Days)"
          hint={
            <span title="Typical number of days between placing an order and receiving it" className="flex shrink-0 items-center text-ink-muted">
              <IconInfo size={16} />
            </span>
          }
        >
          <Input
            type="number"
            min={0}
            placeholder="Enter lead time (optional)"
            value={value.leadTimeDays}
            onChange={(event) => onChange('leadTimeDays', event.target.value)}
          />
        </FormFieldRow>

        <div className="lg:col-span-2">
          <FormFieldRow label="Notes" align="start">
            <Textarea
              placeholder="Enter notes (optional)"
              value={value.notes}
              onChange={(event) => onChange('notes', event.target.value)}
            />
          </FormFieldRow>
        </div>
      </div>
    </StepCard>
  )
}
