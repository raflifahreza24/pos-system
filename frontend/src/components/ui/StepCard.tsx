import type { ReactNode } from 'react'

interface StepCardProps {
  step: number
  title: string
  subtitle?: string
  headerAction?: ReactNode
  children: ReactNode
}

/**
 * Numbered section card for a multi-step form (Search → Original
 * Transaction → Return Details, ...). Reusable for any future flow that
 * needs the same "① Title / description / content" shape. `headerAction`
 * is an optional slot in the top-right corner (e.g. a "Kembali" button),
 * mirroring PageHeader's `action` slot.
 */
export function StepCard({ step, title, subtitle, headerAction, children }: StepCardProps) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-line bg-surface p-5 shadow-xs sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink text-xs font-semibold text-white">
            {step}
          </span>
          <div>
            <h2 className="text-base font-semibold text-ink">{title}</h2>
            {subtitle ? <p className="mt-0.5 text-sm text-ink-muted">{subtitle}</p> : null}
          </div>
        </div>
        {headerAction ? <div className="shrink-0">{headerAction}</div> : null}
      </div>
      {children}
    </div>
  )
}
