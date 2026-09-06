import type { ReactNode } from 'react'
import { Button } from '../ui/Button'

interface SettingsSectionProps {
  children: ReactNode
  onSave: () => void
}

/**
 * Shared card + Save-button shell for every Settings tab, so each section
 * (General, Tax, Payment Methods, ...) only has to describe its own fields.
 */
export function SettingsSection({ children, onSave }: SettingsSectionProps) {
  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-line bg-surface p-5 shadow-xs sm:p-6">
      <div className="flex flex-col gap-5 sm:max-w-md">{children}</div>
      <div>
        <Button onClick={onSave}>Save</Button>
      </div>
    </div>
  )
}
