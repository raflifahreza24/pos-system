import { Textarea } from '../../ui/Textarea'
import { FormFieldRow } from '../../ui/FormFieldRow'
import { StepCard } from '../../ui/StepCard'
import { ImageDropzone } from '../../ui/ImageDropzone'

export interface BranchAdditionalInformationState {
  notes: string
  logo: File | null
}

interface AdditionalInformationStepProps {
  value: BranchAdditionalInformationState
  onChange: <K extends keyof BranchAdditionalInformationState>(field: K, value: BranchAdditionalInformationState[K]) => void
}

export function AdditionalInformationStep({ value, onChange }: AdditionalInformationStepProps) {
  return (
    <StepCard step={3} title="Additional Information" subtitle="Additional details for the branch (optional).">
      <div className="grid gap-6 lg:grid-cols-[1fr_220px]">
        <FormFieldRow label="Notes" align="start">
          <Textarea placeholder="Enter notes (optional)" value={value.notes} onChange={(event) => onChange('notes', event.target.value)} />
        </FormFieldRow>

        <div className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-ink">Logo (Optional)</span>
          <ImageDropzone
            value={value.logo}
            onChange={(file) => onChange('logo', file)}
            previewAlt="Branch logo preview"
            label="logo"
            hint="PNG, JPG (Max 2MB)"
            showDragHint={false}
            compact
          />
        </div>
      </div>
    </StepCard>
  )
}
