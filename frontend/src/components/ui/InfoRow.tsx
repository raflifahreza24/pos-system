import type { ReactNode } from 'react'
import { cn } from '../../utils/formatters'

interface InfoRowProps {
  label: string
  value: ReactNode
  labelWidth?: string
}

/**
 * "Label : value" row used by every read-only summary/info panel in the
 * app (Purchase Order's Supplier Information, the Shift Summary panel,
 * the various create-flow Summary steps, and now Customer Detail).
 * Consolidated here so a new panel can reuse it instead of redeclaring
 * its own copy — pass `labelWidth` (a Tailwind width class) to match a
 * panel with longer labels.
 */
export function InfoRow({ label, value, labelWidth = 'w-32' }: InfoRowProps) {
  return (
    <div className="flex gap-2 text-sm">
      <span className={cn(labelWidth, 'shrink-0 font-medium text-ink')}>{label}</span>
      <span className="text-ink-muted">: {value}</span>
    </div>
  )
}
