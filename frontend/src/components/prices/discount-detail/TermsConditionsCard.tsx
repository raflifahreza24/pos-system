import { IconFileText } from '../../ui/icons'

interface TermsConditionsCardProps {
  terms: string[]
}

export function TermsConditionsCard({ terms }: TermsConditionsCardProps) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-line bg-surface p-5 shadow-xs sm:p-6">
      <div className="flex items-center gap-2.5">
        <IconFileText size={18} className="text-ink" />
        <div>
          <h2 className="text-base font-semibold text-ink">Terms & Conditions</h2>
          <p className="text-sm text-ink-muted">Additional terms and conditions for this discount (if any).</p>
        </div>
      </div>

      {terms.length > 0 ? (
        <ol className="list-decimal space-y-1.5 rounded-xl bg-canvas p-4 pl-9 text-sm text-ink-muted">
          {terms.map((term) => (
            <li key={term}>{term}</li>
          ))}
        </ol>
      ) : (
        <p className="rounded-xl bg-canvas p-4 text-sm text-ink-muted">No additional terms for this discount.</p>
      )}
    </div>
  )
}
