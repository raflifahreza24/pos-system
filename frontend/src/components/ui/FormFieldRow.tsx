import type { ReactNode } from 'react'
import { cn } from '../../utils/formatters'

interface FormFieldRowProps {
  label: string
  required?: boolean
  hint?: ReactNode
  align?: 'center' | 'start'
  children: ReactNode
}

/**
 * "Label on the left, field on the right" row — the layout the Add
 * Product wireframe uses instead of FormField's "label above field"
 * stack. `hint` is an optional slot next to the field (e.g. an info
 * icon explaining an auto-calculated value). Set `align="start"` for a
 * taller field (a textarea) so the label sits at its top edge instead
 * of centered against it.
 */
export function FormFieldRow({ label, required, hint, align = 'center', children }: FormFieldRowProps) {
  return (
    <div className={cn('flex flex-col gap-1.5 sm:flex-row sm:gap-4', align === 'center' ? 'sm:items-center' : 'sm:items-start')}>
      <span className={cn('text-sm font-medium text-ink sm:w-32 sm:shrink-0', align === 'start' && 'sm:pt-2.5')}>
        {label}
        {required ? <span className="text-danger-strong"> *</span> : null}
      </span>
      <div className="flex flex-1 items-center gap-2">
        {children}
        {hint}
      </div>
    </div>
  )
}
