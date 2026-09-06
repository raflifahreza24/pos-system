import type { ReactNode } from 'react'

interface FormFieldProps {
  label: string
  required?: boolean
  helperText?: string
  children: ReactNode
}

/**
 * "Label above field" wrapper shared by every hand-built form in the app
 * (Settings sections, the Customer and Category create forms, ...). Set
 * `required` for the same "*" the wireframes use for mandatory fields,
 * and `helperText` for the small note some fields show underneath.
 */
export function FormField({ label, required, helperText, children }: FormFieldProps) {
  return (
    <label className="flex flex-col gap-1.5 text-sm">
      <span className="font-medium text-ink">
        {label}
        {required ? <span className="text-danger-strong"> *</span> : null}
      </span>
      {children}
      {helperText ? <span className="text-xs font-normal text-ink-muted">{helperText}</span> : null}
    </label>
  )
}
