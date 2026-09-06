import { IconStorefront } from '../../ui/icons'

const USAGE_NOTES = [
  'Identifying the branch in transactions',
  'Stock management per branch',
  'Reporting and analytics',
  'User access and permissions',
]

/**
 * Static helper panel next to Basic Information — explains what the
 * branch record feeds into elsewhere in the app, so it doesn't need any
 * form state of its own.
 */
export function BranchInfoPanel() {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-line bg-canvas p-5">
      <div className="flex items-center gap-2.5">
        <IconStorefront size={18} className="text-ink" />
        <h3 className="text-base font-semibold text-ink">Branch Info</h3>
      </div>

      <p className="text-sm text-ink-muted">The branch information will be used for:</p>

      <ul className="flex flex-col gap-1.5 text-sm text-ink-muted">
        {USAGE_NOTES.map((note) => (
          <li key={note} className="flex gap-2">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink-muted" />
            {note}
          </li>
        ))}
      </ul>
    </div>
  )
}
