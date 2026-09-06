import { Textarea } from '../../ui/Textarea'
import { FormFieldRow } from '../../ui/FormFieldRow'
import { StepCard } from '../../ui/StepCard'
import { ImageDropzone } from '../../ui/ImageDropzone'
import { IconUser } from '../../ui/icons'

export interface AdditionalInformationState {
  address: string
  notes: string
  profilePicture: File | null
}

interface AdditionalInformationStepProps {
  value: AdditionalInformationState
  onChange: <K extends keyof AdditionalInformationState>(field: K, value: AdditionalInformationState[K]) => void
}

export function AdditionalInformationStep({ value, onChange }: AdditionalInformationStepProps) {
  return (
    <StepCard step={3} title="Additional Information" subtitle="Additional details for the user (optional).">
      <div className="grid gap-6 lg:grid-cols-[1fr_260px]">
        <div className="flex flex-col gap-4">
          <FormFieldRow label="Address" align="start">
            <Textarea placeholder="Enter address (optional)" rows={4} value={value.address} onChange={(event) => onChange('address', event.target.value)} />
          </FormFieldRow>

          <FormFieldRow label="Notes" align="start">
            <Textarea placeholder="Enter notes (optional)" rows={4} value={value.notes} onChange={(event) => onChange('notes', event.target.value)} />
          </FormFieldRow>
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-ink">Profile Picture</span>
          <ImageDropzone
            value={value.profilePicture}
            onChange={(file) => onChange('profilePicture', file)}
            previewAlt="Profile preview"
            icon={
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ink-muted/25 text-ink-muted">
                <IconUser size={22} />
              </span>
            }
            label="photo"
            hint="PNG, JPG (Max 2MB)"
            showDragHint={false}
            compact
            roundedPreview
          />
        </div>
      </div>
    </StepCard>
  )
}
