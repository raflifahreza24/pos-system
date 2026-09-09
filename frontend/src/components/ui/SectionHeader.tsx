import type { ReactNode } from 'react'

interface SectionHeaderProps {
  icon: ReactNode
  title: string
  subtitle?: string
  action?: ReactNode
}

/**
 * "Icon badge + title + subtitle" card header shared by the Profile and
 * Preferences screens' cards (Personal Information, Change Password,
 * General Preferences, ...) so each card only declares its own fields.
 */
export function SectionHeader({ icon, title, subtitle, action }: SectionHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-light text-primary">
          {icon}
        </span>
        <div>
          <p className="text-sm font-semibold text-ink">{title}</p>
          {subtitle ? <p className="text-xs text-ink-muted">{subtitle}</p> : null}
        </div>
      </div>
      {action}
    </div>
  )
}
