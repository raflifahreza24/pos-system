import { StepCard } from '../../ui/StepCard'
import { IconInfo } from '../../ui/icons'
import { cn } from '../../../utils/formatters'
import { branches } from '../../../data/branchesData'

interface BranchApplicabilityStepProps {
  value: string
  onChange: (scope: string) => void
}

const OPTIONS = [
  { key: 'all', title: 'All Branches', description: 'Berlaku untuk semua cabang' },
  { key: 'select', title: 'Select Branches', description: 'Pilih cabang tertentu' },
] as const

export function BranchApplicabilityStep({ value, onChange }: BranchApplicabilityStepProps) {
  const mode = value === 'All Branches' ? 'all' : 'select'

  return (
    <StepCard step={3} title="Branch Applicability" subtitle="Atur cabang yang berlaku untuk diskon ini.">
      <div className="flex flex-col gap-4">
        <div className="flex items-start gap-3 rounded-xl bg-primary-light/40 p-4">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-white">
            <IconInfo size={16} />
          </span>
          <p className="text-sm text-ink">
            Saat memilih "All Branches", diskon akan berlaku untuk semua cabang.
            <br />
            Jika memilih cabang tertentu, diskon hanya berlaku untuk cabang yang dipilih.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {OPTIONS.map((option) => (
            <label
              key={option.key}
              className={cn(
                'flex cursor-pointer items-start gap-3 rounded-xl border p-3.5 transition-colors duration-150',
                mode === option.key ? 'border-primary bg-primary-light/40' : 'border-line hover:bg-canvas',
              )}
            >
              <input
                type="radio"
                name="discount-branch-scope"
                checked={mode === option.key}
                // "Select Branches" doesn't have a branch picker in this
                // wireframe yet, so it defaults to the first branch —
                // the Applicable Scope field above still shows and can
                // change which one.
                onChange={() => onChange(option.key === 'all' ? 'All Branches' : branches[0].name)}
                className="mt-1 h-4 w-4 text-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <span>
                <span className="block text-sm font-semibold text-ink">{option.title}</span>
                <span className="block text-sm text-ink-muted">{option.description}</span>
              </span>
            </label>
          ))}
        </div>
      </div>
    </StepCard>
  )
}
