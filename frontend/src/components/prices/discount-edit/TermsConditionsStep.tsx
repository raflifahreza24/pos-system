import { StepCard } from '../../ui/StepCard'
import { Textarea } from '../../ui/Textarea'

const TERMS_MAX_LENGTH = 500

interface TermsConditionsStepProps {
  value: string
  onChange: (value: string) => void
}

export function TermsConditionsStep({ value, onChange }: TermsConditionsStepProps) {
  return (
    <StepCard step={4} title="Terms & Conditions (Optional)" subtitle="Tambahkan syarat dan ketentuan jika ada.">
      <div className="flex flex-col gap-1.5">
        <Textarea
          rows={6}
          placeholder="Enter terms and conditions, one per line"
          maxLength={TERMS_MAX_LENGTH}
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
        <span className="self-end text-xs text-ink-muted">
          {value.length}/{TERMS_MAX_LENGTH}
        </span>
      </div>
    </StepCard>
  )
}
