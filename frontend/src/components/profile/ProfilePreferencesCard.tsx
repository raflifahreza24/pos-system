import { SectionHeader } from '../ui/SectionHeader'
import { FormField } from '../ui/FormField'
import { Select } from '../ui/Select'
import { Button } from '../ui/Button'
import { IconSave, IconSettings } from '../ui/icons'
import { useTheme } from '../../hooks/useTheme'
import { themeOptions } from '../../data/themeOptions'
import { cn } from '../../utils/formatters'

export interface QuickPreferencesValue {
  language: string
  timezone: string
  dateFormat: string
}

interface ProfilePreferencesCardProps {
  value: QuickPreferencesValue
  onChange: (value: QuickPreferencesValue) => void
  onSave: () => void
}

/**
 * Compact preferences editor embedded in the Profile screen — Language /
 * Timezone / Date Format are local-only (no i18n system exists yet, same
 * spirit as GeneralSettings' currency/date-format selects), while the
 * Theme row is wired to the real ThemeContext so it actually works. The
 * full section-by-section editor lives at PreferencesPage instead.
 */
export function ProfilePreferencesCard({ value, onChange, onSave }: ProfilePreferencesCardProps) {
  const { theme, setTheme } = useTheme()

  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-line bg-surface p-5 shadow-xs sm:p-6">
      <SectionHeader icon={<IconSettings size={18} />} title="Preferences" subtitle="Customize your experience." />

      <div className="flex flex-col gap-4">
        <FormField label="Language">
          <Select value={value.language} onChange={(event) => onChange({ ...value, language: event.target.value })}>
            <option value="en">English</option>
            <option value="id">Indonesian (Bahasa Indonesia)</option>
          </Select>
        </FormField>

        <FormField label="Timezone">
          <Select value={value.timezone} onChange={(event) => onChange({ ...value, timezone: event.target.value })}>
            <option value="wib">(GMT+07:00) Jakarta, Indonesia</option>
            <option value="wita">(GMT+08:00) Makassar, Indonesia</option>
            <option value="wit">(GMT+09:00) Jayapura, Indonesia</option>
          </Select>
        </FormField>

        <FormField label="Date Format">
          <Select value={value.dateFormat} onChange={(event) => onChange({ ...value, dateFormat: event.target.value })}>
            <option value="dd/mm/yyyy">DD/MM/YYYY</option>
            <option value="mm/dd/yyyy">MM/DD/YYYY</option>
            <option value="yyyy-mm-dd">YYYY-MM-DD</option>
          </Select>
        </FormField>

        <FormField label="Theme">
          <div className="flex flex-wrap items-center gap-4">
            {themeOptions.map((option) => (
              <label
                key={option.value}
                className={cn(
                  'flex items-center gap-1.5 text-sm',
                  option.comingSoon ? 'cursor-not-allowed text-ink-muted/50' : 'cursor-pointer text-ink',
                )}
              >
                <input
                  type="radio"
                  name="quick-theme"
                  disabled={option.comingSoon}
                  checked={!option.comingSoon && theme === option.value}
                  onChange={() => {
                    if (option.value === 'light' || option.value === 'default') setTheme(option.value)
                  }}
                  className="h-4 w-4 rounded-full border-line text-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                {option.label}
              </label>
            ))}
          </div>
        </FormField>
      </div>

      <div>
        <Button icon={<IconSave size={16} />} onClick={onSave}>
          Save Preferences
        </Button>
      </div>
    </div>
  )
}
