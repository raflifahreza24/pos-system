import { StepCard } from '../../ui/StepCard'
import { IconInfo } from '../../ui/icons'

export function ConfirmationStep() {
  return (
    <StepCard step={3} title="Confirmation" subtitle="Please confirm the information before opening the shift.">
      <div className="flex items-start gap-3 rounded-xl bg-canvas p-4">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink text-white">
          <IconInfo size={16} />
        </span>
        <p className="text-sm text-ink-muted">After the shift is opened, the cashier can start processing sales transactions.</p>
      </div>
    </StepCard>
  )
}
