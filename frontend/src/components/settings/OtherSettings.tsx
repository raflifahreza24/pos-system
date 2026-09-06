import { useTheme } from '../../hooks/useTheme'
import { ThemeToggle } from '../ui/ThemeToggle'
import { FormField } from '../ui/FormField'
import { SettingsCheckboxRow } from './SettingsCheckboxRow'
import { SettingsSection } from './SettingsSection'
import { cn } from '../../utils/formatters'

export interface OtherSettingsValue {
  receiptFooter: string
  barcodeScannerEnabled: boolean
}

interface OtherSettingsProps {
  value: OtherSettingsValue
  onChange: (value: OtherSettingsValue) => void
  onSave: () => void
}

// "Appearance" drives the real ThemeContext (the same switch shown in the
// topbar) — not a mock toggle, so this row actually changes the app's theme.
export function OtherSettings({ value, onChange, onSave }: OtherSettingsProps) {
  const { theme } = useTheme()

  return (
    <SettingsSection onSave={onSave}>
      <FormField label="Appearance">
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <span className="text-sm text-ink-muted">{theme === 'light' ? 'Light mode' : 'Default mode'}</span>
        </div>
      </FormField>

      <FormField label="Receipt Footer Note">
        <textarea
          rows={3}
          value={value.receiptFooter}
          onChange={(event) => onChange({ ...value, receiptFooter: event.target.value })}
          className={cn(
            'w-full resize-none rounded-xl border border-line bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-muted transition-colors duration-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15',
          )}
        />
      </FormField>

      <SettingsCheckboxRow
        label="Enable barcode scanner"
        description="Let the Point of Sale screen accept input from a connected barcode scanner."
        checked={value.barcodeScannerEnabled}
        onChange={(checked) => onChange({ ...value, barcodeScannerEnabled: checked })}
      />
    </SettingsSection>
  )
}
